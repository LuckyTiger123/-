package Server

import (
	"context"
	"fmt"
	"github.com/olivere/elastic/v7"
	pb "goServer/proto"
	"regexp"
	"strconv"
)

var ES *elastic.Client

type Game struct {
	GameName    string        `json:"game_name"`
	ReleaseDate string        `json:"release_date"`
	Developer   string        `json:"developer"`
	Publisher   string        `json:"publisher"`
	Tags        string        `json:"tags"`
	Info        string        `json:"info"`
	Imgs        []string      `json:"imgs"`
	Scores      []*ScoresInfo `json:"scores"`
}

type ScoresInfo struct {
	MediaName string `json:"media_name"`
	Score     string `json:"score"`
	Comment   string `json:"comment"`
}

func Init() error {
	var err error
	ES, err = elastic.NewClient(elastic.SetURL("http://39.98.125.235:9200/"), elastic.SetSniff(false))
	if err != nil {
		return err
	} else {
		fmt.Println("conn success!", ES)
	}
	return nil
}

func GetGameIndex(pageSize int32, page int32) ([]*pb.GameResult, error) {
	gameList := make([]*pb.GameResult, 0)
	boolQuery := elastic.NewBoolQuery()
	scoreExist := elastic.NewExistsQuery("scores")
	boolQuery.Must(scoreExist)
	searchResult, err := ES.Search().Index("game_new").Query(boolQuery).Pretty(true).Sort("release_date.keyword", false).Size(int(pageSize)).From(int(pageSize*page - pageSize)).Do(context.Background())
	if err != nil {
		return nil, err
	}
	for _, v := range searchResult.Hits.Hits {
		item := &pb.GameResult{}
		item.Source = string(v.Source)
		item.Id = v.Id
		gameList = append(gameList, item)
	}
	return gameList, nil
}

func GetResourceIndex(pageSize int32, page int32) ([]string, error) {
	resourceList := make([]string, 0)
	fetchItem := elastic.NewFetchSourceContext(true)
	fetchItem.Exclude("content")
	searchResult, err := ES.Search().Index("resource_new").FetchSourceContext(fetchItem).Pretty(true).Sort("time", false).Size(int(pageSize)).From(int(pageSize*page - pageSize)).Do(context.Background())
	if err != nil {
		return nil, err
	}
	for _, v := range searchResult.Hits.Hits {
		item := string(v.Source)
		resourceList = append(resourceList, item)
	}
	return resourceList, nil
}

func GetGlobalSearch(keyword string, size int32, sort bool) ([]*pb.GameResult, []*pb.Result, error) {
	gameList := make([]*pb.GameResult, 0)
	resourceList := make([]*pb.Result, 0)

	// game search
	filter := make([]*pb.Filter, 0)
	gameList, err := GetGameSearch(keyword, filter, 3)

	//matchQueryGameName := elastic.NewMatchQuery("game_name", keyword)
	//highlightGameName := elastic.NewHighlight()
	//highlightGameName.Field("game_name")
	//
	//searchResultOfGame, err := ES.Search().Index("game_new").Pretty(true).Query(matchQueryGameName).Size(3).Highlight(highlightGameName).Do(context.Background())
	//if err != nil {
	//	return nil, nil, err
	//}
	//for _, v := range searchResultOfGame.Hits.Hits {
	//	item := &pb.GameResult{}
	//	item.Highlight = make(map[string]*pb.Highlight, 0)
	//	item.Source = string(v.Source)
	//	item.Id = v.Id
	//	for k, j := range v.Highlight {
	//		item.Highlight[k] = &pb.Highlight{}
	//		item.Highlight[k].Field = make([]string, 0)
	//		item.Highlight[k].Field = j
	//	}
	//	gameList = append(gameList, item)
	//}

	// resource search
	keyword += " " + WordChange(keyword)
	matchQueryResourceTitle := elastic.NewMatchQuery("title", keyword)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", keyword)
	//matchQueryResourceContent := elastic.NewMatchQuery("content", keyword)
	boolQueryOfResource := elastic.NewBoolQuery()
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo)

	highlightResource := elastic.NewHighlight()
	highlightResource.Field("title")
	highlightResource.Field("info")
	//highlightResource.Field("content")
	fetchItem := elastic.NewFetchSourceContext(true)
	fetchItem.Exclude("content")
	var searchResultOfResource *elastic.SearchResult
	if sort == true {
		searchResultOfResource, err = ES.Search().Index("resource_new").FetchSourceContext(fetchItem).Pretty(true).Query(boolQueryOfResource).Size(int(size)).Highlight(highlightResource).Sort("time", false).Do(context.Background())
	} else {
		searchResultOfResource, err = ES.Search().Index("resource_new").FetchSourceContext(fetchItem).Pretty(true).Query(boolQueryOfResource).Size(int(size)).Highlight(highlightResource).Do(context.Background())
	}
	if err != nil {
		return nil, nil, err
	}
	for _, v := range searchResultOfResource.Hits.Hits {
		item := &pb.Result{}
		item.Highlight = make(map[string]*pb.Highlight, 0)
		item.Source = string(v.Source)
		for k, j := range v.Highlight {
			item.Highlight[k] = &pb.Highlight{}
			item.Highlight[k].Field = make([]string, 0)
			item.Highlight[k].Field = j
		}
		resourceList = append(resourceList, item)
	}

	return gameList, resourceList, nil
}

