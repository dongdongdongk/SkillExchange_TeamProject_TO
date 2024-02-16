package place.skillexchange.backend.auth.services;


import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

//@Service
public class RefreshTokenService {
//
//    private final UserRepository userRepository;
//
//    private final RefreshTokenRepository refreshTokenRepository;
//
//    public RefreshTokenService(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository) {
//        this.userRepository = userRepository;
//        this.refreshTokenRepository = refreshTokenRepository;
//    }
//
//    /**
//     * refreshToken 생성
//     */
//    public RefreshToken createRefreshToken(String username) {
//        //사용자 이름이 존재하면 User 객체 반환, 없다면 사용자를 찾을 수 없다는 예외
//        User user = userRepository.findByEmail(username)
//                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일을 가진 유저를 찾지 못했습니다 : " + username));
//
//        //user의 refreshToken을 가져와 RefreshToken 객체 추출
//        RefreshToken refreshToken = user.getRefreshToken();
//
//        //refreshToken이 NULL이라면 refreshToken을 새롭게 만든다
//        if (refreshToken == null) {
//            refreshToken = RefreshToken.builder()
//                    //refreshToken은 UUID로 생성
//                    .refreshToken(UUID.randomUUID().toString())
//                    //만료일은 현재시간+30초 (실제로는 2주 정도로 설정)
//                    .expirationTime(new Date(System.currentTimeMillis() + 60 * 1000))
//                    .user(user)
//                    .build();
//
//            refreshTokenRepository.save(refreshToken);
//        }
//
//        return refreshToken;
//    }
//
//    /**
//     * refreshToken 확인
//     */
//    public RefreshToken verifyRefreshToken(String refreshToken) {
//        RefreshToken refToken = refreshTokenRepository.findByRefreshToken(refreshToken)
//                .orElseThrow(() -> new RuntimeException("Refresh token not found!"));
//
//        //refreshToken의 만료시간이 현재 시간보다 작다면 refreshToken 삭제
//        if (refToken.getExpirationTime().compareTo(Date.from(Instant.now())) < 0) {
//            refreshTokenRepository.delete(refToken);
//            throw new RuntimeException("Refresh Token expired");
//        }
//
//        return refToken;
//    }
}
