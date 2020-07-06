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
	_, b := GetGameIndex(4, 1)
	if b != nil {
		fmt.Println(b.Error())
	}
}
