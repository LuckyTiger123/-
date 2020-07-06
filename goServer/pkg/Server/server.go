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

func (s *Server) GameIndex(ctx context.Context, req *pb.GameIndexRequest) (*pb.GameIndexResponse, error) {
	if req.PageSize <= 0 || req.Page < 1 {
		return nil, fmt.Errorf("invalid input value")
	}
	getResult, err := GetGameIndex(req.PageSize, req.Page)
	result := &pb.GameIndexResponse{}
	if err != nil {
		return result, err
	}
	result.Result = getResult
	return result, nil
}

func (s *Server) ResourceIndex(ctx context.Context, req *pb.ResourceIndexRequest) (*pb.ResourceIndexResponse, error) {
	if req.PageSize <= 0 || req.Page < 1 {
		return nil, fmt.Errorf("invalid input value")
	}
	getResult, err := GetResourceIndex(req.PageSize, req.Page)
	result := &pb.ResourceIndexResponse{}
	if err != nil {
		return result, err
	}
	result.Result = getResult
	return result, nil
}

func (s *Server) GlobalSearch(ctx context.Context, req *pb.GlobalSearchRequest) (*pb.GlobalSearchResponse, error) {
	return nil, nil
}

func (s *Server) GameSearch(ctx context.Context, req *pb.GameSearchRequest) (*pb.GameSearchResponse, error) {
	return nil, nil
}

func (s *Server) NewsSearch(ctx context.Context, req *pb.NewsSearchRequest) (*pb.NewsSearchResponse, error) {
	return nil, nil
}

func (s *Server) RaidersSearch(ctx context.Context, req *pb.RaidersSearchRequest) (*pb.RaidersSearchResponse, error) {
	return nil, nil
}

func (s *Server) VideoSearch(ctx context.Context, req *pb.VideoSearchRequest) (*pb.VideoSearchResponse, error) {
	return nil, nil
}

func (s *Server) GameNewsGet(ctx context.Context, req *pb.GameNewsGetRequest) (*pb.GameNewsGetResponse, error) {
	return nil, nil
}

func (s *Server) GameRaidersGetGet(ctx context.Context, req *pb.GameRaidersGetRequest) (*pb.GameRaidersGetResponse, error) {
	return nil, nil
}

func (s *Server) GameVideoGet(ctx context.Context, req *pb.GameVideoGetRequest) (*pb.GameVideoGetResponse, error) {
	return nil, nil
}
