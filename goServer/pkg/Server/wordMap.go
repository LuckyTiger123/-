package Server

import (
	"regexp"
	"strings"
)

var WordList map[string]string

func WordListInit() error {
	WordList = make(map[string]string)
	WordList["美国末日"] = "最后的生还者"
	WordList["gta"] = "侠盗猎车"
	WordList["老滚"] = "上古卷轴"
	WordList["lol"] = "英雄联盟"
	WordList["刀塔"] = "dota"
	WordList["lol"] = "英雄联盟"
	WordList["ow"] = "守望先锋"
	WordList["dnf"] = "地下城与勇士"
	WordList["农药"] = "王者荣耀"
	WordList["吃鸡"] = "绝地求生"
	WordList["黑魂"] = "黑暗之魂"
	WordList["骑砍"] = "骑马与砍杀"
	WordList["怪猎"] = "怪物猎人"
	WordList["大表哥"] = "荒野大镖客"
	WordList["神海"] = "神秘海域"
	WordList["动森"] = "动物森友会"
	WordList["远哭"] = "孤岛惊魂"
	return nil
}

func WordChange(in string) string {
	out := strings.ToLower(in)
	for k, v := range WordList {
		out = strings.Replace(out, k, v, -1)
	}
	return out
}

func GetGameSearchWord(in string) string {
	reg := regexp.MustCompile(`（.+）`)
	out := reg.ReplaceAllString(in, "")
	return out
}
