export const capitalizeFirstLetter = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const camel2underscore = (value: string): string => {
  return value
    .replace(/(?:^|\.?)([A-Z])/g, (x: string, y: string) => {
      return '_' + y.toUpperCase();
    })
    .replace(/^_/, '');
};
