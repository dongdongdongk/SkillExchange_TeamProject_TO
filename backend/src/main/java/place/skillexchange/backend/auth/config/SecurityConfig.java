package place.skillexchange.backend.config;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class SecurityConfig {
    /**
     * (1) 계정 활성화를 위한 jwt 토큰 : 회원가입(/v1/user/signUp) 후 발급하여 이메일로 보내야 함 (Filtering(X), Controller-Service(O))
     * (2) accessToken : 로그인 시 생성하여 헤더에 저장 (Filtering(X), Controller-Service(O))
     * (3) refreshToken : 로그인 시 생성하여 DB에 저장 & 쿠키에 저장 (Filtering(X), Controller-Service(O))
     * (2)번과 (3)번은 같은 엔드포인트(/v1/user/signIn) 즉, 동일 메서드에 정의
     * (4) 회원 정보를 필요로 하는 엔드포인트들을 위해 accessToken 및 refreshToken 검증은 Filtering(O)
     */

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName("_csrf");

        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                //CorsConfigurationSource 인터페이스를 구현하는 익명 클래스 생성하여 getCorsConfiguration() 메소드 재정의
                .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
                    //getCorsConfiguration() 메소드에서 CorsConfiguration 객체를 생성하고 필요한 설정들을 추가
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration config = new CorsConfiguration();
                        //허용할 출처(도메인)를 설정
                        config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                        //허용할 HTTP 메소드를 설정
                        config.setAllowedMethods(Collections.singletonList("*"));
                        //인증 정보 허용 여부를 설정
                        config.setAllowCredentials(true);
                        //허용할 헤더를 설정
                        config.setAllowedHeaders(Collections.singletonList("*"));
                        config.setExposedHeaders(Arrays.asList("Authorization"));
                        //CORS 설정 캐시로 사용할 시간을 설정
                        config.setMaxAge(3600L);
                        return config;
                    }
                })).csrf((csrf) -> csrf.csrfTokenRequestHandler(requestHandler)
                        .ignoringRequestMatchers("/v1/user/signUp","/v1/user/activation","/v1/user/fIndId","/v1/user/fIndPw","/v1/notices/list")
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
                .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
                .addFilterBefore(new RequestValidationBeforeFilter(),BasicAuthenticationFilter.class)
                .addFilterAt(new AuthoritiesLoggingAtFilter(),BasicAuthenticationFilter.class)
                .addFilterAfter(new AuthoritiesLoggingAfterFilter(),BasicAuthenticationFilter.class)
                .addFilterAfter(new JWTTokenGeneratorFilter(),BasicAuthenticationFilter.class)
                .addFilterBefore(new JWTTokenValidatorFilter(),BasicAuthenticationFilter.class)
                .authorizeHttpRequests((requests)->requests
                        .requestMatchers("/myAccount").hasRole("USER")
                        .requestMatchers("/myBalance").hasAnyRole("USER","ADMIN")
                        .requestMatchers("/myLoans").hasRole("USER")
                        .requestMatchers("/myCards").hasRole("USER")
                        .requestMatchers("/user").authenticated()
                        .requestMatchers("/notices","/contact","/register").permitAll())
                .formLogin(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
