import React, { useState } from 'react'
import TextArea from '../components/TextArea'
import Id from '../components/Id'
import CreateSection from '../components/CreateSection'

const Home = () => {
  const [text,setText] = useState();
  const [timer,setTimer] = useState();
  const [id,setId] = useState();

  return (
    <div className='mx-[10%]'>
        <TextArea text={text} setText={setText} />
        <div className='flex justify-around'>
            <Id id={id} setId={setId} />
            <CreateSection text={text} timer={timer} setTimer={setTimer} id={id} />
        </div>
    </div>
  )
}

export default Home