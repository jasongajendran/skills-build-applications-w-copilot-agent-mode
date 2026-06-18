import { useCallback, useMemo, useState } from 'react'

function getApiBaseUrl(resource: string) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const host = codespaceName ? `${codespaceName}-8000.app.github.dev` : 'localhost:8000'
  const protocol = codespaceName ? 'https' : 'http'
  const baseUrl = `${protocol}://${host}/api/${resource}`

  return {
    baseUrl,
    fallbackNote: codespaceName
      ? ''
      : 'Define VITE_CODESPACE_NAME in .env.local to use Codespaces URLs; localhost fallback is active.',
  }
}

export default function useApi(resource: string) {
  const { baseUrl, fallbackNote } = useMemo(() => getApiBaseUrl(resource), [resource])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(baseUrl)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (err) {
      setError(err instanceof Error ? `${err.message}. ${fallbackNote}` : 'Unknown error')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [baseUrl, fallbackNote])

  return { fetchData, baseUrl, error, isLoading }
}
