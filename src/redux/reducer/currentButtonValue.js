let initialCurrentButton = {
  currentButtonVal: 1,
};

const currentButtonValue = (state = initialCurrentButton, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SETCURRENTBUTTON":
      return {
        ...state,
        currentButtonVal: payload,
      };
    default:
      return state;
  }
};

export default currentButtonValue;
