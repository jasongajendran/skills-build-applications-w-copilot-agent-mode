import { useEffect, useState } from 'react'
import useApi from '../useApi.js'

// Example Codespaces API endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
function Leaderboard() {
  const { fetchData, baseUrl, error, isLoading } = useApi('leaderboard')
  const [entries, setEntries] = useState([])

  useEffect(() => {
    fetchData().then((data) => {
      if (Array.isArray(data)) {
        setEntries(data)
      } else if (Array.isArray(data?.leaderboard)) {
        setEntries(data.leaderboard)
      }
    })
  }, [fetchData])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>Using API base URL: <code>{baseUrl}</code></p>
      {isLoading && <p>Loading leaderboard...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ol>
        {entries.map((entry) => (
          <li key={entry._id ?? `${entry.teamId}-${entry.rank}`}>
            {entry.teamId?.name ?? entry.teamId ?? `Team ${entry.rank}`}: {entry.points} pts
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard
