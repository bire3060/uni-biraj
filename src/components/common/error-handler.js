const errorHandler = (property, value, required) => {
  if (required && value.trim() === "") {
    return "Field is required";
  } else {
    if (property === "contact" || property === "phone") {
      if (value.trim().length < 7) {
        return "Contact must be at least 7 characters";
      } else if (value.trim().length > 15) {
        return "Contact cannot exceed 15 characters";
      } else if (value.charAt(0) === "-") {
        return "Contact number cannot be negative ";
      } else {
        return "";
      }
    } else if (property === "email") {
      if (!value.match(/^\w+([._]\w+)?@\w+\.\w+(\.\w+)?$/gi)) {
        return "Invalid Email";
      } else {
        return "";
      }
    } else if (property === "logo") {
      if (value === "") {
        return "choose image";
      } else {
        return "";
      }
    } else if (property === "fname") {
      if (value === "") {
        return "First name is required";
      } else {
        return "";
      }
    } else if (property === "lname") {
      if (value === "") {
        return "Last name is required";
      } else {
        return "";
      }
    } else if (property === "gender") {
      if (value === "") {
        return "Gender is required";
      } else {
        return "";
      }
    } else if (property === "passport_no") {
      if (value === "") {
        return "Password no is required";
      } else if (value.charAt(0) === "-") {
        return "Passport no cannot be negative";
      } else {
        return "";
      }
    } else if (property === "country_code") {
      if (value === "") {
        return "Country code is required";
      } else if (value.charAt(0) === "-") {
        return "Country code no cannot be negative";
      } else {
        return "";
      }
    } else if (property === "nationality") {
      if (value === "") {
        return "Nationality is required";
      } else {
        return "";
      }
    } else if (property === "preferred_country") {
      if (value === "") {
        return "Preferred country is required";
      } else {
        return "";
      }
    } else if (property === "preferred_date") {
      if (value === "") {
        return "Preferred date is required";
      } else {
        return "";
      }
    } else if (property === "dob") {
      if (value === "") {
        return "Date Of Birth is required";
      } else {
        return "";
      }
    } else if (property === "address") {
      if (value === "") {
        return "Address is required";
      } else {
        return "";
      }
    } else if (property === "website") {
      if (
        !value.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g
        )
      ) {
        return "Invalid url";
      } else {
        return "";
      }
    } else if (property === "email") {
      if (
        !value.match(
          /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
        )
      ) {
        return "Invalid email address";
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
};

export default errorHandler;
