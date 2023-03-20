import React from 'react'
import { ActivityFilterNavbar, ActivityFilterResults, ActivityFilterSidebar } from '../../components/_activity'
import ActivityProvider from '../../contexts/Activity.context'

const Activity = () => {
  return (
    <ActivityProvider>
      <div className='flex flex-col items-center mt-[116px]'>
        <ActivityFilterNavbar />
        <div className='flex flex-row max-w-[1250px] w-full mt-[9px]'>
          <ActivityFilterSidebar />
          <ActivityFilterResults />
        </div>
      </div>
    </ActivityProvider>
  )
}

export default Activity
