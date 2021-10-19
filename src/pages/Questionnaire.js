import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import TipsContainer from '../components/TipsContainer';
import Modal from '../components/Modal';
import { useAuth } from '../states/userState';
import { buildAnswers } from '../utils';
import firebase from 'firebase/app';
import 'firebase/storage';
import "firebase/database";

const Questionnaire = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState({});
  const [questions, setQuestions] = useState([]);
  let [showModal, setShowModal] = useState(true);
  let [age, setAge] = useState();
  let history = useHistory();
  const { user, addScoreToDb, addAnonScoreToDb, setNotLoggedInTotal, notLoggedInTotal } = useAuth();
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
    alert(age);
    if (user){
      try {
        await addScoreToDb( user.uid, total, new Date());
      } catch (e) {
        console.log(e);
      }
    } else{
      try {
        await addAnonScoreToDb( age, total);
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
      alert(score[selectedIndex]);
      if (score[7] > -1) {
        handleFinish();
      } else if (score[selectedIndex] > -1) {
        setIndex(selectedIndex);
      } else {
        alert('You must select an answer!');
      }
    } else if (e.target.classList.contains('prev')) {
      setIndex(selectedIndex);
    }
  };

  const htmlOfItems = questions.slice(0, 8).map((question, i) => {
    return (
        <Carousel.Item key={i}>
          <h2 className='question-title'>{question.ques}</h2>
          {buildAnswers(question, i, score, setScore)}
        </Carousel.Item>
    );
  });

  return (
      <div>

        {(!user)? (
            <Modal isOpen={ showModal } toggle={ toggleModal } >
              <h1>Please enter your age:</h1>
              <input type="number" onChange={ handleAgeChange } />
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
                Question {index + 1} of 8;
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