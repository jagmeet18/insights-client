import TextEditor from "./TextEditor"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

function App() {

  return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Redirect to={`/vs/create`} />
				</Route>
				<Route path="/:id" exact>
					<Redirect to={`/vs/join/:id`} />
				</Route>
				<Route path="/vs/join/:id">
					<TextEditor />
				</Route>
				<Route path="/vs/create">
					<TextEditor />
				</Route>
			</Switch>
		</Router>
  )
}

export default App
