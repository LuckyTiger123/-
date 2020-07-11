package Server

import (
	"fmt"
	"testing"
)

//func TestServer(t *testing.T) {
//	conn, err := grpc.Dial("0.0.0.0:8099", grpc.WithInsecure())
//	if err != nil {
//		fmt.Println(err.Error())
//	}
//	c := pb.NewScheduleServiceClient(conn)
//	r, err := c.ServerTest(context.Background(), &pb.ServerRequest{
//		Info: "Server Test",
//	})
//	if err != nil {
//		fmt.Println(err.Error())
//	} else {
//		fmt.Println(r.Result)
//	}
//}

func TestFunc(t *testing.T) {
	Init()
	//filter := make([]*pb.Filter, 0)
	//filter = append(filter,&pb.Filter{
	//	Type: "type",
	//	Value: "动作",
	//})
	result, err := GetGameIndex(10,1)
	if err != nil {
		fmt.Println(err.Error())
	} else {
		for _, v := range result {
			fmt.Println(v.Source)
		}
	}
	//reg := regexp.MustCompile(`[0-9,的]`)
	//fmt.Println(reg.ReplaceAllString("鬼泣的第五5", ""))
}

func TestWord(t *testing.T) {
	WordListInit()
	result := WordChange("老滚5")
	keyword:="gta"
	keyword += " " + WordChange(keyword)
	fmt.Println(keyword)
	fmt.Println(result)
}
