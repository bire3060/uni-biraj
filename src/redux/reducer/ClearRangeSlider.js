// for initial range inputs values
let rangeClear = {
  isClearingRange: false,
};

const ClearRangeSlider = (state = rangeClear, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CLEARRANGESLIDER":
      return {
        ...state,
        isClearingRange: payload,
      };
    default:
      return state;
  }
};

export default ClearRangeSlider;
