package place.skillexchange.backend.auth.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    /**
     * 클레임(Claim): JWT(토큰 기반의 웹 인증 시스템) 내에서 사용자에 대한 정보를 나타내는 JSON 객체
     */

    private static final String SECRET_KEY = "BF7FD11ACE545745B7BA1AF98B6F156D127BC7BB544BAB6A4FD74E4FC7";

    /**
     * 토큰의 사용자 이름 추출
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * 클레임 추출
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * JWT에서 모든 클레임을 추출하는 작업
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * 비밀 키 : JWT에서 사용되는 비밀 키
     */
    private Key getSignInKey() {
        // decode SECRET_KEY
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    /**
     * 엑세스 토큰 생성
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // generate token using Jwt utility class and return token as String
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return Jwts
                .builder()
                //클레임 설정
                .setClaims(extraClaims)
                //유저이름 설정
                .setSubject(userDetails.getUsername())
                //시작일
                .setIssuedAt(new Date(System.currentTimeMillis()))
                //만료일 (실제로는 1시간 정도로 설정)
                .setExpiration(new Date(System.currentTimeMillis() + 60 * 1000))
                //비밀키와 HS256 알고리즘 설정
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 사용자 이름과 사용자 세부 정보를 기반으로 토큰이 유효한지 여부
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * 토큰 만료 여부
     */
    private boolean isTokenExpired(String token) {
        //before(): 추출된 만료 날짜가 현재 날짜 이전인지 확인
        return extractExpiration(token).before(new Date());
    }

    /**
     * 토큰에서 만료 일자 클레임을 추출하여 반환
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
