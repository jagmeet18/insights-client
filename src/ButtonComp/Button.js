import React from 'react';
import "./Button.css"

export const Button = ({ name, onCLickHandler }) => {
  return (
  <div className="profile-catalogue-button">
            <button value={name} onClick={onCLickHandler} className='collab-comm'>{name}</button>
  </div>
  
  )
};

export default Button;
