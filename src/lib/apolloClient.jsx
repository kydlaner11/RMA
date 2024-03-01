import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BASE_URL_BE_GRAPHQL } from "../constant/url";
import { store } from "../redux/store";

export const apolloClient = new ApolloClient({
  uri: BASE_URL_BE_GRAPHQL,
  headers: {
    Authorization: store.getState().auth?.accessToken
      ? `Bearer ${store.getState().auth.accessToken}`
      : "",
  },
  cache: new InMemoryCache(),
});
