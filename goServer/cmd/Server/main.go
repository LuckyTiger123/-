package main

import (
	"fmt"
	"goServer/pkg/Server"
)

func main() {
	err := Server.Bootstrap()
	if err != nil {
		fmt.Println(err.Error())
	}
}
