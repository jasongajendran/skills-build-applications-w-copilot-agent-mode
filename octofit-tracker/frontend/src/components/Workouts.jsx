import { useEffect, useState } from 'react'
import useApi from '../useApi.js'

function Workouts() {
  const { fetchData, baseUrl, error, isLoading } = useApi('workouts')
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    fetchData().then((data) => {
      if (Array.isArray(data)) {
        setWorkouts(data)
      } else if (Array.isArray(data?.workouts)) {
        setWorkouts(data.workouts)
      }
    })
  }, [fetchData])

  return (
    <section>
      <h2>Workouts</h2>
      <p>Using API base URL: <code>{baseUrl}</code></p>
      {isLoading && <p>Loading workouts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id ?? workout.id}>{workout.name} ({workout.durationMinutes} min)</li>
        ))}
      </ul>
    </section>
  )
}

export default Workouts
