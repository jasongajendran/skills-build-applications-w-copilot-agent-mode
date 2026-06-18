import { useEffect, useState } from 'react'
import useApi from '../useApi.js'

// Example Codespaces API endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users
function Users() {
  const { fetchData, baseUrl, error, isLoading } = useApi('users')
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchData().then((data) => {
      if (Array.isArray(data)) {
        setUsers(data)
      } else if (Array.isArray(data?.users)) {
        setUsers(data.users)
      }
    })
  }, [fetchData])

  return (
    <section>
      <h2>Users</h2>
      <p>Using API base URL: <code>{baseUrl}</code></p>
      {isLoading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id ?? user.id}>{user.name || user.email}</li>
        ))}
      </ul>
    </section>
  )
}

export default Users
