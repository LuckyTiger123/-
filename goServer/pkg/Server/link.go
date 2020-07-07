package Server

import (
	"context"
	"fmt"
	"github.com/olivere/elastic/v7"
	pb "goServer/proto"
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

func GetGameIndex(pageSize int32, page int32) ([]string, error) {
	gameList := make([]string, 0)
	searchResult, err := ES.Search().Index("game").Pretty(true).Sort("release_date", false).Size(int(pageSize)).From(int(pageSize*page - pageSize)).Do(context.Background())
	if err != nil {
		return nil, err
	}
	for _, v := range searchResult.Hits.Hits {
		item := string(v.Source)
		gameList = append(gameList, item)
	}
	return gameList, nil
}

func GetResourceIndex(pageSize int32, page int32) ([]string, error) {
	resourceList := make([]string, 0)
	searchResult, err := ES.Search().Index("resource").Pretty(true).Sort("release_date", false).Size(int(pageSize)).From(int(pageSize*page - pageSize)).Do(context.Background())
	if err != nil {
		return nil, err
	}
	for _, v := range searchResult.Hits.Hits {
		item := string(v.Source)
		resourceList = append(resourceList, item)
	}
	return resourceList, nil
}

func GetGlobalSearch(keyword string, size int32) ([]*pb.Result, []*pb.Result, error) {
	gameList := make([]*pb.Result, 0)
	resourceList := make([]*pb.Result, 0)

	// game search
	matchQueryGameName := elastic.NewMatchQuery("game_name", keyword)
	highlightGameName := elastic.NewHighlight()
	highlightGameName.Field("game_name")

	searchResultOfGame, err := ES.Search().Index("game").Pretty(true).Query(matchQueryGameName).Size(3).Highlight(highlightGameName).Do(context.Background())
	if err != nil {
		return nil, nil, err
	}
	for _, v := range searchResultOfGame.Hits.Hits {
		item := &pb.Result{}
		item.Highlight = make(map[string]*pb.Highlight, 0)
		item.Source = string(v.Source)
		for k, j := range v.Highlight {
			item.Highlight[k] = &pb.Highlight{}
			item.Highlight[k].Field = make([]string, 0)
			item.Highlight[k].Field = j
		}
		gameList = append(gameList, item)
	}

	// resource search
	matchQueryResourceTitle := elastic.NewMatchQuery("title", keyword)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", keyword)
	matchQueryResourceContent := elastic.NewMatchQuery("content", keyword)
	boolQueryOfResource := elastic.NewBoolQuery()
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo, matchQueryResourceContent)

	highlightResource := elastic.NewHighlight()
	highlightResource.Field("title")
	highlightResource.Field("info")
	highlightResource.Field("content")

	searchResultOfResource, err := ES.Search().Index("resource").Pretty(true).Query(boolQueryOfResource).Size(int(size)).Highlight(highlightResource).Do(context.Background())
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

func GetGameSearch(keyword string, filter []*pb.Filter, size int32) ([]*pb.Result, error) {
	gameList := make([]*pb.Result, 0)
	boolQueryGame := elastic.NewBoolQuery()

	queryList := make([]*elastic.BoolQuery, 0)
	boolQueryType := elastic.NewBoolQuery()
	queryList = append(queryList, boolQueryType)
	boolQueryTheme := elastic.NewBoolQuery()
	queryList = append(queryList, boolQueryTheme)
	boolQueryMode := elastic.NewBoolQuery()
	queryList = append(queryList, boolQueryMode)
	boolQueryYear := elastic.NewBoolQuery()
	queryList = append(queryList, boolQueryYear)
	addList := make([]int32, 4)
	for _, v := range filter {
		switch v.Type {
		case "type":
			item := elastic.NewMatchQuery("tags", v.Value)
			boolQueryType.Should(item)
			addList[0] = 1
		case "theme":
			item := elastic.NewMatchQuery("tags", v.Value)
			boolQueryTheme.Should(item)
			addList[1] = 1
		case "mode":
			item := elastic.NewMatchQuery("tags", v.Value)
			boolQueryMode.Should(item)
			addList[2] = 1
		case "year":
			item := elastic.NewMatchQuery("release_date", v.Value)
			boolQueryYear.Should(item)
			addList[3] = 1
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
	boolQueryGame.Must(matchQueryGameName)

	highlightGameName := elastic.NewHighlight()
	highlightGameName.Field("game_name")

	searchResultOfGame, err := ES.Search().Index("game").Pretty(true).Query(boolQueryGame).Size(int(size)).Highlight(highlightGameName).Do(context.Background())
	if err != nil {
		return nil, err
	}
	for _, v := range searchResultOfGame.Hits.Hits {
		item := &pb.Result{}
		item.Highlight = make(map[string]*pb.Highlight, 0)
		item.Source = string(v.Source)
		for k, j := range v.Highlight {
			item.Highlight[k] = &pb.Highlight{}
			item.Highlight[k].Field = make([]string, 0)
			item.Highlight[k].Field = j
		}
		gameList = append(gameList, item)
	}
	return gameList, nil
}

func GetNewsSearch(keyword string, size int32) ([]*pb.Result, error) {
	resourceList := make([]*pb.Result, 0)
	boolQueryOfResource := elastic.NewBoolQuery()
	matchQueryResourceTitle := elastic.NewMatchQuery("title", keyword)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", keyword)
	matchQueryResourceContent := elastic.NewMatchQuery("content", keyword)
	matchQueryResourceType := elastic.NewMatchQuery("type", int(0))
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo, matchQueryResourceContent)
	boolQueryOfResource.Must(matchQueryResourceType)

	highlightResource := elastic.NewHighlight()
	highlightResource.Field("title")
	highlightResource.Field("info")
	highlightResource.Field("content")

	searchResultOfResource, err := ES.Search().Index("resource").Pretty(true).Query(boolQueryOfResource).Size(int(size)).Highlight(highlightResource).Do(context.Background())
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

func GetRaidersSearch(keyword string, size int32) ([]*pb.Result, error) {
	resourceList := make([]*pb.Result, 0)
	boolQueryOfResource := elastic.NewBoolQuery()
	matchQueryResourceTitle := elastic.NewMatchQuery("title", keyword)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", keyword)
	matchQueryResourceContent := elastic.NewMatchQuery("content", keyword)
	matchQueryResourceType := elastic.NewMatchQuery("type", int(1))
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo, matchQueryResourceContent)
	boolQueryOfResource.Must(matchQueryResourceType)

	highlightResource := elastic.NewHighlight()
	highlightResource.Field("title")
	highlightResource.Field("info")
	highlightResource.Field("content")

	searchResultOfResource, err := ES.Search().Index("resource").Pretty(true).Query(boolQueryOfResource).Size(int(size)).Highlight(highlightResource).Do(context.Background())
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

func GetVideoSearch(keyword string, size int32) ([]*pb.Result, error) {
	resourceList := make([]*pb.Result, 0)
	boolQueryOfResource := elastic.NewBoolQuery()
	matchQueryResourceTitle := elastic.NewMatchQuery("title", keyword)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", keyword)
	matchQueryResourceContent := elastic.NewMatchQuery("content", keyword)
	matchQueryResourceType := elastic.NewMatchQuery("type", int(2))
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo, matchQueryResourceContent)
	boolQueryOfResource.Must(matchQueryResourceType)

	highlightResource := elastic.NewHighlight()
	highlightResource.Field("title")
	highlightResource.Field("info")
	highlightResource.Field("content")

	searchResultOfResource, err := ES.Search().Index("resource").Pretty(true).Query(boolQueryOfResource).Size(int(size)).Highlight(highlightResource).Do(context.Background())
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
	boolQueryOfResource := elastic.NewBoolQuery()
	matchQueryResourceTitle := elastic.NewMatchQuery("title", gameName)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", gameName)
	matchQueryResourceContent := elastic.NewMatchQuery("content", gameName)
	matchQueryResourceType := elastic.NewMatchQuery("type", int(0))
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo, matchQueryResourceContent)
	boolQueryOfResource.Must(matchQueryResourceType)

	searchResultOfResource, err := ES.Search().Index("resource").Pretty(true).Query(boolQueryOfResource).Size(int(size)).Do(context.Background())
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
	boolQueryOfResource := elastic.NewBoolQuery()
	matchQueryResourceTitle := elastic.NewMatchQuery("title", gameName)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", gameName)
	matchQueryResourceContent := elastic.NewMatchQuery("content", gameName)
	matchQueryResourceType := elastic.NewMatchQuery("type", int(1))
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo, matchQueryResourceContent)
	boolQueryOfResource.Must(matchQueryResourceType)

	searchResultOfResource, err := ES.Search().Index("resource").Pretty(true).Query(boolQueryOfResource).Size(int(size)).Do(context.Background())
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
	boolQueryOfResource := elastic.NewBoolQuery()
	matchQueryResourceTitle := elastic.NewMatchQuery("title", gameName)
	matchQueryResourceInfo := elastic.NewMatchQuery("info", gameName)
	matchQueryResourceContent := elastic.NewMatchQuery("content", gameName)
	matchQueryResourceType := elastic.NewMatchQuery("type", int(2))
	boolQueryOfResource.Should(matchQueryResourceTitle, matchQueryResourceInfo, matchQueryResourceContent)
	boolQueryOfResource.Must(matchQueryResourceType)

	searchResultOfResource, err := ES.Search().Index("resource").Pretty(true).Query(boolQueryOfResource).Size(int(size)).Do(context.Background())
	if err != nil {
		return nil, err
	}
	for _, v := range searchResultOfResource.Hits.Hits {
		item := string(v.Source)
		resourceList = append(resourceList, item)
	}

	return resourceList, nil
}
