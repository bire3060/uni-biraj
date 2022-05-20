export const rangeSliderHandler = (data) => {
  //   console.log(data.rangeFilter);
  return {
    type: "INCDECVALUES",
    payload: data.rangeFilter,
  };
};
