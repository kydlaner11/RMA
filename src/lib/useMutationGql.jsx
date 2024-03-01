import { useMutation } from "@apollo/client";
import { useContext } from "react";
import DataContext from "../context/DataContext";

export const useMutationGql = (query, variables) => {
  const { error, data, loading } = useMutation(query, { variables });
  const { showMessage, showNotification } = useContext(DataContext);

  if (!loading) {
    if (error) {
      showNotification({
        type: "error",
        message: "Something went wrong!",
        description: error.message,
      });
    }

    if (data) {
      showMessage({
        type: "success",
        content: "Changed successfully!",
      });
    }
  }

  return { error, data, loading };
};
