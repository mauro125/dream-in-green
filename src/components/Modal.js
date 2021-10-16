import React, { Component } from 'react';
import Modal from 'react-modal';

export default function Modal(props){

    return(
      
        <div className="modal">
            <Modal
                isOpen={ props.isOpen }
                contentLabel="Please enter your age" >
                <h1>Please enter your age</h1>
                <button onClick={props.toggle}>close</button>
            </Modal>  
        </div>     
    )
}