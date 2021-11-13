import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const DoughnutChart = (props) => {

  let labels = [];
  let scores = [];
  for (let [key, value] of Object.entries(props.catScores)) {
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
    labels.push(key)
    scores.push(value)
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'Points in category',
        data: [scores[0], scores[1], scores[2], scores[3], scores[4]],
        // backgroundColor: [
        //   'rgba(32, 128, 74, 0.6)',
        //   'rgba(104, 191, 142, 0.6)',
        //   'rgba(32, 128, 74, 0.6)',
        //   'rgba(104, 191, 142, 0.6)',
        //   'rgba(32, 128, 74, 0.6)',
        // ],
        // borderColor: [
        //   'rgba(32, 128, 74, 1)',
        //   'rgba(104, 191, 142, 1)',
        //   'rgba(32, 128, 74, 1)',
        //   'rgba(104, 191, 142, 1)',
        //   'rgba(32, 128, 74, 1)',
        // ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };
  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    circumference: 360,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'left',
      },
      title: {
        display: true,
        text: 'Score Per Category',
      },
    },
  };
  return (
    <>
      <Doughnut data={data} options={options}/>
    </>
  );
}

export default DoughnutChart;