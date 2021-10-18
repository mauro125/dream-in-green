import React, { Component } from 'react';
import Q from 'react-modal';

export default function Modal(props){

    return(
      
        <div className="modal">
            <Q
                isOpen={ props.isOpen }
                contentLabel={props.title} >
             {props.children}
            </Q>  
        </div>     
    )
}