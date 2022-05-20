let initalState = {
  headerInput: "",
  cross: false,
  countryId: "",
  isReset: false,
  isChanging: "",
};

const HeaderFilter = (state = initalState, action) => {
  let { payload } = action;
  switch (action.type) {
    case "HEADER_INPUT":
      return {
        ...state,
        headerInput: payload,
      };
    case "IS_CHANGING_INPUT":
      return {
        ...state,
        isChanging: payload,
      };
    case "COUNTRY_ID":
      return {
        ...state,
        countryId: action.payload,
      };
    case "RESET_COUNTRY_ID": {
      return {
        ...state,
        countryId: "",
      };
    }

    default:
      return state;
  }
};
export default HeaderFilter;
