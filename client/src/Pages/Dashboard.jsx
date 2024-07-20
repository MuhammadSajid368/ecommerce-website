import React, { act, useState } from 'react'
import AdminPanel from './AdminPanel'
import ProfileContent from './ProfileContent'

const Dashboard = () => {
  const [active, setactive] = useState(1);

  return (
    <div className='flex w-full '>
        <div className='w-auto'>
        <AdminPanel active={active} setactive={setactive} />
        </div>
        <div className=' w-full mr-6 mt-2'>
            <ProfileContent active={active} />
        </div>
    </div>
  )
}

export default Dashboard