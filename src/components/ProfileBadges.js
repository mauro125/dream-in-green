import Card from "react-bootstrap/Card";
import recyclingBadge from "../images/badges/recyclingBadge.svg";
import water from "../images/badges/waterBadge.svg";
import energy from "../images/badges/energyBadge.svg";
import purchase from "../images/badges/purchaseBadge.svg";
import transportation from "../images/badges/transportationBadge.svg";
import React from "react";

const ProfileBadges = (props) => {

  return (
    <div className='col m-3 profile-user-badge'>
      <Card className='profile-card p-3' border='primary'>
        <h3 className='text-primary'>Badges</h3>
        <div className='container-fluid'>
          <div className='row p-1'>
            <div title="Energy Badge: 300 points in Energy category"
                 className={`col-sm-6 p-2 text-md-right ${!props.badges.energyBadge.awarded ? 'disable-badge' : ''}`}>
              <img src={energy} width="150" height="150" alt=""/>
            </div>
            <div title="Recycling Badge: 300 points in Recycle category"
                 className={`col-sm-6 p-2 text-md-right ${!props.badges.recycBadge.awarded ? 'disable-badge' : ''}`}>
              <img src={recyclingBadge} width="150" height="150" alt=""/>
            </div>
            <div title="Water Badge: 300 points in Water category"
                 className={`col-sm-6 p-2 text-md-right ${!props.badges.waterBadge.awarded ? 'disable-badge' : ''}`}>
              <img src={water} width="150" height="150" alt=""/>
            </div>
            <div title="Purchasing Badge: 300 points in Purchases category"
                 className={`col-sm-6 p-2 text-md-right ${!props.badges.purchBadge.awarded ? 'disable-badge' : ''}`}>
              <img src={purchase} width="150" height="150" alt=""/>
            </div>
            <div title="Transportation Badge: 300 points in Transportation category"
                 className={`col-sm-6 p-2 text-md-right ${!props.badges.transpBadge.awarded ? 'disable-badge' : ''}`}>
              <img src={transportation} width="150" height="150" alt=""/>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProfileBadges;