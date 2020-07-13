export const resourceTypes = [
  {
    value: 0,
    text: "游戏资讯",
    api: "/game/news",
  },
  {
    value: 1,
    text: "相关视频",
    api: "/game/video",
  },
  {
    value: 2,
    text: "游戏攻略",
    api: "/game/raiders",
  },
  {
    value: "analytics",
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
