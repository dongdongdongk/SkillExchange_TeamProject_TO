package place.skillexchange.backend.auth.services;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Service
public class AuthFilterService extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserDetailsService userDetailsService;

    public AuthFilterService(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }


    /**
     * 헤더에 토큰을 저장하는데, 저장된 토큰을 헤더에서 꺼내서 유효한지 검증하는 작업
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        //Authorization 이름을 가진 헤더의 값을 꺼내옴
        final String authHeader = request.getHeader("Authorization");
        String jwt;
        String username;

        //authHeader가 null이고, Bearer로 시작하지 않다면 체인 내의 다음 필터를 호출
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            //체인 내의 다음 필터를 호출
            filterChain.doFilter(request, response);
            return;
        }

        // authHeader의 `Bearer `를 제외한 문자열 jwt에 담은
        jwt = authHeader.substring(7);

        // jwt의 사용자 이름 추출
        username = jwtService.extractUsername(jwt);

        //username이 null이 아니고, SecurityContextHolder의 getAuthentication이 null일 때 (=사용자가 인증되지 않았을 때)
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            //UserDetailsService에서 loadUserByUsername 메서드로 사용자 세부 정보 검색
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            //엑세스 토큰이 유효하다면
            if(jwtService.isTokenValid(jwt, userDetails)) {
                //UsernamePasswordAuthenticationToken 대상을 생성 (사용자이름,암호(=null로 설정),권한)
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                  userDetails,
                  null,
                  userDetails.getAuthorities()
                );

                //authenticationToken의 세부정보 설정
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                //해당 인증 객체를 SecurityContextHolder에 authenticationToken 설정
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }else{
                /**
                 * 리프레시 토큰 만료기한이 유효하면 엑세스 토큰 재발급, 리프레시 토큰 쿠키에 없거나 DB에 없거나 만료되었다면 재로그인하라는 ExceptionHandler
                 */
            }
        }
        //체인 내의 다음 필터를 호출
        filterChain.doFilter(request, response);
    }
}
