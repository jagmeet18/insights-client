import React, { useState, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import styles from './app.module.css'
import { UserProvider } from "./user.context";
import NavBar from "./NavBar/bar";
import Profile from "./Profile/page";
import Rooms from "./Rooms/page";
import VirtualSpace from "./VirtualSpace/page";
import Communities from "./Communities/page";
import Publish from "./publishform"
import ShowChat from "./Chat/showchat"

export default function App({ match, location, history }) {
  const [queries, setQueries] = useState(location.search);
	useEffect(() => {
		if (queries === '') {
			// either user reloaded, came to /app during an existing session, or tried to come here through browser search bar
			const q = localStorage.getItem('signin-queries')
			console.log('Empty "location.search"\nChecking if "signin-queries" exists in localStorage:', q ? true : false)
			// if q is not null, then the user reloaded or just came to /app during an existing session
			// if q is null, then the user tried to come here through browser search bar outside of an existing session
			if (q) {
				setQueries(q)
			} else {
				history.push('/')
			}
			/**
			 * NOTE: security flaw is that 'signin-queries' just has to exist in localStorage.
			 * It isn't a token that is checked in the backend.
			 * In fact, the user could sign in as any other user if they just know another username. We are just trusting them not to.
			 * For part 3, tokens will be used.
			 */
		} else {
			// user simply signed in (logged in/ signed up)
			localStorage.setItem('signin-queries', queries)
			console.log('Existing queries state\nSet signin-queries to localStorage as:', queries)
		}

	}, [history, queries]);

	console.log("went through app component")
		
	return (


		<div className={styles.app}>
			<NavBar />
			{
				queries &&
				<UserProvider query={queries}>
					<div className={styles.page}>
						<Route exact path={`${match.path}/`}>
							<Redirect to={`${match.path}/rooms`} />
						</Route>
						<Route path={`${match.path}/profile`}>
							<Profile />
						</Route>
						<Route path={`${match.path}/rooms`}>
							<Rooms />
						</Route>
						<Route path={`${match.path}/vs/:id`}>
							<VirtualSpace />
						</Route>
						<Route path={`${match.path}/communities`}>
							<Communities />
						</Route>
					</div>
				</UserProvider>
			}
		</div>
	);
}
