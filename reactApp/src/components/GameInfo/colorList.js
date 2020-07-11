const colorList = [
  "purple",
  "geekblue",
  "blue",
  "cyan",
  "green",
  "lime",
  "gold",
  "orange",
  "volcano",
  "red",
  "magenta",
];

const colorNum = colorList.length;

export const fetchOneColor = (index) => {
  return colorList[index % colorNum];
};