func GetGameSearch(keyword string, filter []*pb.Filter, size int32) ([]*pb.GameResult, error) {
	gameList := make([]*pb.GameResult, 0)
	boolQueryGame := elastic.NewBoolQuery()

	keyword = WordChange(keyword)

	queryList := make([]*elastic.BoolQuery, 0)
	boolQueryType := elastic.NewBoolQuery()
	queryList = append(queryList, boolQueryType)
	boolQueryTheme := elastic.NewBoolQuery()
	queryList = append(queryList, boolQueryTheme)
	boolQueryMode := elastic.NewBoolQuery()
	queryList = append(queryList, boolQueryMode)
	boolQueryYear := elastic.NewBoolQuery()
	queryList = append(queryList, boolQueryYear)
	boolQueryStyle := elastic.NewBoolQuery()
	queryList = append(queryList, boolQueryStyle)
	addList := make([]int32, 5)
	for _, v := range filter {
		switch v.Type {
		case "type":
			item := elastic.NewBoolQuery()
			indexSearch := elastic.NewTermQuery("tags", v.Value)
			wholeWordSearch := elastic.NewTermQuery("tags.whole", v.Value)
			item.Should(indexSearch)
			item.Should(wholeWordSearch)
			boolQueryType.Should(item)
			addList[0] = 1
		case "theme":
			item := elastic.NewBoolQuery()
			indexSearch := elastic.NewTermQuery("tags", v.Value)
			wholeWordSearch := elastic.NewTermQuery("tags.whole", v.Value)
			item.Should(indexSearch)
			item.Should(wholeWordSearch)
			boolQueryTheme.Should(item)
			addList[1] = 1
		case "mode":
			item := elastic.NewBoolQuery()
			indexSearch := elastic.NewTermQuery("tags", v.Value)
			wholeWordSearch := elastic.NewTermQuery("tags.whole", v.Value)
			item.Should(indexSearch)
			item.Should(wholeWordSearch)
			boolQueryMode.Should(item)
			addList[2] = 1
		case "year":
			if v.Value == "before 2010" {
				item := elastic.NewRangeQuery("release_date.keyword")
				item.Lt("2010")
				boolQueryYear.Should(item)
			} else {
				item := elastic.NewRangeQuery("release_date.keyword")
				item.Gt(v.Value)
				yearAddOne, err := strconv.Atoi(v.Value)
				if err != nil {
					return nil, err
				}
				yearAddOne += 1
				item.Lt(strconv.Itoa(yearAddOne))
				boolQueryYear.Should(item)
			}
			addList[3] = 1
		case "style":
			item := elastic.NewBoolQuery()
			indexSearch := elastic.NewTermQuery("tags", v.Value)
			wholeWordSearch := elastic.NewTermQuery("tags.whole", v.Value)
			item.Should(indexSearch)
			item.Should(wholeWordSearch)
			boolQueryStyle.Should(item)
			addList[4] = 1
		default:
			continue
		}
	}

	for k, v := range addList {
		if v == 1 {
			boolQueryGame.Must(queryList[k])
		}
	}

	matchQueryGameName := elastic.NewMatchQuery("game_name", keyword)
	matchQueryGameName.Operator("and")
	matchDeveloper := elastic.NewMatchQuery("developer", keyword)
	matchDeveloper.Operator("and")
	matchPublisher := elastic.NewMatchQuery("publisher", keyword)
	matchPublisher.Operator("and")
	boolQueryGame.Should(matchQueryGameName, matchDeveloper, matchPublisher)
	boolQueryGame.MinimumNumberShouldMatch(1)

	highlightGameName := elastic.NewHighlight()
	highlightGameName.Field("game_name")
	highlightGameName.Field("developer")
	highlightGameName.Field("publisher")

	searchResultOfGame, err := ES.Search().Index("game_new").Pretty(true).Query(boolQueryGame).Size(int(size)).Highlight(highlightGameName).Do(context.Background())
	if err != nil {
		return nil, err
	}

	if len(searchResultOfGame.Hits.Hits) == 0 {
		reg := regexp.MustCompile(`[0-9,的]`)
		newSearchWord := reg.ReplaceAllString(keyword, "")
		matchQueryGameName = elastic.NewMatchQuery("game_name", newSearchWord)
		matchQueryGameName.Operator("or")
		boolQueryGame = elastic.NewBoolQuery()
		for k, v := range addList {
			if v == 1 {
				boolQueryGame.Must(queryList[k])
			}
		}
		boolQueryGame.Must(matchQueryGameName)
		searchResultOfGame, err = ES.Search().Index("game_new").Pretty(true).Query(boolQueryGame).Size(int(size)).Highlight(highlightGameName).Do(context.Background())
		if err != nil {
			return nil, err
		}
	}

	if len(searchResultOfGame.Hits.Hits) == 0 {
		boolMatchOther := elastic.NewBoolQuery()
		matchDeveloper := elastic.NewMatchQuery("developer", keyword)
		matchPublisher := elastic.NewMatchQuery("publisher", keyword)
		boolMatchOther.Should(matchDeveloper, matchPublisher)
		highlightGameName = elastic.NewHighlight()
		highlightGameName.Field("publisher")
		highlightGameName.Field("developer")
		boolQueryGame = elastic.NewBoolQuery()
		for k, v := range addList {
			if v == 1 {
				boolQueryGame.Must(queryList[k])
			}
		}
		boolQueryGame.Must(boolMatchOther)
		searchResultOfGame, err = ES.Search().Index("game_new").Pretty(true).Query(boolQueryGame).Size(int(size)).Highlight(highlightGameName).Do(context.Background())
		if err != nil {
			return nil, err
		}
	}

	for _, v := range searchResultOfGame.Hits.Hits {
		item := &pb.GameResult{}
		item.Highlight = make(map[string]*pb.Highlight, 0)
		item.Source = string(v.Source)
		item.Id = v.Id
		for k, j := range v.Highlight {
			item.Highlight[k] = &pb.Highlight{}
			item.Highlight[k].Field = make([]string, 0)
			item.Highlight[k].Field = j
		}
		gameList = append(gameList, item)
	}
	return gameList, nil
}

