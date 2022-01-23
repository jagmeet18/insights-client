import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import "./index.css"
import Login from "./login"
import SignUp from "./signup"
import App from "./app"

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Switch>
				<Route path="/" exact>
					<Redirect to="/login"/>
				</Route>
				<Route path="/login" component={Login}/>
				<Route path="/signup" component={SignUp}/>
				<Route path="/app" component={App}/>
			</Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
)
