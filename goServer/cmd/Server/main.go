package main

import (
	"fmt"
	"goServer/pkg/Server"
)

func main() {
	err := <-Server.Run()
	if err != nil {
		fmt.Println(err.Error())
	}
}