func GetNewsSearch(keyword string, size int32, sort bool) ([]*pb.Result, error) {
	resourceList := make([]*pb.Result, 0)

	keyword += " " + WordChange(keyword)

	boolQueryOfResource := elastic.NewBoolQuery()
	matchQueryResourceTitle := elastic.NewMatchQuery("title", keyword)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", keyword)
	//matchQueryResourceContent := elastic.NewMatchQuery("content", keyword)
	matchQueryResourceType := elastic.NewMatchQuery("type", int(0))
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo)
	boolQueryOfResource.MinimumNumberShouldMatch(1)

	boolQueryOfResource.Must(matchQueryResourceType)

	highlightResource := elastic.NewHighlight()
	highlightResource.Field("title")
	highlightResource.Field("info")
	//highlightResource.Field("content")
	fetchItem := elastic.NewFetchSourceContext(true)
	fetchItem.Exclude("content")

	var searchResultOfResource *elastic.SearchResult
	var err error
	if sort == true {
		searchResultOfResource, err = ES.Search().Index("resource_new").FetchSourceContext(fetchItem).Pretty(true).Query(boolQueryOfResource).Size(int(size)).Highlight(highlightResource).Sort("time", false).Do(context.Background())
	} else {
		searchResultOfResource, err = ES.Search().Index("resource_new").FetchSourceContext(fetchItem).Pretty(true).Query(boolQueryOfResource).Size(int(size)).Highlight(highlightResource).Do(context.Background())
	}
	if err != nil {
		return nil, err
	}
	for _, v := range searchResultOfResource.Hits.Hits {
		item := &pb.Result{}
		item.Highlight = make(map[string]*pb.Highlight, 0)
		item.Source = string(v.Source)
		for k, j := range v.Highlight {
			item.Highlight[k] = &pb.Highlight{}
			item.Highlight[k].Field = make([]string, 0)
			item.Highlight[k].Field = j
		}
		resourceList = append(resourceList, item)
	}

	return resourceList, nil
}

