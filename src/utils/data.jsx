export const checkEmptyObject = (obj) => {
  return JSON.stringify(obj) === "{}";
};

export const checkUndefinedArray = (data) => {
  if (data === undefined || !data) {
    return [];
  }

  return data;
};
