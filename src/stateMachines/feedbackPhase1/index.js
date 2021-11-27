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