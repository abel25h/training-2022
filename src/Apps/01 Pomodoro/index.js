import React, { useState, useEffect } from "react";
import "./styles.css";
import alarm from '../../media/alarm.mp3'

function PomodoroApp() {
  let audio = new Audio(alarm);
  const [isEditing, isEditingSet] = useState(false)
  const [workDuration, workDurationSet] = useState(1500)
  const [restDuration, restDurationSet] = useState(300)
  const [timeLeft, timeLeftSet] = useState(workDuration);
  const [isRunning, isRunningSet] = useState(false)
  const [currentStep, currentStepSet] = useState('Trabajo')
  const [isRinging, isRingingSet] = useState('')

  const handleEditSubmit = (e)=> {
    e.preventDefault()
    clockHandlerReset()
    changeEditing(true)
  }

  const changeEditing = (state) => {
    isEditingSet(!state)
  }

  const alarmHandler = () => {
    if(isRinging) {
      clearInterval(isRinging)
      isRingingSet('')
    }else{
      const int = setInterval(()=> {
        audio.play()
      },10)
      isRingingSet(int)
    }
  }

  const clockHandler = (actual) => {
    isRunningSet(!actual)
    if(!isRunning) timeLeftSet(timeLeft - 1)
  }
  const clockHandlerReset = () => {
    isRunningSet(false)
    setTimeout(() => timeLeftSet(workDuration),1000)
    currentStepSet('Trabajo')
  }

  useEffect(()=> {
    if(isRunning) {
      let interval = setInterval(() => {
        clearInterval(interval)
        if(timeLeft < 1) {
          if(currentStep === 'Trabajo') {
            alarmHandler()
            timeLeftSet(restDuration)
            currentStepSet('Descanso')
          }
          if(currentStep === 'Descanso') {
            alarmHandler()
            timeLeftSet(workDuration)
            currentStepSet('Trabajo')
          }
        } else {
          timeLeftSet(timeLeft - 1)
        }
      }, 1000)
    }
  }, [timeLeft])
  return (
    <div className="w-full flex flex-col items-center align-start mt-16">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <h1 className="text-center text-4xl flex items-end">
          Pomodoro App ( {currentStep} )
          <button onClick={()=>changeEditing(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4 hover:text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
        </h1>
        
        <span
          className="bg-transparent text-green-500 block flex items-center
          justify-center rounded-full text-9xl my-12 text-shadow-custom">
          {(Math.floor(timeLeft/60) < 10) ? `0${Math.floor(timeLeft/60)}` : Math.floor(timeLeft/60)}:{(timeLeft%60 < 10) ? `0${timeLeft%60}` : timeLeft%60}
        </span>
        {isRinging && 
          <div className="fixed top-0 w-screen h-screen backdrop-blur flex items-center justify-center">
          <div className="p-16 bg-custom flex flex-col justify-around items-center rounded-lg">
            <h2 className="text-2xl">Time's Up!</h2>
            <button className="bg-indigo-600 text-white px-4 py-3 rounded-lg" onClick={() => alarmHandler()} type="button">Dismiss</button>
          </div>
        </div>
        }
        {isEditing && 
          <div className="fixed top-0 w-screen h-screen backdrop-blur flex items-center justify-center">
          <form onSubmit={(e) => handleEditSubmit(e)} className="p-8 bg-custom flex flex-col justify-around items-center rounded-lg">
            <h2 className="text-3xl mb-8">Edit periods</h2>
            <label htmlFor="workTime" className="flex flex-col w-full my-4">
              <span className="text-xs font-bold mb-2">Set Work period length (minutes)</span>
              <input 
                type="number"
                id="worktime"
                className="w-full rounded-lg text-indigo-800 font-bold p-2"
                onChange={(e) => {
                  if(e.target.value > 0 ) workDurationSet(e.target.value*60)
                }}
                value={workDuration/60} />
            </label>
            <label htmlFor="restTime" className="flex flex-col w-full my-4">
              <span className="text-xs font-bold mb-2">Set Rest period length (minutes)</span>
              <input 
                type="number"
                id="restTime"
                className="w-full rounded-lg text-indigo-800 font-bold p-2"
                onChange={(e) => {
                  if(e.target.value > 0 ) restDurationSet(e.target.value*60)
                }}
                value={restDuration/60} />
            </label>
            <button type="submit" className="px-8 py-4">Submit</button>
          </form>
        </div>
        }
        <div className="flex space-x-8">
          <button
            className="border-2 border-indigo-200 text-indigo-200 px-8 py-2 rounded-lg hover:bg-indigo-600 hover:text-white"
            onClick={()=>clockHandler(isRunning)}>
            {isRunning ? 'Stop': 'Start'}
          </button>
          <button
            className="border-2 border-indigo-200 text-indigo-200 px-8 py-2 rounded-lg hover:bg-indigo-600 hover:text-white"
            onClick={()=>clockHandlerReset()}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}




export default PomodoroApp;
