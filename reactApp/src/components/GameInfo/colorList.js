const colorList = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "greenblue",
  "purple",
];

const colorNum = colorList.length;

export const fetchOneColor = (index) => {
  return colorList[index % colorNum];
};
