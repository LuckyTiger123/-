package Server

import "fmt"

func Bootstrap() error {
	err := Init()
	if err != nil {
		fmt.Println(err.Error())
	}

	err = <-Run()
	if err != nil {
		fmt.Println(err.Error())
	}

	return err
}
