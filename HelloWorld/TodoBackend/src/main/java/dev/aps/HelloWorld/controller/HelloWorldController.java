package dev.aps.HelloWorld.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class HelloWorldController {
    @GetMapping("/hello")
    String sayHelloWorld(){
        return "Hello World";
    }

    @GetMapping("/name")
    String sayname(){
        return "Hello Apsar";
    }

}
