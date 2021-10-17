import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import TipsContainer from '../components/TipsContainer';
import { useAuth } from '../states/userState';
import { buildAnswers } from '../utils';
import firebase from 'firebase/app';
import 'firebase/storage';
import "firebase/database";

let shuffled = false;
let shuffledArr=[]
const Questionnaire = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState({});
  const [questions, setQuestions] = useState([]);
  let history = useHistory();
  const { user, addScoreToDb, setNotLoggedInTotal, notLoggedInTotal } = useAuth();

  //Grabs questions from firebase realtime database
  useEffect(() => {
    let database = firebase.database();
    database.ref().on('value', (snapshot) => {
      setQuestions(snapshot.val());
    })
  }, []);

  const handleFinish = async () => {
    let total = 0;

    for (const key in score) {
      total += score[key];
    }

    if(user) {
      try {
        await addScoreToDb(user.uid, total, new Date());
      } catch (e) {
        console.log(e);
      }
    }
    history.push(`/success/${total}`);
    setNotLoggedInTotal(total)
  };

  const handleSelect = (selectedIndex, e) => {
    if (e.target.classList.contains('next')) {
      if (score[7] > -1) {
        handleFinish();
      } else if (score[selectedIndex - 1] > -1) {
        setIndex(selectedIndex);
        console.log("score contains ",score);
      } else {
        alert('You must select an answer!');
      }
    } else if (e.target.classList.contains('prev')) {
      setIndex(selectedIndex);
    }
  };

  let uniqueQuestions = [...questions.reduce((question, obj) => question.set(obj.ques, obj),
      new Map()).values()]


  const shuffle = (array) =>{
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      shuffled = true
    }
    array = array.slice(0,8)
    return array;
  }

  if (!shuffled) {
    shuffledArr = shuffle(uniqueQuestions)
  }

  const htmlOfItems = shuffledArr.map((question, i) => {
    return (
        <Carousel.Item key={i}>
          <h2 className='question-title'>{question.ques}</h2>
          {buildAnswers(question, i, score, setScore)}
        </Carousel.Item>
    );
  });

  return (
      <div>
        <div className='container-fluid'>
          <div className='row questionnaire-row'>
            <div className='col-lg-6 questionnaire-left'>
              <TipsContainer index={index} />
            </div>
            <div className='col-lg-6 px-md-5 questionnaire-right'>
              <h2 className='questionnaire-step-counter'>
                Question {index + 1} of {shuffledArr.length}
              </h2>
              <Carousel
                  activeIndex={index}
                  onSelect={handleSelect}
                  interval={null}
                  nextIcon={
                    <div className='py-3 px-5 btn btn-primary next'>
                      {index === 7 ? 'Submit' : 'Next'}
                    </div>
                  }
                  prevIcon={
                    index === 0 ? (
                        ''
                    ) : (
                        <div className='py-3 px-5 btn btn-primary prev'>Back</div>
                    )
                  }
                  bsPrefix='c-carousel'
                  indicators={true}
                  style={{ minHeight: 500 + 'px' }}
              >
                {htmlOfItems}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Questionnaire;