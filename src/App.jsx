
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const getUsers = () => {
    setLoading(true)
    setSelectedUser(null)

    const skip = Math.floor(Math.random() * 150)

    axios.get(`https://dummyjson.com/users?limit=12&skip=${skip}`)
      .then(response => {
        setUsers(response.data.users)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#3b04de] via-[#d900ff] to-[#6a0595] p-6'>

      <div className='max-w-7xl mx-auto'>

        {/* Header */}
        <div className='text-center mb-10'>

          <h1 className='text-5xl font-extrabold bg-gradient-to-r from-[#6a0595] via-[#3b04de] bg-clip-text text-transparent'>
            Random Users
          </h1>
          <p className='bg-gradient-to-r from-[#3b04de] via-[#6a0595] bg-clip-text text-transparent'>
            12 ta foydalanuvchi haqida ma'lumot
          </p>

          <button
            onClick={getUsers}
            disabled={loading}
            className='bg-purple-600 hover:bg-purple-800 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition'
          >
             {loading ? 'Loading...' : 'Random Users'}
          </button>

        </div>

        {/* Cards */}
        {loading ? (

          <h2 className='text-center text-2xl text-purple-700 font-bold'>
            Loading...
          </h2>

        ) : (

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>

            {users.map(user => (

              <div
                key={user.id}
                className='bg-white rounded-2xl shadow-md p-5 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition duration-300'
              >

                <img
                  src={user.image}
                  alt={user.firstName}
                  className='w-28 h-28 rounded-full object-cover border-4 border-purple-200'
                />

                <h2 className='text-xl font-bold mt-4 text-gray-800'>
                  {user.firstName} {user.lastName}
                </h2>

                <p className='text-sm text-gray-500 mt-2 break-all text-center'>
                   {user.email}
                </p>

                <p className='text-gray-600 mt-2'>
                   {user.address.city}
                </p>

                <button
                  onClick={() => setSelectedUser(user)}
                  className='bg-purple-600 hover:bg-purple-800 text-white px-5 py-3 rounded-xl mt-5 w-full font-semibold transition'
                >
                  To'liq ma'lumot
                </button>

              </div>

            ))}

          </div>

        )}

        {/* Modal */}
        {selectedUser && (

          <div className='fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50'>

            <div className='bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-2xl'>

              <div className='flex justify-between items-center mb-5'>

                <h2 className='text-2xl font-bold text-purple-700'>
                  User Information
                </h2>

                <button
                  onClick={() => setSelectedUser(null)}
                  className='text-2xl text-gray-500 hover:text-red-500'
                >
                  ✕
                </button>

              </div>

              <div className='flex flex-col items-center mb-5'>

                <img
                  src={selectedUser.image}
                  alt={selectedUser.firstName}
                  className='w-32 h-32 rounded-full object-cover border-4 border-purple-300'
                />

                <h2 className='text-2xl font-bold mt-3'>
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>

              </div>

              <div className='space-y-3 text-gray-700'>

                <p><b> Ism:</b> {selectedUser.firstName}</p>

                <p><b> Familiya:</b> {selectedUser.lastName}</p>

                <p><b> Yoshi:</b> {selectedUser.age}</p>

                <p><b> Tug'ilgan sana:</b> {selectedUser.birthDate}</p>

                <p><b> Jinsi:</b> {selectedUser.gender}</p>

                <p className='break-all'>
                  <b> Email:</b> {selectedUser.email}
                </p>

                <p><b> Telefon:</b> {selectedUser.phone}</p>

                <p><b> Shahar:</b> {selectedUser.address.city}</p>

                <p><b> Manzil:</b> {selectedUser.address.address}</p>

                <p><b> Davlat:</b> {selectedUser.address.country}</p>

                <p><b> Pochta indeksi:</b> {selectedUser.address.postalCode}</p>

                <p><b> Kasbi:</b> {selectedUser.company.title}</p>

                <p><b> Kompaniya:</b> {selectedUser.company.name}</p>

              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className='bg-purple-600 hover:bg-purple-800 text-white w-full py-3 rounded-xl mt-6 font-bold'
              >
                Yopish
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  )
}

export default App
