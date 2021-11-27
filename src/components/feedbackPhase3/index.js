import React from 'react'
import feedbackMachine from '../../stateMachines/feedbackPhase3'
import {useMachine} from '@xstate/react'

const Feedback = () => {
  let [current, send] = useMachine(feedbackMachine)
  
  return (
    <div style={{width: '100%'}}>
    <div style={{border: '3px solid rebeccapurple', textAlign: 'center', height: '350px', width: '100%'}}>
      <h1>Phase 3 - Feedback Widget</h1>

      <h2>{current.context.message}</h2>

      {/* START */}
      {current.matches('start') && 
        <button onClick={() => send('CLICK')}>GIVE FEEDBACK</button>
      }

      {/* RESPONSE */}
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

      {/* NEGATIVE FEEDBACK */}
      {current.matches('feedback.negativeFeedback') &&       
      <>
        <p>Main reason for your negative experience?</p>
        <p>
          <button onClick={() => send('SERVICE')}>SERVICE</button>
           | 
          <button onClick={() => send('PRODUCT')}>PRODUCT</button>
           | 
          <button onClick={() => send('PRICE')}>PRICING</button>
          <pre>or</pre>
          <button onClick={() => send('OTHER')}>OTHER</button>          
          <br/><br/>
          <button style={{backgroundColor: 'seagreen', color: 'white'}} onClick={() => send('POSITIVE')}>Whoops, I meant POSITIVE 👍</button>
        </p>
      </>
      }

      {/* COMMENT */}
      {current.matches('feedback.comment') && 
      <div>
        <p>Please leave comment</p>
        <textarea onChange={evt => send('UPDATE_COMMENT', {comment: evt.target.value})}/>
        <br/><br/>
        <button onClick={() => send('SUBMIT_COMMENT')}>SUBMIT</button>
        <button onClick={() => send('CANCEL')}>CANCEL</button>
      </div>
      }


      {/* PRICE CONFIRM */}
      {current.matches('feedback.priceConfirm') && 
      <div>
        <p>Contact 555-4242 for pricing discussion</p>
        <button onClick={() => send('RESTART')}>RESTART</button>
      </div>
      }


      
      {/* POSITIVE CONFIRM */}
      {current.matches('feedback.positiveConfirm') && 
      <div>
        <h1>😍</h1>
        <button onClick={() => send('RESTART')}>RESTART</button>
      </div>
      }

      {/* NEGATIVE CONFIRM */}
      {current.matches('feedback.negativeConfirm') && 
      <div>
        <h1>😔</h1>
        <button onClick={() => send('RESTART')}>RESTART</button>
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