export const anonymousAbility = ({ cannot }) => {
  cannot("manage", "all");
};

export const guestAbility = ({ can }) => {
  can("read", "dashboard").because("You are guest");
};

export const userAbility = ({ can }) => {
  can("read", "all").because("You are user");
};

export const adminAbility = ({ can }) => {
  can("manage", "all");
};
