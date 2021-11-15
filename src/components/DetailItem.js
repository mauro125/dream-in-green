import React, {useState} from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import Card from 'react-bootstrap/Card';

const DetailItem = (props) => {
  const [style, setStyle] = useState({display: 'none'});
  return (
    <>
      {
        props.scores.map((score, i) =>
          <Card key={i} className='detail-card'
                onMouseEnter={e => {
                  setStyle({display: 'block'});
                }}
                onMouseLeave={e => {
                  setStyle({display: 'none'})
                }}>
            <button className='btn btn-primary detail-close'
                    style={style}
                    onClick={props.toggle}>Close
            </button>
            <h4>Score Breakdown:</h4>
            <div className='p-4'>
              <h6>Date Taken: <small>{score.createdAt}</small></h6>
              <h6>Overall Score: <small>{score.score}</small></h6>
            </div>

            <div className='container-fluid'>
              <div className='row p-1'>
                <div className='col-sm-6'>
                  <h6 className='text-md-right'>Transportation</h6>
                </div>
                <div className='col-sm-6'>
                  <ProgressBar
                    completed={`${score.currentQuizCatScore.currentTransScore}`}
                    labelAlignment="center"
                    labelColor="#000000"
                    bgColor="#68bf8e"
                    transitionDuration="1s"
                    transitionTimingFunction="ease-in-out"
                    maxCompleted={20}
                    animateOnRender
                  />
                </div>
              </div>
            </div>

            <div className='container-fluid'>
              <div className='row p-1'>
                <div className='col-sm-6'>
                  <h6 className='text-md-right'>Energy</h6>
                </div>
                <div className='col-sm-6'>
                  <ProgressBar
                    completed={`${score.currentQuizCatScore.currentEnergyScore}`}
                    labelAlignment="center"
                    labelColor="#000000"
                    bgColor="#68bf8e"
                    transitionDuration="1s"
                    transitionTimingFunction="ease-in-out"
                    maxCompleted={20}
                    animateOnRender
                  />
                </div>
              </div>
            </div>

            <div className='container-fluid'>
              <div className='row p-1'>
                <div className='col-sm-6'>
                  <h6 className='text-md-right'>Purchase</h6>
                </div>
                <div className='col-sm-6'>
                  <ProgressBar
                    completed={`${score.currentQuizCatScore.currentPurchScore}`}
                    labelAlignment="center"
                    labelColor="#000000"
                    bgColor="#68bf8e"
                    transitionDuration="1s"
                    transitionTimingFunction="ease-in-out"
                    maxCompleted={20}
                    animateOnRender
                  />
                </div>
              </div>
            </div>

            <div className='container-fluid'>
              <div className='row p-1'>
                <div className='col-sm-6'>
                  <h6 className='text-md-right'>Recycling</h6>
                </div>
                <div className='col-sm-6'>
                  <ProgressBar
                    completed={`${score.currentQuizCatScore.currentRecycScore}`}
                    labelAlignment="center"
                    labelColor="#000000"
                    bgColor="#68bf8e"
                    transitionDuration="1s"
                    transitionTimingFunction="ease-in-out"
                    maxCompleted={20}
                    animateOnRender
                  />
                </div>
              </div>
            </div>

            <div className='container-fluid'>
              <div className='row p-1'>
                <div className='col-sm-6'>
                  <h6 className='text-md-right'>Water</h6>
                </div>
                <div className='col-sm-6'>
                  <ProgressBar
                    completed={`${score.currentQuizCatScore.currentWaterScore}`}
                    labelAlignment="center"
                    labelColor="#000000"
                    bgColor="#68bf8e"
                    transitionDuration="1s"
                    transitionTimingFunction="ease-in-out"
                    maxCompleted={20}
                    animateOnRender
                  />
                </div>
              </div>
            </div>
          </Card>
        )

      }
    </>
  );
};

export default DetailItem;