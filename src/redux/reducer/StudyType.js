let initialStudyData = {
  clearStudyMode: false,
  clearStudyLoad: false,
};

const StudyType = (state = initialStudyData, action) => {
  const { type, payload } = action;
  switch (type) {
    case "STUDY_MODE_RESET":
      return {
        ...state,
        clearStudyMode: payload,
      };
    case "STUDY_LOAD_RESET":
      return {
        ...state,
        clearStudyLoad: payload,
      };
    default:
      return state;
  }
};

export default StudyType;
