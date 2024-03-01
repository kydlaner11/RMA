import { createMongoAbility, AbilityBuilder } from "@casl/ability";
import {
  adminAbility,
  anonymousAbility,
  guestAbility,
  userAbility,
} from "../services/abilityServices";
import { store } from "../redux/store";

export const accountAbility = () => {
  const { can, cannot, rules } = new AbilityBuilder(createMongoAbility);
  const user = store.getState().auth;

  if (!user) {
    anonymousAbility({ can, cannot });
  } else if (user?.role === "admin") {
    adminAbility({ can, cannot });
  } else if (user?.role === "user") {
    userAbility({ can, cannot });
  } else if (user?.role === "guest") {
    guestAbility({ can, cannot });
  }

  return createMongoAbility(rules);
};
