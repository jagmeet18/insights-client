import React from 'react';
import { useHistory, Link } from "react-router-dom"

const Login = () => {
    const history = useHistory()
    return (
        <div style={{ paddingLeft: "25px", paddingTop: "25px" }}>
            <button style={{marginBottom:"15px"}} onClick={() => history.push('/app')}>Login</button>
            <br></br>
            <p>New member? <Link to='/signup'>Create an account</Link></p>
        </div>)
};

export default Login;
