import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import TipsContainer from '../components/TipsContainer';
import Modal from '../components/Modal';
import { useAuth } from '../states/userState';
import { buildAnswers } from '../utils';
import {sortScore} from '../components/CategoryScoreSort';
import firebase from 'firebase/app';
import 'firebase/storage';
import "firebase/database";

let shuffled = false;
let shuffledArr=[];
let categoryQuestions = [];

const Questionnaire = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState({});
  const [questions, setQuestions] = useState([]);
  let [showModal, setShowModal] = useState(true);
  let [age, setAge] = useState();
  let history = useHistory();
  const {
    user,
    addScoreToDb,
    addAnonScoreToDb,
    setNotLoggedInTotal,
    questionCategory,
    setQuestionCategory,
    categoryScores,
    setCategoryScores,
    getCatScores
  } = useAuth();

  //Grabs questions from firebase realtime database
  useEffect(() => {
    getCatScores()
    let database = firebase.database();
    database.ref().on('value', (snapshot) => {
      setQuestions(snapshot.val());
    })
  }, []);

  const handleFinish = async () => {
    let total = 0;
    let catScores = sortScore(questionCategory, score, setCategoryScores, categoryScores)

    for (const key in score) {
      total += score[key];
    }
    if (user){
      try {
        await addScoreToDb( user.uid, total, new Date(), catScores);
      } catch (e) {
        console.log(e);
      }
    } else{
      try {
        await addAnonScoreToDb( age, total, catScores);
      } catch (e) {
        console.log(e);
      }
    }
    history.push(`/success/${total}`);
    setNotLoggedInTotal(total)
  };

  const toggleModal = () => setShowModal( !showModal );

  const handleAgeChange = (e) => {
    setAge(parseInt(e.target.value));
  }
  const handleSelect = (selectedIndex, e) => {
    if (e.target.classList.contains('next')) {
      if (score[7] > -1) {
        handleFinish();
      } else if (score[selectedIndex - 1] > -1) {
        setIndex(selectedIndex);
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
      shuffled = true;
    }
    return array;
  }

  if (!shuffled && uniqueQuestions.length > 0) {
    let energyQuestions = uniqueQuestions.filter(question => question.category === 'energy');
    let recyQuestions = uniqueQuestions.filter(question => question.category === 'recycling');
    let waterQuestions = uniqueQuestions.filter(question => question.category === 'water');
    let transpQuestions = uniqueQuestions.filter(question => question.category === 'transportation');
    let purchQuestions = uniqueQuestions.filter(question => question.category === 'purchasing');

    for (let i = 0; i < 2; i++) {
      categoryQuestions.push(energyQuestions[i]);
      categoryQuestions.push(recyQuestions[i]);
      categoryQuestions.push(waterQuestions[i]);
      categoryQuestions.push(transpQuestions[i]);
      categoryQuestions.push(purchQuestions[i]);
    }
    shuffledArr = shuffle(categoryQuestions);
  }

  const htmlOfItems = shuffledArr.slice(0, 8).map((question, i) => {
    return (
        <Carousel.Item key={i}>
          <h2 className='question-title'>{question.ques}</h2>
          {buildAnswers(question, i, score, setScore, setQuestionCategory, questionCategory,setCategoryScores)}
        </Carousel.Item>
    );
  });

  return (
      <div>

        {(!user)? (
            <Modal isOpen={ showModal } toggle={ toggleModal } >
              <h1>Please enter your age:</h1>
              <input min={7} type="number" onChange={ handleAgeChange } />
              <button onClick={ toggleModal } className="btn btn-primary my-2 py-3 px-5" >
                Submit
              </button>
            </Modal>) : ""}

       <div className='container-fluid'>
          <div className='row questionnaire-row'>
            <div className='col-lg-6 questionnaire-left'>
              <TipsContainer index={index} />
            </div>
            <div className='col-lg-6 px-md-5 questionnaire-right'>
              <h2 className='questionnaire-step-counter'>
                Question {index + 1} of 8
              </h2>
              <Carousel
                  activeIndex={index}
                  onSelect={handleSelect}
                  interval={null}
                  nextIcon={
                    <div className={'py-3 px-5 btn btn-primary next'}>
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