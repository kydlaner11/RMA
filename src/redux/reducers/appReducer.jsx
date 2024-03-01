import { APP_TYPES } from "../actions/appAction";

const initialState = {
  loading: false,
  theme: "light",
  motion: true,
  darkMode: false,
  page: {
    list: [],
    detail: [],
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_TYPES.TOGGLE_MOTION:
      return {
        ...state,
        motion: action.payload,
      };
    case APP_TYPES.LOADING_APP:
      return {
        ...state,
        loading: action.payload,
      };
    case APP_TYPES.GENERATE_PAGES:
      return {
        ...state,
        page: { list: action.payload.list, detail: action.payload.detail },
      };
    case APP_TYPES.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
