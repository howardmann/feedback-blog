import React from 'react'
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
        <button onClick={() => send('CLICK')}>GIVE FEEDBACK</button>
      }

      {/* START */}
      {current.matches('feedback.response') && 
      <>
        <p>
          <button style={{backgroundColor: 'seagreen', color: 'white'}} onClick={() => send('POSITIVE')}>POSITIVE 👍</button>
          <pre>or</pre>
          <button style={{backgroundColor: 'indianred'}} onClick={() => send('NEGATIVE')}>NEGATIVE 👎</button>
        </p>
        <br/>
        <button onClick={() => send('CANCEL')}>CANCEL</button>
      </>
      }
      
      {/* POSITIVE CONFIRM */}
      {current.matches('feedback.positiveConfirm') && 
      <div>
        <h1>😍</h1>
        <button onClick={() => send('RESTART')}>Restart</button>
      </div>
      }

      {/* NEGATIVE CONFIRM */}
      {current.matches('feedback.negativeConfirm') && 
      <div>
        <h1>😔</h1>
        <button onClick={() => send('RESTART')}>Restart</button>
      </div>
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