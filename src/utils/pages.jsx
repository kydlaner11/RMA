import { Link } from "react-router-dom";
import { store } from "../redux/store";
import { accountAbility } from "./ability";

// ? generateAuthPage() used for formating and generating page object
export const generateAuthPage = ({
  key,
  label,
  icon,
  element,
  description,
  style,
}) => {
  try {
    const user = accountAbility();

    if (user.can("read", key)) {
      return {
        path: key,
        element,
        key,
        label: (
          <Link key={key} to={`/${key}`}>
            {label}
          </Link>
        ),
        icon,
        style,
        description,
      };
    } else {
      return { unauthorized: true };
    }
  } catch (error) {
    return { unauthorized: true };
  }
};

// ? generateAuthParentPage() used to check if menu have child or not
export const generateAuthParentPage = ({ key, label, icon, children }) => {
  children = children.filter((page) => !page.unauthorized);

  if (children.length === 0) {
    return { unauthorized: true };
  } else {
    return { key, label, icon, children };
  }
};

// ? generateDetailAuthPage() used for formating and generating detail page object
export const generateDetailAuthPage = ({ key, element }) => {
  return {
    path: key,
    element,
    key,
  };
};

// ? generateAuthRoute() used for generating routes for all authenticated page
export const generateAuthRoute = () => {
  let pages = [];
  const page = store.getState().app.page;

  page.list.forEach((item) => {
    if (item.children) {
      item.children.forEach((subitem) => {
        pages.push(subitem);
      });
    } else if (item.type !== "divider") {
      pages.push(item);
    }
  });

  page.detail.forEach((item) => {
    pages.push(item);
  });

  return pages;
};
