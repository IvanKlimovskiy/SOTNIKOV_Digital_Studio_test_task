export const capitalizeFirstLetter = (phrase: string): string => {
  return phrase ? phrase.replace(phrase[0], phrase[0].toUpperCase()) : phrase;
};
