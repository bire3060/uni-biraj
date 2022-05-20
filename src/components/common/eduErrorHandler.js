const eduErrorHandler = (property, value, required) => {
  if (required && value.trim() === "") {
    return "Field is required";
  } else {
    if (property === "title") {
      if (value === "") {
        return "required";
      } else {
        return "";
      }
    } else if (property === "degree_level") {
      if (value === "") {
        return "required";
      } else {
        return "";
      }
    } else if (property === "score") {
      if (value === "") {
        return "required";
      } else {
        return "";
      }
    } else if (property === "score_type") {
      if (value === "") {
        return "required";
      } else {
        return "";
      }
    } else if (property === "institute") {
      if (value === "") {
        return "required";
      } else {
        return "";
      }
    } else if (property === "institute_country") {
      if (value === "") {
        return "required";
      } else {
        return "";
      }
    } else if (property === "start_year") {
      if (value === "") {
        return "required";
      } else {
        return "";
      }
    } else if (property === "end_year") {
      if (value === "") {
        return "required";
      } else {
        return "";
      }
    } else if (property === "study_area") {
      if (value === "") {
        return "required";
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
};

export default eduErrorHandler;
