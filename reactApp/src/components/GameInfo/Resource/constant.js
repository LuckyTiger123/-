export const resourceTypes = [
  {
    value: 0,
    text: "游戏资讯",
    api: "/news",
  },
  {
    value: 1,
    text: "相关视频",
    api: "/video",
  },
  {
    value: 2,
    text: "游戏攻略",
    api: "/raiders",
  },
  {
    value: "analytics",
    text: "数据分析",
    api: "/",
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
