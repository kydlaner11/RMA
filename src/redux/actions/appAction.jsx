import {
  authenticatedDetailPageList,
  authenticatedPageList,
} from "../../constant/pageList";

export const APP_TYPES = {
  LOADING_APP: "LOADING_APP",
  GENERATE_PAGES: "GENERATE_PAGES",
  TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",
  TOGGLE_MOTION: "TOGGLE_MOTION",
};

export const generatePages = () => async (dispatch) => {
  dispatch({
    type: APP_TYPES.LOADING_APP,
    payload: true,
  });

  dispatch({
    type: APP_TYPES.GENERATE_PAGES,
    payload: {
      list: authenticatedPageList(),
      detail: authenticatedDetailPageList(),
    },
  });

  dispatch({
    type: APP_TYPES.LOADING_APP,
    payload: false,
  });
};

export const toggleDarkMode = (mode) => async (dispatch) => {
  dispatch({
    type: APP_TYPES.TOGGLE_DARK_MODE,
    payload: mode, // true | false
  });
};

export const toggleMotion = (mode) => async (dispatch) => {
  dispatch({
    type: APP_TYPES.TOGGLE_MOTION,
    payload: mode, // true | false
  });
};
