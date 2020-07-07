package Server

import (
	"fmt"
	pb "goServer/proto"
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
	filter := make([]*pb.Filter, 0)
	result, err := GetGameSearch("战争机器", filter, 4)
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println(result[0].Source)
	}
}
