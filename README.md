# Finite State Machines - A Common Tool for Product Owners, Designers & Developers

[See full blog post on mannhowie.com](https://mannhowie.com/finite-state-machines)

![fininte state machine](https://images.ctfassets.net/vwq10xzbe6iz/6JNh1Rpi6a1VUnTux03TzW/c69b8b54a1be48ec820cec8e721163af/fininte_state_machine.png)

Finite State Machines allow cross-functional teams to visually design complex logic before committing expensive resources to design and code implementation.

It is a powerful tool for product teams and business owners to communicate on customer requirements in order to identify rabbit holes and poor UX early in the process.

They have been widely used in electrical engineering and in the logic design of electronic devices for decades. 

To illustrate the power of Finite State Machines, imagine we have been briefed by the business to build a customer feedback form widget.

## Phase 1 - Simple Feedback Widget
The first phase of our brief is for a simple feedback widget that will do the following:
- Ask for positive or negative feedback
- If positive display a happy success message
- If negative display an apology
- Allow user to cancel the feedback form

We can visualise this simple application using Finite State Machines below:
![phase1](https://images.ctfassets.net/vwq10xzbe6iz/3aRVidpZK6c6qevtvEWLfB/9a09666917aeeddc3170c9a4ef80cfcf/phase1.png)

Our application has 4 states:
1. __START__ - our initial state where a user can click to begin the survey
2. __RESPONSE__ - where a user is asked for a positive or negative response and where they can cancel to go back to START
3. __POSITIVE CONFIRM__: an end state upon a user clicking POSITIVE
4. __NEGATIVE CONFIRM__: an end state upon a user clicking NEGATIVE

Our 4 states are also characterised by 4 events and transitions which are conditional upon the current state the application is in.

Our application also triggers actions such as saving the rating and updating the message upon certain events and entering different states.

Once the logic and user flow has been agreed we can easily convert this to design and code stage. In the examples below we use the open source library [XState](https://xstate.js.org/docs/) by [David Khourshid](https://github.com/davidkpiano) to codify our Finite State Machine and use ReactJS to render our UI.

```js
import { createMachine, assign } from 'xstate';

const feedbackMachine = createMachine({
  id: 'machine',
  initial: 'start',
  context: {
    message: "",
    rating: ""
  },
  states: {
    start: {
      on: { CLICK: 'feedback' },
      entry: assign({
        message: "Rate your experience",
        rating: ""
      })
    },
    feedback: {
      initial: 'response',
      states: {
        response: {
          on: {
            POSITIVE: {
              target: 'positiveConfirm',
              actions: assign({ rating: 'positive' })
            },
            NEGATIVE: {
              target: 'negativeConfirm',
              actions: assign({ rating: 'negative' })
            },
            CANCEL: '#machine.start'
          }
        },
        positiveConfirm: {
          type: 'final',
          entry: assign({ message: "Hooray. Thank you for your feedback." }),
          on: { RESTART: '#machine.start' }
        },
        negativeConfirm: {
          type: 'final',
          entry: assign({ message: "We are sorry to hear." }),
          on: { RESTART: '#machine.start' }
        }
      }
    }
  }
});

export default feedbackMachine
```

[View demo](https://stkhm.csb.app/)

## Phase 2 - Negative Feedback Reason
The business has now come back asking for us to capture the main reasons for negative feedback.

Our application now must:
- Ask the user to select the main reason for negative feedback (Service, Product, Price)
- Also allow a user to select POSITIVE again if they accidentally selected NEGATIVE

With Finite State Machines we can easily modify and expand our logic without breaking any previous logic:
![phase2](https://images.ctfassets.net/vwq10xzbe6iz/38VI5AsXioynO833DlaAzM/9f8c7edb547374d6044b6bff26400c85/phase2.png)

Our application has a new __NEGATIVE FEEDBACK__ state which allows a user to select from three of the main reasons for the negative response (SERVICE, PRODUCT or PRICE). Upon selecting an event the reason is captured and the state transitions to the NEGATIVE CONFIRM end state and displays an apology message.

We have now also added a new POSITIVE event which a user can click on to transition directly to the POSITIVE CONFIRM end state.

Our team can now confidently update our application with the new business logic:

[View demo](https://lg6sy.csb.app/)

## Phase 3 - Advanced Feedback
The business comes back wanting to direct users to contact sales for pricing discussions if they select PRICE as a negative response. In addition they want to capture any other reasons for negative feedback.

Our application must now grow in complexity to handle the following:
- If user selects PRICE as a negative response, send to different end state with pricing discussion CTA
- New OTHER option for a user to select with ability to leave comment

Once again we modify our Finite State Machines to expand our logic
![phase3](https://images.ctfassets.net/vwq10xzbe6iz/6wb9cvXQflR8QIBGul2SOU/b8e775fd2c86f028a3c4652602219969/phase3.png)

Our application has now added two new states:
1. __PRICE CONFIRM__: end state when a user selects PRICE as a negative response. We will display a contact number for pricing discussions. Creating a new end state provides us with flexibility if the business may want to display discount offers or ask the user for more contact information in the future
2. __COMMENT__: when a user selects OTHER as a new reason for their negative response. This state includes three events where a user can UPDATE COMMENT to capture the reason, SUBMIT COMMENT to transition to end state and CANCEL to go back and select a different reason

Once again, our Finite State Machine is able to handle increasing complexity without breaking previous logic. Our designer and developer team can now confidently work on implementing the new logic:

[View demo](https://8y5dx.csb.app/)

## Future Complexity
Our application will naturally grow in complexity as business and user requirements evolve. 

Examples may include:
- Ask for feedback for positive response
- Invite user to add users after a positive response
- Ask user to provide the name of the poor service representative
- Introduce a passive response in addition to positive and negative
- etc.

With Finite State Machines we can confidently continue modelling this advanced complexity into our design and visually see how it interacts with previous functionality.

See below for the final State Chart in XState visualised using [stately.ai](https://stately.ai/)

[![statechart](https://stately.ai/registry/machines/f0d95293-ec80-419e-9a3b-94204d441c7d.png)](https://stately.ai/viz/f0d95293-ec80-419e-9a3b-94204d441c7d)