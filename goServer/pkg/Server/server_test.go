package Server

import (
	"encoding/json"
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
	a, b, c := GetGlobalSearch("战争机器4", 1)
	if c != nil {
		fmt.Println(c.Error())
	}else {
		info_a,_ := json.Marshal(a)
		info_b,_ := json.Marshal(b)
		fmt.Println(string(info_a))
		fmt.Println(string(info_b))
	}
}
