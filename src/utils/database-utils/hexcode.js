export function validator(input) {
  return /(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})/g.test(input);
}

// Create a new index that is unique based on a checker Callback function
export async function uniqueIndex(checkerCallback) {
  let counter = 0;
  let index = hexcode();
  let isRepeated = await checkerCallback(index);

  while (isRepeated && counter < 30) {
    index = hexcode();
    isRepeated = await checkerCallback(index);
    counter++;
  }

  return index;
}

export default function hexcode() {
  return (
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .toUpperCase()
  );
}
