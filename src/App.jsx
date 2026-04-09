import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/characters')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setCharacters(data.items || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCharacters()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-900 to-yellow-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className='text-center'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Dragon_Ball_Super.png" alt="" />
        </div>
        <p className="text-center text-yellow-100 mb-8 text-lg">Descubre todos los personajes del universo Dragon Ball</p>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-300"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg text-center mb-8">
            Error: {error}
          </div>
        )}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <div key={character.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
                <img 
                  src={character.image} 
                  alt={character.name} 
                  className="w-full h-64 object-scale-down"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-yellow-300 mb-2">{character.name}</h2>
                  <p className="text-gray-300 text-sm mb-2"><span className="text-yellow-200 font-semibold">Raza:</span> {character.race}</p>
                  <p className="text-gray-300 text-sm mb-2"><span className="text-yellow-200 font-semibold">Género:</span> {character.gender}</p>
                  <p className="text-gray-300 text-sm mb-3"><span className="text-yellow-200 font-semibold">Ki:</span> {character.ki}</p>
                  {character.description && (
                    <p className="text-gray-400 text-sm line-clamp-3">{character.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && !error && characters.length > 0 && (
          <p className="text-center text-yellow-100 mt-8 text-lg">Total: <span className="font-bold text-yellow-300">{characters.length}</span> personajes</p>
        )}
      </div>
    </div>
  )
}

export default App
