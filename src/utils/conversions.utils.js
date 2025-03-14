export const convertStringsToLowerCase = (obj) => {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      result[key] = obj[key].toLowerCase();
    } else if (Array.isArray(obj[key])) {
      result[key] = obj[key].map((item) => {
        if (typeof item === "string") {
          return item.toLowerCase();
        } else if (typeof item === "object") {
          return convertStringsToLowerCase(item);
        }
        return item;
      });
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      result[key] = convertStringsToLowerCase(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};
