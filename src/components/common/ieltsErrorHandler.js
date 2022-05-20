const ieltsErrorHandler = (property, value, required) => {
  if (required && value.trim() === "") {
    return "Field is required";
  } else {
    if (property === "reading") {
      if (value === "") {
        return "Field is required";
      } else {
        return "";
      }
    } else if (property === "writing") {
      if (value === "") {
        return "Field is required";
      } else {
        return "";
      }
    } else if (property === "listening") {
      if (value === "") {
        return "Field is required";
      } else {
        return "";
      }
    } else if (property === "overall") {
      if (value === "") {
        return "Field is required";
      } else {
        return "";
      }
    } else if (property === "speaking") {
      if (value === "") {
        return "Field is required";
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
};

export default ieltsErrorHandler;
