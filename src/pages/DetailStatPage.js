import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAuth} from "../states/userState";
import ProgressBar from "@ramonak/react-progress-bar";

const DetailStatPage = () => {
  const {stringDate} = useAuth();
  const params = useParams();

  let dateArr = [];
  let catScoreArray = []
  const {date} = params;
  console.log(date)
  let category = [];
  let catScore = [];
  let dateOfQuiz = [];
  for (let [key, value] of Object.entries(stringDate)) {
    if (key === 'transScore') {
      key = 'Transportation';
    } else if (key === 'recycScore') {
      key = 'Recycling';
    } else if (key === 'energyScore') {
      key = 'Energy';
    } else if (key === 'waterScore') {
      key = 'Water';
    } else if (key === 'purchScore') {
      key = 'Purchasing';
    }
    category.push(key)
    catScore.push(value)
  }
  console.log('stuff from doughnut')
  console.log(category)
  console.log(catScore)
  console.log('no more stuf from doughtut')

  for (let i = 0; i < stringDate.length; i++) {
    if (stringDate[i].createdAt === date) {
      dateArr.push(stringDate[i].createdAt)

      catScoreArray.push(stringDate[i].categoryScores.transScore)
      console.log(dateArr[i])
      console.log(catScoreArray)
      // console.log(newArr[i].categoryScores.transScore)
    }
  }
  console.log(dateArr)
  // console.log(dateArr[0].categoryScores.transScore)
  const [completed, setCompleted] = useState(0);
  const setValues = ()=>{
    setTimeout(() => setCompleted(10), 1000);
  }


  useEffect(() => {
    setValues()
  //   setTimeout(() => setCompleted(Math.floor(Math.random() * 100) + 1), 1000);
  }, []);

  return (
    // <div className='container mw-100'>
    //   <div className='row profile-container'>
        <div>{date}

          <br/><br/>
          Energy
          <ProgressBar  bgcolor={"#6a1b9a"} completed={completed} />
          Water
          <ProgressBar bgcolor={"#6a1b9a"} completed={completed+20} />
          Purchasing
          <ProgressBar bgcolor={"#6a1b9a"} completed={completed+30} />
          Recycling
          <ProgressBar bgcolor={"#6a1b9a"} completed={completed+5} />
          Energy
          <ProgressBar bgcolor={"#6a1b9a"} completed={completed+10} />
        </div>)



        {/*{dateArr.map((item, i) => (*/}
        {/*  dateArr[i] + ' ' + catScoreArray[i]*/}


        {/*//   <div className='col m-3 profile-user-col'>*/}
        {/*//   <div className="box font-weight-bold">*/}
        {/*//   <p>transportation</p>*/}
        {/*//   </div>*/}
        {/*//   <div className="box ">*/}
        {/*//   <ProgressBar*/}
        {/*//   // completed="20"*/}
        {/*//   completed={`${item.categoryScores.transScore}`}*/}
        {/*//   // completed={"Energy " + `${30}`}*/}
        {/*//   labelAlignment="center"*/}
        {/*//   labelColor="#000000"*/}
        {/*//   bgColor="#68bf8e"*/}
        {/*//   // margin="20px"*/}
        {/*//   width="100"*/}
        {/*//   height="80"*/}
        {/*//   // transition= 'width 1s ease-in-out'*/}
        {/*//   transitionDuration="1s"*/}
        {/*//   transitionTimingFunction="ease-in-out"*/}
        {/*//   // transitionDuration="1"*/}
        {/*//   // transition="width 1s ease-in-out 0s"*/}
        {/*//   maxCompleted={100  }*/}
        {/*//   // customLabel={"Energy " + `${categoryScores.energyScore}`}*/}
        {/*//   />*/}
        {/*//   </div>*/}
        {/*//   <br/>*/}
        {/*//   <br/>*/}
        {/*//   <div className="box font-weight-bold">*/}
        {/*//   <p>Energy</p>*/}
        {/*//   </div>*/}
        {/*//   <div className="box ">*/}
        {/*//   <ProgressBar*/}
        {/*//   // completed="20"*/}
        {/*//   completed={`${item.categoryScores.energyScore}`}*/}
        {/*//   // completed={"Energy " + `${30}`}*/}
        {/*//   labelAlignment="center"*/}
        {/*//   labelColor="#000000"*/}
        {/*//   bgColor="#68bf8e"*/}
        {/*//   // margin="20px"*/}
        {/*//   width="100"*/}
        {/*//   height="80"*/}
        {/*//   // transition= 'width 1s ease-in-out'*/}
        {/*//   transitionDuration="1s"*/}
        {/*//   transitionTimingFunction="ease-in-out"*/}
        {/*//   // transitionDuration="1"*/}
        {/*//   // transition="width 1s ease-in-out 0s"*/}
        {/*//   maxCompleted={100  }*/}
        {/*//   // customLabel={"Energy " + `${categoryScores.energyScore}`}*/}
        {/*//   />*/}
        {/*//   </div>*/}
        {/*// /!*</Card>*!/*/}
        {/*//   </div>*/}

        {/*))*/}
        {/*}*/}
    //   </div>
    // </div>

}
export default DetailStatPage;