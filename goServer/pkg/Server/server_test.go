package Server

import (
	"context"
	"fmt"
	pb "goServer/proto"
	"google.golang.org/grpc"
	"testing"
)

func TestServer(t *testing.T) {
	conn, err := grpc.Dial("0.0.0.0:8099", grpc.WithInsecure())
	if err != nil {
		fmt.Println(err.Error())
	}
	c := pb.NewScheduleServiceClient(conn)
	r, err := c.ServerTest(context.Background(), &pb.ServerRequest{
		Info: "Server Test",
	})
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println(r.Result)
	}
}
