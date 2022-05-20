import {
  AWARD_ADD,
  AWARD_ERROR,
  AWARD_UPDATE,
  BASIC_DETAIL_ADD,
  BASIC_DETAIL_ERROR,
  DOCUMENT_ADD,
  DOCUMENT_REMOVE,
  FACILITY_ADD,
  FACILITY_ERROR,
  FACILITY_UPDATE,
  IMAGE_ADD,
  IMAGE_REMOVE,
  INSTITUTE_RESET,
  FACILITY_REMOVE,
  AWARD_REMOVE,
  REMOVE_ALL_INSTITUTE_FILED,
} from "../actions/actionsTypes";

const initialState = {
  basicDetail: {
    name: "",
    address: "",
    contact: "",
    email: "",
    website: "",
    about: "",
    logo: "",
    banner: "",
    errors: {
      name: "",
      address: "",
      contact: "",
      email: "",
      website: "",
      about: "",
      logo: "",
    },
  },
  scholarship: {
    title: "",
    subhead: "",
    description: "",
    date: "",
  },
  gallery: {
    institute: "",
    title: "",
    file: "",
  },
  facilities: [
    {
      title: "",
      description: "",
    },
  ],
  awards: [
    {
      title: "",
      description: "",
    },
  ],
  images: [],
  documents: [],
  facilityErr: "",
  awardErr: "",
};

const institute = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ALL_INSTITUTE_FILED:
      return {
        ...state,
        basicDetail: {
          name: "",
          address: "",
          contact: "",
          email: "",
          website: "",
          about: "",
          logo: "",
          errors: {
            name: "",
            address: "",
            contact: "",
            email: "",
            website: "",
            about: "",
            logo: "",
          },
        },
        scholarship: {
          title: "",
          subhead: "",
          description: "",
          date: "",
        },
        gallery: {
          institute: "",
          title: "",
          file: "",
        },
        facilities: [
          {
            title: "",
            description: "",
          },
        ],
        awards: [
          {
            title: "",
            description: "",
          },
        ],
        images: [],
        documents: [],
        facilityErr: "",
        awardErr: "",
      };
    case BASIC_DETAIL_ADD: {
      const { property, value } = action.payload;
      return {
        ...state,
        basicDetail: {
          ...state.basicDetail,
          [property]: value,
        },
      };
    }

    case BASIC_DETAIL_ERROR: {
      const { property, error } = action.payload;
      return {
        ...state,
        basicDetail: {
          ...state.basicDetail,
          errors: {
            ...state.basicDetail.errors,
            [property]: error,
          },
        },
      };
    }
    case INSTITUTE_RESET: {
      return {
        ...initialState,
      };
    }
    case FACILITY_ADD: {
      return {
        ...state,
        facilities: [
          ...state.facilities,
          {
            title: "",
            description: "",
          },
        ],
      };
    }
    case FACILITY_REMOVE:
      const newVal = state.facilities.filter(
        (data, index) => index !== action.payload
      );
      return {
        ...state,
        facilities: newVal,
      };

    case FACILITY_UPDATE: {
      const { facilities } = state;
      const { index, value, property } = action.payload;
      facilities[index][property] = value;
      return {
        ...state,
        facilities,
      };
    }
    case FACILITY_ERROR: {
      return {
        ...state,
        facilityErr: action.payload.error,
      };
    }
    case AWARD_ADD: {
      return {
        ...state,
        awards: [
          ...state.awards,
          {
            title: "",
            description: "",
          },
        ],
      };
    }
    case AWARD_REMOVE:
      const newAward = state.awards.filter(
        (data, index) => index !== action.payload
      );
      return {
        ...state,
        awards: newAward,
      };
    case AWARD_UPDATE: {
      const { awards } = state;
      const { index, value, property } = action.payload;
      awards[index][property] = value;
      return {
        ...state,
        awards,
      };
    }
    case AWARD_ERROR: {
      return {
        ...state,
        awardErr: action.payload.error,
      };
    }
    case DOCUMENT_ADD: {
      return {
        ...state,
        documents: [
          ...state.documents,
          {
            ...action.payload,
          },
        ],
      };
    }

    case DOCUMENT_REMOVE: {
      return {
        ...state,
        documents: state.documents.filter((a, i) => i !== action.payload.index),
      };
    }

    case IMAGE_ADD: {
      return {
        ...state,
        images: [
          ...state.images,
          {
            ...action.payload,
          },
        ],
      };
    }
    // case IMAGE_ADD: {
    //   return {
    //     ...state,
    //     images: action.payload,
    //   };
    // }

    case IMAGE_REMOVE: {
      return {
        ...state,
        images: state.images.filter((a, i) => i !== action.payload.index),
      };
    }

    default: {
      return state;
    }
  }
};

export default institute;
