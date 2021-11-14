import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import Card from 'react-bootstrap/Card';

const DetailItem = (props) => {
  return (
    <div>
      {props.scores.map((score, i) =>
        <div key={i}>
          <Card className='detail-card'>
            <div>
              <div className='detail-header'>
                <h5 className='box'>Date Taken <h6>{score.createdAt}</h6></h5>
                <h5 className='box'>Overall Score <h6>{score.score}</h6></h5>
              </div>
              <br/>
              <br/>
              <h4>Score Breakdown:</h4>
              <br/>
              <div className="box font-weight-bold">
                <h6>Transportation</h6>
              </div>
              <div className="box ">
                <ProgressBar
                  completed={`${score.currentQuizCatScore.currentTransScore}`}
                  labelAlignment="center"
                  labelColor="#000000"
                  bgColor="#68bf8e"
                  width="100"
                  height="60"
                  transitionDuration="1s"
                  transitionTimingFunction="ease-in-out"
                  maxCompleted={20}
                />
              </div>

              <br/>
              <br/>
              <div className="box font-weight-bold">
                <h6>Energy</h6>
              </div>
              <div className="box ">
                <ProgressBar
                  completed={`${score.currentQuizCatScore.currentEnergyScore}`}
                  labelAlignment="center"
                  labelColor="#000000"
                  bgColor="#68bf8e"
                  width="100"
                  height="60"
                  transitionDuration="1s"
                  transitionTimingFunction="ease-in-out"
                  maxCompleted={20}
                />
                <br/>
              </div>

              <div className="box font-weight-bold">
                <h6>Purchase:</h6>
              </div>
              <div className="box ">
                <ProgressBar
                  completed={`${score.currentQuizCatScore.currentPurchScore}`}
                  labelAlignment="center"
                  labelColor="#000000"
                  bgColor="#68bf8e"
                  width="100"
                  height="60"
                  transitionDuration="1s"
                  transitionTimingFunction="ease-in-out"
                  maxCompleted={20}
                />
              </div>

              <br/>
              <div className="box font-weight-bold">
                <h6>Recycling:</h6>
              </div>
              <div className="divider"/>
              <div className="box ">
                <ProgressBar
                  completed={`${score.currentQuizCatScore.currentRecycScore}`}
                  labelAlignment="center"
                  labelColor="#000000"
                  bgColor="#68bf8e"
                  width="100"
                  height="60"
                  transitionDuration="1s"
                  transitionTimingFunction="ease-in-out"
                  maxCompleted={20}
                />
                <br/>
              </div>

              <div className="box font-weight-bold">
                <h6>Water:</h6>
              </div>
              <div className="divider"/>
              <div className="box ">
                <ProgressBar
                  completed={`${score.currentQuizCatScore.currentWaterScore}`}
                  labelAlignment="center"
                  labelColor="#000000"
                  bgColor="#68bf8e"
                  width="100"
                  height="60"
                  transitionDuration="1s"
                  transitionTimingFunction="ease-in-out"
                  maxCompleted={20}
                />
                <br/>
                <br/>
              </div>
            </div>
          </Card>
        </div>
      )
      }
    </div>);
};

export default DetailItem;