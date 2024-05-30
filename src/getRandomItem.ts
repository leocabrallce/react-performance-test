export interface Item {
  id: number;
  word: string;
  background: string;
}

const words =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(
    " "
  );

let index = 0;

export const getRandomItem = (): Item => {
  const randomWord = words[index++ % words.length];
  const hue = Math.random() * 360;
  const saturation = 0.95 - Math.random() * Math.random() * 0.4;
  const lightness = 0.8 - Math.random() * Math.random() * 0.5;
  const hue2 = hue + Math.pow(Math.random(), 3) * 60 - 30;
  const saturation2 = 0.95 - Math.random() * Math.random() * 0.4;
  const lightness2 = lightness - Math.random() * 0.3;
  const hsl = `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`;
  const hsl2 = `hsl(${hue2}, ${saturation2 * 100}%, ${lightness2 * 100}%)`;
  const item = {
    id: index,
    word: randomWord,
    background: `linear-gradient(135deg, ${hsl} 0%, ${hsl2} 100%)`,
  };
  return item;
};
