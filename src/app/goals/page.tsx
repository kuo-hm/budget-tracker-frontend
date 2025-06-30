import GoalsContent from '@/components/goals/goals-content'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense
        fallback={
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        <GoalsContent/>
      </Suspense>
  )
}

export default page