import React from 'react';
import {useParams} from "react-router-dom";
import {useAuth} from "../states/userState";

const DetailStatPage = () => {
  const {stringDate} = useAuth();
  const params = useParams();

  let newArr = [];
  const {date} = params;

  for (let i = 0; i < stringDate.length; i++) {
    if(stringDate[i].createdAt === date) {
      newArr.push(stringDate[i])
    }
  }

    return (
      <div>

      </div>
    );
  }
  export default DetailStatPage;