func GetRaidersSearch(keyword string, size int32, sort bool) ([]*pb.Result, error) {
	resourceList := make([]*pb.Result, 0)

	keyword += " " + WordChange(keyword)

	boolQueryOfResource := elastic.NewBoolQuery()
	matchQueryResourceTitle := elastic.NewMatchQuery("title", keyword)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", keyword)
	//matchQueryResourceContent := elastic.NewMatchQuery("content", keyword)
	matchQueryResourceType := elastic.NewMatchQuery("type", int(2))
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo)
	boolQueryOfResource.MinimumNumberShouldMatch(1)
	boolQueryOfResource.Must(matchQueryResourceType)

	highlightResource := elastic.NewHighlight()
	highlightResource.Field("title")
	highlightResource.Field("info")
	//highlightResource.Field("content")
	fetchItem := elastic.NewFetchSourceContext(true)
	fetchItem.Exclude("content")

	var searchResultOfResource *elastic.SearchResult
	var err error
	if sort == true {
		searchResultOfResource, err = ES.Search().Index("resource_new").FetchSourceContext(fetchItem).Pretty(true).Query(boolQueryOfResource).Size(int(size)).Highlight(highlightResource).Sort("time", false).Do(context.Background())
	} else {
		searchResultOfResource, err = ES.Search().Index("resource_new").FetchSourceContext(fetchItem).Pretty(true).Query(boolQueryOfResource).Size(int(size)).Highlight(highlightResource).Do(context.Background())
	}
	if err != nil {
		return nil, err
	}
	for _, v := range searchResultOfResource.Hits.Hits {
		item := &pb.Result{}
		item.Highlight = make(map[string]*pb.Highlight, 0)
		item.Source = string(v.Source)
		for k, j := range v.Highlight {
			item.Highlight[k] = &pb.Highlight{}
			item.Highlight[k].Field = make([]string, 0)
			item.Highlight[k].Field = j
		}
		resourceList = append(resourceList, item)
	}

	return resourceList, nil
}

func GetVideoSearch(keyword string, size int32, sort bool) ([]*pb.Result, error) {
	resourceList := make([]*pb.Result, 0)

	keyword += " " + WordChange(keyword)

	boolQueryOfResource := elastic.NewBoolQuery()
	matchQueryResourceTitle := elastic.NewMatchQuery("title", keyword)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", keyword)
	//matchQueryResourceContent := elastic.NewMatchQuery("content", keyword)
	matchQueryResourceType := elastic.NewMatchQuery("type", int(1))
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo)
	boolQueryOfResource.MinimumNumberShouldMatch(1)
	boolQueryOfResource.Must(matchQueryResourceType)

	highlightResource := elastic.NewHighlight()
	highlightResource.Field("title")
	highlightResource.Field("info")
	//highlightResource.Field("content")
	fetchItem := elastic.NewFetchSourceContext(true)
	fetchItem.Exclude("content")

	var searchResultOfResource *elastic.SearchResult
	var err error
	if sort == true {
		searchResultOfResource, err = ES.Search().Index("resource_new").FetchSourceContext(fetchItem).Pretty(true).Query(boolQueryOfResource).Size(int(size)).Highlight(highlightResource).Sort("time", false).Do(context.Background())
	} else {
		searchResultOfResource, err = ES.Search().Index("resource_new").FetchSourceContext(fetchItem).Pretty(true).Query(boolQueryOfResource).Size(int(size)).Highlight(highlightResource).Do(context.Background())
	}
	if err != nil {
		return nil, err
	}
	for _, v := range searchResultOfResource.Hits.Hits {
		item := &pb.Result{}
		item.Highlight = make(map[string]*pb.Highlight, 0)
		item.Source = string(v.Source)
		for k, j := range v.Highlight {
			item.Highlight[k] = &pb.Highlight{}
			item.Highlight[k].Field = make([]string, 0)
			item.Highlight[k].Field = j
		}
		resourceList = append(resourceList, item)
	}

	return resourceList, nil
}

