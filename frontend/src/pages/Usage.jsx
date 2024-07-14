import React from 'react'

const Usage = () => {
  return (
    <div className='mt-10 mx-[10%]' >
      <div>
        <h1 className='text-xl font-bold font-mono'>Here Your Enter the Message that will be shared through this website url and unique id</h1>
        <img src="msg.png" alt="" />
      </div>
      <div>
        <h1 className='text-xl font-bold font-mono'>Here Your can either enter any random string that is considered as the unique id or can generate randomly using the random button </h1>
        <img src="Id.png" alt="" />
      </div>
      <div>
        <h1 className='text-xl font-bold font-mono'>Here Your set the timer i.e for how long this message need to shared through the link.
          </h1>
          <h1 className='text-xl font-bold font-mono'>
          And by clicking the create button your link will be activated and will be redirected to that link.
        </h1>
        <img src="timer.png" alt="" />
      </div>
    </div>
  )
}

export default Usage