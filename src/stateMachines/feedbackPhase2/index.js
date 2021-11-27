import { createMachine, assign } from "xstate";

const feedbackMachine = createMachine({
  id: "machine",
  initial: "start",
  context: {
    message: "",
    rating: "",
    reason: ""
  },
  states: {
    start: {
      on: { CLICK: "feedback" },
      entry: assign({
        message: "Rate your experience",
        rating: "",
        reason: ""
      })
    },
    feedback: {
      initial: "response",
      states: {
        response: {
          on: {
            POSITIVE: {target: "positiveConfirm",actions: assign({ rating: "positive" })},
            NEGATIVE: {target: "negativeFeedback",actions: assign({ rating: "negative" })},
            CANCEL: "#machine.start"
          }
        },
        negativeFeedback: {
          entry: assign({ message: "Could you please provide feedback" }),
          on: {
            SERVICE: {target: "negativeConfirm", actions: assign({reason: "service"})},
            PRODUCT: {target: "negativeConfirm", actions: assign({reason: "product"})},
            PRICE: {target: "negativeConfirm", actions: assign({reason: "price"})},
            POSITIVE: {target: "positiveConfirm",actions: assign({ rating: "positive" })}
          }
        },
        positiveConfirm: {
          type: "final",
          entry: assign({ message: "Hooray. Thank you for your feedback." }),
          on: { RESTART: "#machine.start" }
        },
        negativeConfirm: {
          type: "final",
          entry: assign({ message: "We are sorry to hear." }),
          on: { RESTART: "#machine.start" }
        }
      }
    }
  }
});

export default feedbackMachine