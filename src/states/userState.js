import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth, firestore} from '../assets/firebase';
import defaultProfileImage from '../images/default-profile-img.jpg';
import firebase from 'firebase/app';
import 'firebase/storage';
import imageCompression from 'browser-image-compression';

const usersCollection = firestore.collection('users');

const anonCollection = firestore.collection('anonymous_attempts');

const userContext = createContext();

//shortcut hook to be able to access all functions from the context when we want
export function useAuth() {
  return useContext(userContext);
}

//useContext.Provider component that also sets the state for the rest of the App
export function UserProvider({children}) {
  //state to keep track of the user as they sign-up/log-in
  const [user, setUser] = useState();

  //this state lets firebase check if a user has logged in before and can help us render
  //certain components correctly, if there is user already then we redirect to the questionnarre
  //otherwise we render the log-in/sign-up page
  const [loading, setLoading] = useState(true);

  //this state is used so that when a user that it's not logged in takes a quiz, the app will be able to route
  //accordingly without losing score to be able to save it to profile after user either logs in or creates account
  const [tookQuizNotLoggedIn, setTookQuizNotLoggedIn] = useState(false)
  //quiz total score for user that is not logged in
  const [notLoggedInTotal, setNotLoggedInTotal] = useState(0);

  //state used to store each question category
  const [questionCategory, setQuestionCategory] = useState();
  const [categoryScores, setCategoryScores] = useState({});

  //state to check if catScore is empty or not, to display or not, graphs/buttons in profile page
  const [hasCatScore, setHasCatScore] = useState();
  const [name, setName] = useState('');
  const [scores, setScores] = useState(null);

  //state used to store category scores after taking survey, not adding old score
  const [currentCatScores, setCurrentCatScores] = useState({});
  const [stringDate, setStringDate] = useState([]);
  const [badges, setBadges] = useState({
    energyBadge: {awarded: false, displayModal: false},
    purchBadge: {awarded: false, displayModal: false},
    recycBadge: {awarded: false, displayModal: false},
    transpBadge: {awarded: false, displayModal: false},
    waterBadge: {awarded: false, displayModal: false},
  });

  const [displayBadgeModal, setDisplayBadgeModal] = useState(false);

  //sign up through firebase api
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function registerUser(uid, firstName, lastName, school) {
    usersCollection
      .doc(uid)
      .set({
        firstName,
        lastName,
        school
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  //catScores= old scores plus new scores
  //currentQuizCatScore = only new scores no old scores added
  function addScoreToDb(uid, score, createdAt, catScores, currentQuizCatScore, allBadges) {
    usersCollection.doc(uid).update({
      scores: firebase.firestore.FieldValue.arrayUnion({
        score,
        createdAt,
        currentQuizCatScore
      }),
      average: 100,
      catScores,
      allBadges
    });
  }

  function addAnonScoreToDb(age, score, catScores) {
    anonCollection.doc().set({
      age: parseInt(age),
      score: score,
      createdAt: new Date(),
      catScores
    })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  const [profilePic, setProfilePic] = useState(defaultProfileImage);

  //Uploads the file to the firebase
  const uploadProfilePic = (file) => {
    //Forces the image to be saved as a jpeg in firebase
    const cacheControl = {
      contentType: 'image/jpeg',
      customMetadata: {
        userId: user.uid
      }
    }

    const imageFile = file.target.files[0];
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1080,
      useWebWorker: true
    }
    /*
      The first parameter is the image we are compressing and the second parameter are the settings we chose for compressing the image
      The ref() parameter is what we are setting the path of the users profile picture in our firebase bucket
    */
    imageCompression(imageFile, options).then((compressedFile) => {
      firebase.storage().ref('users/' + user.uid + '/profile.jpg').put(compressedFile, cacheControl).then(() => {
        console.log("Successfully uploaded image")
      }).catch(error => {
        console.log("Error uploading image: " + error);
      });
    })

    //Sets the profilePic state to the local file the first time it's uploaded. Everytime after that it will be fetched from firebase with the downloadProfilePic() method
    setProfilePic(URL.createObjectURL(imageFile));
  }

  const downloadProfilePic = (user) => {
    firebase.storage().ref('users/' + user.uid + '/profile.jpg').getDownloadURL()
      .then(imgURL => {
        setProfilePic(imgURL);
      }).catch(error => {
      console.log('error img ' + error);
      setProfilePic(defaultProfileImage);
    })

    usersCollection
      .doc(user.uid)
      .get()
      .then(function (doc) {
        let fName = doc.data().firstName
        let lName = doc.data().lastName
        fName = fName.charAt(0).toUpperCase() + fName.slice(1);
        lName = lName.charAt(0).toUpperCase() + lName.slice(1);
        setName(fName + ' ' + lName);
      })
  }

  /* firebase api has its own listener for when the user has signed in or not
  we only want to do this once when the sign in page is mounted, once it is
  un mounted there is no more need for the listener */
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      downloadProfilePic(user);
    });

    return unsub;
  }, []);

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  //these function all return promises so we need a way to wait for their result
  function logout() {
    return auth.signOut();
  }

  const getCatScores = () => {
    let catScores = {recycScore: 0, transScore: 0, waterScore: 0, purchScore: 0, energyScore: 0}
    let transpBadge = {
      awarded: false,
      displayModal: false
    };
    let waterBadge = {
      awarded: false,
      displayModal: false
    };
    let energyBadge = {
      awarded: false,
      displayModal: false
    };
    let recycBadge = {
      awarded: false,
      displayModal: false
    };
    let purchBadge = {
      awarded: false,
      displayModal: false
    };
    let allBadges ={transpBadge,waterBadge,energyBadge,recycBadge,purchBadge}
    if (user) {
      usersCollection.doc(user.uid).get().then(function (doc) {
          if (doc.data().catScores) {
            if (doc.data().scores) {
              let arr = doc.data().scores;
              setCurrentCatScores(arr)
            }
            let catScores = doc.data().catScores;
            setCategoryScores(catScores)
            //boolean to check if catScore is empty or not, if not empty able to display graphs/buttons
            //in profile page
            setHasCatScore(true);
          } else {
            //if user is logged in and for some reason doesn't have category score in firestore, we initalize to zero
            setCategoryScores(catScores)
            setCurrentCatScores(catScores)
            //boolean to check to see if catScore is empty, if empty display message and don't display graphs/buttons
            // in profile page
            setHasCatScore(false);
          }
          if (doc.data().allBadges) {
            let allBadges = doc.data().allBadges;
            setBadges(allBadges)
          } else {
            setBadges(allBadges);
          }
        }
      )
    } else {
      // anon submission, initialize category scores to zero
      setCategoryScores(catScores)
    }
  }

  //update if to not show modal of badge awarded
  const updateBadges = (allBadges) =>{
    allBadges.energyBadge.displayModal = false;
    allBadges.purchBadge.displayModal = false;
    allBadges.recycBadge.displayModal = false;
    allBadges.transpBadge.displayModal = false;
    allBadges.waterBadge.displayModal = false;

    usersCollection.doc(user.uid).update({
      allBadges
    });
  }

  //useContext state to keep track of, where we also store useful functions and the user
  const defaultValue = {
    user,
    usersCollection,
    profilePic,
    signup,
    login,
    logout,
    registerUser,
    addScoreToDb,
    addAnonScoreToDb,
    uploadProfilePic,
    tookQuizNotLoggedIn,
    setTookQuizNotLoggedIn,
    notLoggedInTotal,
    setNotLoggedInTotal,
    questionCategory,
    setQuestionCategory,
    categoryScores,
    setCategoryScores,
    getCatScores,
    hasCatScore,
    name,
    setName,
    scores,
    setScores,
    stringDate,
    setStringDate,
    currentCatScores,
    setCurrentCatScores,
    badges,
    setBadges,
    displayBadgeModal,
    setDisplayBadgeModal,
    updateBadges
  };

  return (
    <userContext.Provider value={defaultValue}>
      {!loading && children}
    </userContext.Provider>
  );
}