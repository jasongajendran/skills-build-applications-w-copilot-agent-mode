import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'system-ui, sans-serif', padding: '1.5rem' }}>
        <header>
          <h1>OctoFit Tracker</h1>
          <p>
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to enable Codespaces API URLs.
          </p>
          <nav style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Users />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
