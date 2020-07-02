package Server

import (
	"context"
	"fmt"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	pb "goServer/proto"
	"google.golang.org/grpc"
	"net"
	"net/http"
)

type Server struct {
	pb.ScheduleServiceServer
}

func (s *Server) ServerTest(ctx context.Context, req *pb.ServerRequest) (*pb.ServerResponse, error) {
	fmt.Println(req.Info)
	result := &pb.ServerResponse{Result: req.Info}
	return result, nil
}

func runGrpcGateway(ctx context.Context) error {
	mux := runtime.NewServeMux()

	err := pb.RegisterScheduleServiceHandlerServer(ctx, mux, &Server{})
	if err != nil {
		return nil
	}

	server := &http.Server{
		Addr:    "0.0.0.0:8088",
		Handler: mux,
	}
	go func() {
		<-ctx.Done()
		if err := server.Shutdown(context.Background()); err != nil {
			fmt.Println(err.Error())
		}
	}()

	if err := server.ListenAndServe(); err != http.ErrServerClosed {
		return err
	}

	return nil
}

func runGrpcServer(ctx context.Context) error {
	address := "0.0.0.0:8099"
	lis, err := net.Listen("tcp", address)
	if err != nil {
		return err
	}
	defer func() {
		if err := lis.Close(); err != nil {
			fmt.Println(err.Error())
		}
	}()
	server := grpc.NewServer()
	pb.RegisterScheduleServiceServer(server, &Server{})
	go func() {
		defer server.GracefulStop()
		<-ctx.Done()
	}()
	return server.Serve(lis)
}

func Run() <-chan error {
	errCh := make(chan error)

	// run the server for rpc request
	go func() {
		errCh <- runGrpcServer(context.Background())
	}()
	// run the gateway for http request
	go func() {
		errCh <- runGrpcGateway(context.Background())
	}()

	return errCh
}
