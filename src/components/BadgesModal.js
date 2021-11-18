import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import recyclingBadge from "../images/badges/recyclingBadge.svg";
import waterBadge from "../images/badges/waterBadge.svg";
import energyBadge from "../images/badges/energyBadge.svg";
import purchasingBadge from "../images/badges/purchaseBadge.svg";
import transportationBadge from "../images/badges/transportationBadge.svg";

const BadgesModal = (props) => {
  let energy = false;
  let purchase = false;
  let recycling = false;
  let transportation = false;
  let water = false;
  const [style, setStyle] = useState({display: 'none'});

  if (props.badges.energyBadge.displayModal === true) {
    energy = true;
  }
  if (props.badges.purchBadge.displayModal === true) {
    purchase = true;
  }
  if (props.badges.recycBadge.displayModal === true) {
    recycling = true;
  }
  if (props.badges.transpBadge.displayModal === true) {
    transportation = true;
  }
  if (props.badges.waterBadge.displayModal === true) {
    water = true;
  }

  return (
    <>
      {energy && (
        <Card className='detail-card'
              onMouseEnter={e => {
                setStyle({display: 'block'});
              }}
              onMouseLeave={e => {
                setStyle({display: 'none'})
              }}>
          <button className='btn btn-primary detail-close'
                  style={style}
                  onClick={props.toggle}>X
          </button>
          <div>
            <h3 className='p-3'>You earned the Energy Badge!</h3>
            <img src={energyBadge} width="100" height="100" alt='EnergyBadge'/>
            <h6 style={style} className='p-3'>Criteria: 300 points in Energy category</h6>
          </div>
        </Card>
      )}

      {purchase && (
        <Card className='detail-card'
              onMouseEnter={e => {
                setStyle({display: 'block'});
              }}
              onMouseLeave={e => {
                setStyle({display: 'none'})
              }}>
          <button className='btn btn-primary detail-close'
                  style={style}
                  onClick={props.toggle}>X
          </button>
          <div>
            <h3 className='p-3'>You earned the Purchase Badge!</h3>
            <img src={purchasingBadge} width="100" height="100" alt='EnergyBadge'/>
            <h6 style={style} className='p-3'>Criteria: 300 points in Purchase category</h6>
          </div>
        </Card>
      )}

      {recycling && (
        <Card className='detail-card'
              onMouseEnter={e => {
                setStyle({display: 'block'});
              }}
              onMouseLeave={e => {
                setStyle({display: 'none'})
              }}>
          <button className='btn btn-primary detail-close'
                  style={style}
                  onClick={props.toggle}>X
          </button>
          <div>
            <h3 className='p-3'>You earned the Recycle Badge!</h3>
            <img src={recyclingBadge} width="100" height="100" alt='EnergyBadge'/>
            <h6 style={style} className='p-3'>Criteria: 300 points in Recycling category</h6>
          </div>
        </Card>
      )}

      {transportation && (
        <Card className='detail-card'
              onMouseEnter={e => {
                setStyle({display: 'block'});
              }}
              onMouseLeave={e => {
                setStyle({display: 'none'})
              }}>
          <button className='btn btn-primary detail-close'
                  style={style}
                  onClick={props.toggle}>X
          </button>
          <div>
            <h3 className='p-3'>You earned the Transportation Badge!</h3>
            <img src={transportationBadge} width="100" height="100" alt='EnergyBadge'/>
            <h6 style={style} className='p-3'>Criteria: 300 points in Transportation category</h6>
          </div>
        </Card>
      )}

      {water && (
        <Card className='detail-card'
              onMouseEnter={e => {
                setStyle({display: 'block'});
              }}
              onMouseLeave={e => {
                setStyle({display: 'none'})
              }}>
          <button className='btn btn-primary detail-close'
                  style={style}
                  onClick={props.toggle}>X
          </button>
          <div>
            <h3 className='p-3'>You earned the Water Badge!</h3>
            <img src={waterBadge} width="100" height="100" alt='EnergyBadge'/>
            <h6 style={style} className='p-3'>Criteria: 300 points in Water category</h6>
          </div>
        </Card>
      )}
    </>
  )
}

export default BadgesModal;
