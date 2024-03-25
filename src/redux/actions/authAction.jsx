import Cookies from "js-cookie";
import { removeAllCookies } from "../../utils/cookies";
import { generatePages } from "./appAction";
import { GLOBALTYPES } from "./globalTypes";
import Api from "../../api";


export const login = (values) => async (dispatch) => {
  try {
    const res = await Api.post('/api/logincust', values 
      );
      const resp = res.data;
      console.log(resp);
    
    // const res = {
    //   data: {
    //     user: "Naruto Uzumaki",
    //     email: "naruto.uzumaki@dwp.co.id",
    //     role: "admin",
    //     accessToken: "accesstoken",
    //     refreshToken: "refreshtoken",
    //   },
    // };

    Cookies.set("refresh_token", res.data.refreshToken, {
      secure: true,
      sameSite: "strict",
      expires: 30,
    });
    Cookies.set("access_token", res.data.accessToken, {
      secure: true,
      sameSite: "strict",
      expires: 1,
    });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: res.data,
    });

    dispatch({
      type: GLOBALTYPES.MESSAGE,
      payload: {
        success: "Login success",
      },
    });

    dispatch(generatePages(res.data.role));
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.MESSAGE,
      payload: {
        error: "Login failed",
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const refresh_token = Cookies.get("refresh_token");

  if (refresh_token) {
    try {
      // Call refresh_token api here
      const res = {
        data: {
          user: "Naruto Uzumaki",
          email: "naruto.uzumaki@dwp.co.id",
          role: "admin",
          accessToken: "accesstoken",
          refreshToken: "refreshtoken",
        },
      };

      Cookies.set("access_token", res.data.accessToken, {
        secure: true,
        sameSite: "strict",
        expires: 1,
      });

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: res.data,
      });

      dispatch(generatePages(res.data.role));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.MESSAGE,
        payload: {
          error: "Something went wrong",
        },
      });
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    removeAllCookies();

    // Call logout api here

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.MESSAGE,
      payload: {
        error: "Something went wrong",
      },
    });
  }
};
