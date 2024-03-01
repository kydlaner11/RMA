import { logout } from "../redux/actions/authAction";
import { store } from "../redux/store";

export const handleLogout = () => {
  store.dispatch(logout());
};
