import React, {useState} from 'react'
import feedbackMachine from '../../stateMachines/feedbackPhase1'
import {useMachine} from '@xstate/react'

const Feedback = () => {
  let [current, send] = useMachine(feedbackMachine)
  
  return (
    <div style={{width: '100%'}}>
    <div style={{border: '3px solid rebeccapurple', textAlign: 'center', height: '350px', width: '100%'}}>
      <h1>Phase 1 - Feedback Widget</h1>

      <h2>{current.context.message}</h2>

      {/* START */}
      {current.matches('start') && 
        <button onClick={() => send('CLICK')}>Feedback Click</button>
      }

      {/* START */}
      {current.matches('feedback.response') && 
      <>
        <p>
          <button onClick={() => send('POSITIVE')}>POSITIVE 👍</button>
          <pre>or</pre>
          <button onClick={() => send('NEGATIVE')}>NEGATIVE 👎</button>
        </p>
        <br/>
        <button onClick={() => send('CANCEL')}>CANCEL</button>
      </>
      }
      
      {/* RESTART */}
      {(current.matches('feedback.positiveConfirm') || current.matches('feedback.negativeConfirm')) && 
      <button onClick={() => send('RESTART')}>Restart</button>
      }


    </div>
      {/* STATE MACHINE AND STATE */}
      <div style={{backgroundColor: 'gainsboro', textAlign: 'left', width: '100%', textOverflow: 'ellipsis'}}>
        <small>
          <p>state: {JSON.stringify(current.value)}</p>
          <p>context: {JSON.stringify(current.context)}</p>
        </small>
      </div>

    </div>
  )
}

export default Feedback