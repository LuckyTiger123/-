package Server

import "strings"

var WordList map[string]string

func WordListInit() error {
	WordList = make(map[string]string)
	WordList["美国末日"] = "最后的生还者"
	WordList["gta"] = "侠盗猎车"
	WordList["老滚"] = "上古卷轴"

	return nil
}

func WordChange(in string) string {
	out := strings.ToLower(in)
	for k, v := range WordList {
		out = strings.Replace(out, k, v, -1)
	}
	return out
}
