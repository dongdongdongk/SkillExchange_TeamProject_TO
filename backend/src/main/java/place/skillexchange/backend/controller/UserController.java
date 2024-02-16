package place.skillexchange.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import place.skillexchange.backend.auth.services.AuthService;
import place.skillexchange.backend.dto.UserDto;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/user/")
public class UserController {
    private final AuthService authService;

    @PostMapping("/signUp")
    public ResponseEntity<String> register(@RequestBody UserDto.RegisterRequest dto) {
        return authService.register(dto);
    }
}
