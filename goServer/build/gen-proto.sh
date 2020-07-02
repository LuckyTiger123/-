PROTO_FILE_REPLACE="\
Mgoogle/protobuf/any.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/duration.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/struct.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/timestamp.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/wrappers.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/field_mask.proto=github.com/gogo/protobuf/types,"
PROTO_FILE_REPLACE=""


GOGO_FASTER_PARAM="goproto_registration=true,"
GOGO_FASTER_PARAM=""

GO_OUT=go_out
GO_OUT=gogo_out

PROTOARG="-I. \
  -I/usr/local/include \
  -I"$GOPATH"/src \
  -I"$GOPATH"/pkg/mod/github.com/gogo/protobuf@v1.3.1 \
  -I"$GOPATH"/pkg/mod/github.com/gogo/protobuf@v1.3.1/protobuf \
  -I"$GOPATH"/pkg/mod/github.com/grpc-ecosystem/grpc-gateway@v1.14.4/third_party/googleapis \
  -I"$GOPATH"/pkg/mod/github.com/grpc-ecosystem/grpc-gateway@v1.14.4/ \
  --$GO_OUT=${PROTO_FILE_REPLACE}${GOGO_FASTER_PARAM}plugins=grpc:. \
  --grpc-gateway_out=${PROTO_FILE_REPLACE}logtostderr=true,repeated_path_param_separator=ssv:../proto" 

cd proto/
protoc $PROTOARG ./*.proto