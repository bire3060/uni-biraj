export const handleHeaderInput = (data) => {
  return {
    type: "HEADER_INPUT",
    payload: data,
  };
};

export const changingInput = (data) => {
  return {
    type: "IS_CHANGING_INPUT",
    payload: data,
  };
};

export const handleCountryId = (id) => {
  return {
    type: "COUNTRY_ID",
    payload: id,
  };
};
export const handleCountryReset = () => {
  return {
    type: "RESET_COUNTRY_ID",
  };
};
