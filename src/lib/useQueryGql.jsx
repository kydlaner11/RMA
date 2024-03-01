import { useQuery } from "@apollo/client";
import { useContext } from "react";
import DataContext from "../context/DataContext";

export const useQueryGql = (query, variables) => {
  const { error, data, loading } = useQuery(query, { variables });
  const { showNotification } = useContext(DataContext);

  if (!loading) {
    if (error) {
      showNotification({
        type: "error",
        message: "Something went wrong!",
        description: error.message,
      });
    }
  }

  return { error, data, loading };
};
