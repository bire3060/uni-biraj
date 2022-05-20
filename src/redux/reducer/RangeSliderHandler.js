let rangeInputs = {
  minRange: "0",
  maxRange: "200000",
};

const RangeSliderHandler = (state = rangeInputs, action) => {
  switch (action.type) {
    case "INCDECVALUES":
      const { minValue, maxValue } = action.payload;
      return {
        ...state,
        minRange: minValue,
        maxRange: maxValue,
      };
    default:
      return state;
  }
};

export default RangeSliderHandler;
