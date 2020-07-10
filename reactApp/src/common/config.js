export const filterTypes = {
  type: [
    "射击",
    "动作",
    "冒险",
    "赛车",
    "策略",
    "养成",
    "音乐",
    "格斗",
    "角色扮演",
    "动作角色",
    "即时战略",
    "桌面棋牌",
    "休闲益智",
    "体育运动",
    "模拟经营",
  ],
  theme: [
    "体育",
    "竞速",
    "解谜",
    "剧情",
    "恐怖",
    "科幻",
    "生存",
    "探索",
    "教育",
    "成人",
    "建造",
    "管理",
    "僵尸",
    "战争",
    "历史",
    "未来",
    "军事",
    "推理",
    "飞行",
    "心理",
    "自然",
    "电竞",
    "编程",
    "女性主角",
  ],
  mode: [
    "3D",
    "单人",
    "多人",
    "合作",
    "沙盒",
    "回合制",
    "第一人称",
    "第三人称",
    "开放世界",
    "本地多人",
    "玩家对战",
    "大型多人在线",
  ],
  style: [
    "奇幻",
    "怀旧",
    "喜剧",
    "唯美",
    "暴力",
    "血腥",
    "惊悚",
    "快节奏",
    "蒸汽朋克",
    "重玩价值",
    "选择取向",
    "好评原声音轨",
  ],
  year: [
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010以前",
  ],
};

export const searchTypes = ["游戏", "资讯", "攻略", "视频"];

export const filters = ["type", "theme", "mode", "style", "year"];

export const filtersZh = [
  "游戏类型",
  "游戏主题",
  "游戏模式",
  "游戏风格",
  "发行时间",
];

export const colorList = ["blue", "geekblue", "purple", "cyan", "volcano"];

export const mapFilterToColor = (filter) => {
  const colorIndex = filters.indexOf(filter);
  return colorList[colorIndex];
};
