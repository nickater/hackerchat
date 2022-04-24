export const convertFileToObject = (lines: string[]) => {
  return lines
    .map((line) => {
      const split = line.split('=');
      return {
        [split[0]]: split[1],
      };
    })
    .reduce((prev, curr) => ({
      ...curr,
      [Object.keys(prev)[0]]: Object.values(prev)[0],
    }));
};
