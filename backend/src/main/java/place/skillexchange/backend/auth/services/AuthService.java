package place.skillexchange.backend.auth.services;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import place.skillexchange.backend.dto.UserDto;
import place.skillexchange.backend.entity.User;
import place.skillexchange.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
  //  private final RefreshTokenService refreshTokenService;
  //  private final AuthenticationManager authenticationManager;

    /**
     * 사용자 등록
     */
    public ResponseEntity<String> register(UserDto.RegisterRequest dto) {
        ResponseEntity response = null;
        try{
            if (dto.getPassword().equals(dto.getPasswordCheck())) {
                dto.setPassword(passwordEncoder.encode(dto.getPassword()));
                //user 저장
                if (userRepository.save(dto.toEntity()) != null) {
                    response = ResponseEntity
                            .status(HttpStatus.CREATED)
                            .body("회원가입 성공");
                }
            }
        }catch (Exception ex){
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("회원가입 실패 " + ex.getMessage());
        }
        return response;
    }

//    /**
//     * 사용자 로그인
//     */
//    public ResponseEntity<Void> login(LoginRequest loginRequest) {
//        //authenticationManager가 authenticate() = 인증한다.
//        //이미 AuthFilterService에서 유효한 jwt인지 인증하는 작업을 로그인 인증 전에 시행
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        loginRequest.getEmail(),
//                        loginRequest.getPassword()
//                        )
//        );
//
//        //유저의 이메일을 가지고 유저 객체 조회
//        var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
//        //accessToken 생성
//        var accessToken = jwtService.generateToken(user);
//        //refreshToken 생성
//        var refreshToken = refreshTokenService.createRefreshToken(loginRequest.getEmail());
//
//        // 헤더에 access 토큰 추가
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "Bearer " + accessToken);
//
//        // 쿠키에 refreshToken 추가
//        headers.add(HttpHeaders.SET_COOKIE, "refreshToken=" + refreshToken.getRefreshToken() + "; HttpOnly; Path=/");
//
//
//        // ResponseEntity에 헤더만 설정하여 반환
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .headers(headers)
//                .build();
//    }
}
