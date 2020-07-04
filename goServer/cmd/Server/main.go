package main

import (
	"fmt"
	"goServer/pkg/Server"
)

func main() {
	err := Server.Init()
	if err != nil {
		fmt.Println(err.Error())
	}

	err = Server.GameNameTermQuery("Grand")
	if err != nil {
		fmt.Println(err.Error())
	}

	err = <-Server.Run()
	if err != nil {
		fmt.Println(err.Error())
	}

}
