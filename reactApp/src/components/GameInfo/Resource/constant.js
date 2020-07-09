export const resourceTypes = [
  {
    value: 0,
    text: "游戏资讯",
  },
  {
    value: 1,
    text: "相关视频",
  },
  {
    value: 2,
    text: "游戏攻略",
  },
  {
    value: 3,
    text: "数据分析",
  },
];

export const resourceTypeMap = (val) => {
  let res;
  resourceTypes.forEach((resource) => {
    if (resource.value === val) {
      res = resource;
    }
  });
  return res;
};
