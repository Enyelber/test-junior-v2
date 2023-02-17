import { useState, useCallback } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log('search', search)
      getMovies({ search })
    }, 300),
    [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
    //Forma no controlada de un Formulario
    // Obtener el valor del input
    // const fields = new FormData(event.target)
    // const query = fields.get('query')

    //Otra manera de obtener el valor del input
    //const fields = Object.fromEntries(new FormData(event.target))

    //Forma No controlada de un formulario optimizada
    //const { query } = Object.fromEntries(new window.FormData(event.target))
  }

  // Forma Controlada de un formulario
  const handleChange = (event) => {
    // const newQuery = event.target.value

    // if (newQuery === ' ') return
    const newSearch = event.target.value
    updateSearch(newSearch)
    //getMovies({ search: newSearch })
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Technical Test</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='query'
            value={search}
            onChange={handleChange}
            placeholder='Avenger, Black Adam, The matrix... '
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button>Search movie</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
