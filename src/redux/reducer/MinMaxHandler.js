// for initial range inputs values
let inputValues = {
  minValue: "",
  maxValue: "",
};

const MinMaxHandler = (state = inputValues, action) => {
  switch (action.type) {
    case "MINMAXVALUE":
      const { minValue, maxValue } = action.payload;
      return {
        ...state,
        minValue: minValue,
        maxValue: maxValue,
      };
    default:
      return state;
  }
};

export default MinMaxHandler;
