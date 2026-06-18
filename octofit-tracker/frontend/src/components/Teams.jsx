import { useEffect, useState } from 'react'
import useApi from '../useApi.js'

function Teams() {
  const { fetchData, baseUrl, error, isLoading } = useApi('teams')
  const [teams, setTeams] = useState([])

  useEffect(() => {
    fetchData().then((data) => {
      if (Array.isArray(data)) {
        setTeams(data)
      } else if (Array.isArray(data?.teams)) {
        setTeams(data.teams)
      }
    })
  }, [fetchData])

  return (
    <section>
      <h2>Teams</h2>
      <p>Using API base URL: <code>{baseUrl}</code></p>
      {isLoading && <p>Loading teams...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id ?? team.id}>{team.name}</li>
        ))}
      </ul>
    </section>
  )
}

export default Teams
