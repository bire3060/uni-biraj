export const studyModeValue = (data) => {
  return {
    type: "STUDY_MODE_RESET",
    payload: data,
  };
};

export const studyLoadValue = (data) => {
  return {
    type: "STUDY_LOAD_RESET",
    payload: data,
  };
};
