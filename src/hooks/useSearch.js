import { useEffect, useState, useRef } from 'react'

export function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('The search cannot be performed with the empty parameter.')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('The search cannot be performed with numbers.')
      return
    }
    if (search.length < 3) {
      setError('The search cannot be performed with less than 3 characters.')
      return
    }
    setError(null)
  }, [search])
  return { search, updateSearch, error }
}