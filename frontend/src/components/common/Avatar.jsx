import React from 'react'

const Avatar = () => {
    const {user, loading} = useContext(userContext);

  return (
    <div>
        {loading ? <h1>Loading...</h1> :
        <div className='w-30 h-30 rounded-full ' >
             <img src={user?.avatar} alt="avatar" />
        </div>
        }
    </div>
  )
}

export default Avatar