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
  const access_token = Cookies.get("access_token"); // Jika server memerlukan access token dalam header

  console.log('Refresh Token:', refresh_token);
  console.log('Access Token:', access_token);

  if (refresh_token) {
    try {
      let config = {};
      if (access_token) {
        config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        };
      }

      const response = await Api.post("/api/customer/refresh", { refresh_token }, config);
      const res = response.data;
      console.log('Refresh Token Response:', res);



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
      dispatch({
        type: GLOBALTYPES.MESSAGE,
        payload: {
          error: "Something went wrong",
        },
      });
      console.log(error)
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
