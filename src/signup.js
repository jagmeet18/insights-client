import React from 'react';
import { Link } from "react-router-dom"

const SignUp = ({ history }) => {
    return (
        <div style={{ paddingLeft: "25px", paddingTop: "25px" }}>
            <button style={{marginBottom:"15px"}} onClick={() => history.push('/app')}>Sign up</button>
            <p>Existing member? <Link to='/login'>Log in</Link></p>
        </div>)
};

export default SignUp;
