package Server

import (
	"context"
	"fmt"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	pb "goServer/proto"
	"google.golang.org/grpc"
	"net"
	"net/http"
	"strings"
)

type Server struct {
	pb.ScheduleServiceServer
}

func SelfOutgoingHeaderMatcher(key string) (string, bool) {
	fmt.Println(key)
	switch key {
	case strings.ToLower("Access-Control-Allow-Origin"):
		return key, true
	default:
		return runtime.DefaultHeaderMatcher(key)
	}
}

func runGrpcGateway(ctx context.Context) error {
	mux := runtime.NewServeMux(
		runtime.WithIncomingHeaderMatcher(runtime.DefaultHeaderMatcher),
		runtime.WithOutgoingHeaderMatcher(SelfOutgoingHeaderMatcher),
	)

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
	if req.Size_ < 1 {
		return nil, fmt.Errorf("invalid input value")
	}
	gameResult, resourceResult, err := GetGlobalSearch(req.Keyword, req.Size_)
	result := &pb.GlobalSearchResponse{}
	if err != nil {
		return result, err
	}
	result.GameResult = gameResult
	result.ResourceResult = resourceResult
	return result, nil
}

func (s *Server) GameSearch(ctx context.Context, req *pb.GameSearchRequest) (*pb.GameSearchResponse, error) {
	if req.Size_ < 1 {
		return nil, fmt.Errorf("invalid input value")
	}
	gameResult, err := GetGameSearch(req.Keyword, req.Filter, req.Size_)
	result := &pb.GameSearchResponse{}
	if err != nil {
		return result, err
	}
	result.Result = gameResult
	return result, nil
}

func (s *Server) NewsSearch(ctx context.Context, req *pb.NewsSearchRequest) (*pb.NewsSearchResponse, error) {
	if req.Size_ < 1 {
		return nil, fmt.Errorf("invalid input value")
	}
	resourceResult, err := GetNewsSearch(req.Keyword, req.Size_)
	result := &pb.NewsSearchResponse{}
	if err != nil {
		return result, err
	}
	result.Result = resourceResult
	return result, nil
}

func (s *Server) RaidersSearch(ctx context.Context, req *pb.RaidersSearchRequest) (*pb.RaidersSearchResponse, error) {
	if req.Size_ < 1 {
		return nil, fmt.Errorf("invalid input value")
	}
	resourceResult, err := GetRaidersSearch(req.Keyword, req.Size_)
	result := &pb.RaidersSearchResponse{}
	if err != nil {
		return result, err
	}
	result.Result = resourceResult
	return result, nil
}

func (s *Server) VideoSearch(ctx context.Context, req *pb.VideoSearchRequest) (*pb.VideoSearchResponse, error) {
	if req.Size_ < 1 {
		return nil, fmt.Errorf("invalid input value")
	}
	resourceResult, err := GetVideoSearch(req.Keyword, req.Size_)
	result := &pb.VideoSearchResponse{}
	if err != nil {
		return result, err
	}
	result.Result = resourceResult
	return result, nil
}

func (s *Server) GameNewsGet(ctx context.Context, req *pb.GameNewsGetRequest) (*pb.GameNewsGetResponse, error) {
	if req.Size_ < 1 {
		return nil, fmt.Errorf("invalid input value")
	}
	resourceResult, err := GetGameNewsGet(req.GameName, req.Size_)
	result := &pb.GameNewsGetResponse{}
	if err != nil {
		return result, err
	}
	result.Result = resourceResult
	return result, nil
}

func (s *Server) GameRaidersGet(ctx context.Context, req *pb.GameRaidersGetRequest) (*pb.GameRaidersGetResponse, error) {
	if req.Size_ < 1 {
		return nil, fmt.Errorf("invalid input value")
	}
	resourceResult, err := GetGameRaidersGet(req.GameName, req.Size_)
	result := &pb.GameRaidersGetResponse{}
	if err != nil {
		return result, err
	}
	result.Result = resourceResult
	return result, nil
}

func (s *Server) GameVideoGet(ctx context.Context, req *pb.GameVideoGetRequest) (*pb.GameVideoGetResponse, error) {
	if req.Size_ < 1 {
		return nil, fmt.Errorf("invalid input value")
	}
	resourceResult, err := GetGameVideoGet(req.GameName, req.Size_)
	result := &pb.GameVideoGetResponse{}
	if err != nil {
		return result, err
	}
	result.Result = resourceResult
	return result, nil
}
