import React from 'react';
import "./Button.css"

export const Button = ({ name }) => {
  return (<div className="profile-catalogue-button">
            <button>{name}</button>
    </div>)
};

export default Button;
