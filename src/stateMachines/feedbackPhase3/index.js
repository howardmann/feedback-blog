import {
  createMachine,
  assign
} from "xstate";

const feedbackMachine = createMachine({
  id: "machine",
  initial: "start",
  context: {
    message: "",
    rating: "",
    reason: "",
    comment: ""
  },
  states: {
    start: {
      on: {
        CLICK: "feedback"
      },
      entry: assign({
        message: "Rate your experience",
        rating: "",
        reason: "",
        comment: ""
      })
    },
    feedback: {
      initial: "response",
      states: {
        response: {
          on: {
            POSITIVE: {
              target: "positiveConfirm",
              actions: assign({
                rating: "positive"
              })
            },
            NEGATIVE: {
              target: "negativeFeedback",
              actions: assign({
                rating: "negative"
              })
            },
            CANCEL: "#machine.start"
          }
        },
        negativeFeedback: {
          entry: assign({
            message: "Could you please provide feedback"
          }),
          on: {
            SERVICE: {
              target: "negativeConfirm",
              actions: assign({
                reason: "service"
              })
            },
            PRODUCT: {
              target: "negativeConfirm",
              actions: assign({
                reason: "product"
              })
            },
            PRICE: {
              target: "priceConfirm",
              actions: assign({
                reason: "price"
              })
            },
            OTHER: {
              target: "comment",
              actions: assign({
                reason: "other"
              })
            },
            POSITIVE: {
              target: "positiveConfirm",
              actions: assign({
                rating: "positive"
              })
            }
          }
        },
        comment: {
          on: {
            UPDATE_COMMENT: {
              target: 'comment',
              actions: assign({
                comment: (_ctx, evt) => evt.comment
              })
            },
            SUBMIT_COMMENT: 'negativeConfirm',
            CANCEL: 'negativeFeedback'
          }
        },
        positiveConfirm: {
          type: "final",
          entry: assign({
            message: "Hooray. Thank you for your feedback."
          }),
          on: {
            RESTART: "#machine.start"
          }
        },
        priceConfirm: {
          type: "final",
          entry: assign({
            message: "Discuss your pricing needs."
          }),
          on: {
            RESTART: "#machine.start"
          }
        },
        negativeConfirm: {
          type: "final",
          entry: assign({
            message: "We are sorry to hear."
          }),
          on: {
            RESTART: "#machine.start"
          }
        }
      }
    }
  }
});

export default feedbackMachine