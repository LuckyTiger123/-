package Server

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/olivere/elastic/v7"
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
	searchResult, err := ES.Search().Index("game").Pretty(true).Sort("release_date", false).Size(int(pageSize)).From(int(pageSize*page - pageSize)).Do(context.Background())
	if err != nil {
		return nil, err
	}
	for _, v := range searchResult.Hits.Hits {
		item := string(v.Source)
		resourceList = append(resourceList, item)
	}
	return resourceList, nil
}

//func GetGlobalSearch(keyword string, size int32) ([]string, []string, error) {
//	gameList := make([]string, 0)
//	resourceList := make([]string, 0)
//
//	// game search
//	fuzzyQuery := elastic.NewFuzzyQuery("game_name", keyword)
//
//
//}

func SelectGameInfo() error {
	exists, err := ES.IndexExists("game").Do(context.Background())
	if err != nil {
		return err
	}

	if !exists {
		return fmt.Errorf("index not find")
	}

	ES.Search()

	return nil
}

func GameNameTermQuery(gameName string) error {
	termQuery := elastic.NewMatchQuery("game_name", gameName)
	searchResult, err := ES.Search().Index("game").Pretty(true).Query(termQuery).Do(context.Background())
	if err != nil {
		return err
	}
	itemInfo, _ := json.Marshal(searchResult.Hits.Hits[0].Source)
	fmt.Println(string(itemInfo))
	return nil
}
