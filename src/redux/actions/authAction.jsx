import Cookies from "js-cookie";
import { removeAllCookies } from "../../utils/cookies";
import { generatePages } from "./appAction";
import { GLOBALTYPES } from "./globalTypes";
import Api from "../../api";


export const login = (values) => async (dispatch) => {
  try {
    const response = await Api.post('/api/logincust', values);
    const res = response.data;
    console.log("res", res  );

    Cookies.set("refresh_token", res.data.refresh_token, {
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

    dispatch(generatePages());
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
  const access_token = Cookies.get("access_token");

  console.log("rt",refresh_token)
  console.log("at",access_token)

  if (refresh_token) {
    try {
      const response = await Api.post("/api/customer/refresh", { refresh_token } , {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      const res = response.data
      console.log("res", res)

      Cookies.set("access_token", res.data.accessToken, {
        secure: true,
        sameSite: "strict",
        expires: 1,
      });

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: res.data,
      });

      dispatch(generatePages());
    } catch (error) {
      console.log('Error refreshing token:', error);
      if (error.response && error.response.status === 401) {
        removeAllCookies();
        window.location.href = "/login";
      }
      
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