func GetGameNewsGet(gameName string, size int32) ([]string, error) {
	resourceList := make([]string, 0)
	gameName = GetGameSearchWord(gameName)
	boolQueryOfResource := elastic.NewBoolQuery()
	matchQueryResourceTitle := elastic.NewMatchQuery("title", gameName)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", gameName)
	//matchQueryResourceContent := elastic.NewMatchQuery("content", gameName)
	matchQueryResourceType := elastic.NewMatchQuery("type", int(0))
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo)
	boolQueryOfResource.Must(matchQueryResourceType)
	fetchItem := elastic.NewFetchSourceContext(true)
	fetchItem.Exclude("content")

	searchResultOfResource, err := ES.Search().Index("resource_new").FetchSourceContext(fetchItem).Pretty(true).Query(boolQueryOfResource).Size(int(size)).Do(context.Background())
	if err != nil {
		return nil, err
	}
	for _, v := range searchResultOfResource.Hits.Hits {
		item := string(v.Source)
		resourceList = append(resourceList, item)
	}

	return resourceList, nil
}

func GetGameRaidersGet(gameName string, size int32) ([]string, error) {
	resourceList := make([]string, 0)
	gameName = GetGameSearchWord(gameName)
	boolQueryOfResource := elastic.NewBoolQuery()
	matchQueryResourceTitle := elastic.NewMatchQuery("title", gameName)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", gameName)
	//matchQueryResourceContent := elastic.NewMatchQuery("content", gameName)
	matchQueryResourceType := elastic.NewMatchQuery("type", int(2))
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo)
	boolQueryOfResource.Must(matchQueryResourceType)
	fetchItem := elastic.NewFetchSourceContext(true)
	fetchItem.Exclude("content")

	searchResultOfResource, err := ES.Search().Index("resource_new").FetchSourceContext(fetchItem).Pretty(true).Query(boolQueryOfResource).Size(int(size)).Do(context.Background())
	if err != nil {
		return nil, err
	}
	for _, v := range searchResultOfResource.Hits.Hits {
		item := string(v.Source)
		resourceList = append(resourceList, item)
	}

	return resourceList, nil
}

func GetGameVideoGet(gameName string, size int32) ([]string, error) {
	resourceList := make([]string, 0)
	gameName = GetGameSearchWord(gameName)
	boolQueryOfResource := elastic.NewBoolQuery()
	matchQueryResourceTitle := elastic.NewMatchQuery("title", gameName)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", gameName)
	//matchQueryResourceContent := elastic.NewMatchQuery("content", gameName)
	matchQueryResourceType := elastic.NewMatchQuery("type", int(1))
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo)
	boolQueryOfResource.Must(matchQueryResourceType)
	fetchItem := elastic.NewFetchSourceContext(true)
	fetchItem.Exclude("content")

	searchResultOfResource, err := ES.Search().Index("resource_new").FetchSourceContext(fetchItem).Pretty(true).Query(boolQueryOfResource).Size(int(size)).Do(context.Background())
	if err != nil {
		return nil, err
	}
	for _, v := range searchResultOfResource.Hits.Hits {
		item := string(v.Source)
		resourceList = append(resourceList, item)
	}

	return resourceList, nil
}

func GetGameInfo(gameID string) (string, error) {
	result := ""
	idQuery := elastic.NewIdsQuery()
	idQuery.Ids(gameID)
	searchResult, err := ES.Search().Index("game_new").Pretty(true).Query(idQuery).Do(context.Background())
	if err != nil {
		return "", err
	}
	if len(searchResult.Hits.Hits) > 0 {
		result = string(searchResult.Hits.Hits[0].Source)
	}
	return result, nil
}
