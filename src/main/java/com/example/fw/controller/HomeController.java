package com.example.fw.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "test";  // `index.html` 파일을 템플릿으로 리턴
    }
}
