import { useEffect, useState } from 'react'
import useApi from '../useApi.js'

// Example Codespaces API endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities
function Activities() {
  const { fetchData, baseUrl, error, isLoading } = useApi('activities')
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetchData().then((data) => {
      if (Array.isArray(data)) {
        setActivities(data)
      } else if (Array.isArray(data?.activities)) {
        setActivities(data.activities)
      }
    })
  }, [fetchData])

  return (
    <section>
      <h2>Activities</h2>
      <p>Using API base URL: <code>{baseUrl}</code></p>
      {isLoading && <p>Loading activities...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id ?? activity.id}>
            {activity.type} - {activity.distanceKm} km in {activity.durationMinutes} min
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
