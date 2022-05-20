export const inputs = [
  {
    label: "First Name",
    type: "text",
    property: "fname",
    // value: fproperty,
    // vali: error.fproperty,
  },
  {
    label: "Last Name",
    type: "text",
    property: "lname",
    // value: lproperty,
    // vali: error.lproperty,
  },
  {
    label: "Email",
    type: "text",
    property: "email",
    // value: email,
    // vali: error.email,
  },
  {
    label: "Birthday",
    type: "date",
    property: "DOB",
    // value: birthday,
    // vali: error.birthday,
  },
  {
    label: "Gender",
    type: "select",
    property: "gender",
    data: [
      { title: "Male", value: "M" },
      { title: "Female", value: "F" },
      { title: "Others", value: "O" },
    ],
    // value: gender,
    // vali: error.gender,
  },
  {
    label: "Address",
    type: "text",
    property: "address",
    // value: address,
    // vali: error.address,
  },
  {
    label: "Country code ",
    type: "Number",
    isnumber: true,
    property: "country_code",
    // value: phone,
    // vali: error.phone,
  },
  {
    label: "Phone",
    type: "Number",
    isnumber: true,
    property: "phone",
    // value: phone,
    // vali: error.phone,
  },
  {
    label: "Passport No:",
    type: "Number",
    isnumber: true,
    property: "passport_no",
    // value: passport,
    // vali: error.passport,
  },
  {
    label: "Nationality",
    type: "text",
    property: "nationality",
    // value: nationality,
    // vali: error.nationality,
  },
  // {
  //   label: "Preferred Country",
  //   type: "text",
  //   property: "preferred_country",
  // },
  {
    label: "Preferred Date",
    type: "date",
    property: "preferred_date",
    // value: pdate,
    // vali: error.pdate,
  },
];
