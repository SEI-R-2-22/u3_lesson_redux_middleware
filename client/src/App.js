import { Route } from 'react-router-dom'
import Departments from './components/Departments'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <h3>Redux Middleware</h3>
      <div className="flex-row">
        <div className="left">
          <Departments />
        </div>
        <div className="right">
          <Route path="/departments/:id" component={() => <div></div>} />
        </div>
      </div>
    </div>
  )
}

export default App
