import React, { useState } from 'react'
import AllUsers from './AllUsers'
import AllProducts from './AllProducts'

const ProfileContent = ({ active }) => {
  return (
    <div>
       {active === 1 && <AllUsers /> }
       {active === 2 && <AllProducts /> }
    </div>
  )
}

export default ProfileContent