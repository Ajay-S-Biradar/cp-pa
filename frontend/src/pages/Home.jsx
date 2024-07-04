import React, { useState } from 'react'
import TextArea from '../components/TextArea'
import Id from '../components/Id'
import CreateSection from '../components/CreateSection'
import {HashLoader} from 'react-spinners'

const Home = () => {
  const [text,setText] = useState();
  const [timer,setTimer] = useState();
  const [id,setId] = useState();
  const [loader,setLoader] = useState(false);

  const [isEditing,setIsEditing] = useState(false);

  return loader?<div className='min-w-full h-[85vh] flex justify-center items-center'><HashLoader /> </div>:(
    <div className='mx-[10%]'>
        <TextArea text={text} setText={setText} />
        <div className='flex justify-around'>
            <Id id={id} setId={setId} />
            <CreateSection setLoader={setLoader} isEditing={isEditing} text={text} timer={timer} setTimer={setTimer} id={id} />
        </div>
    </div>
  )
}

export default Home