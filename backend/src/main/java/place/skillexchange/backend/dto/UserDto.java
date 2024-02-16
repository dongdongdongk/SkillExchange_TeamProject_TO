package place.skillexchange.backend.dto;

import lombok.*;
import place.skillexchange.backend.entity.User;

public class UserDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class RegisterRequest {
        private String id;
        private String email;
        private String password;
        private String passwordCheck;

        /* Dto -> Entity */
        //toEntity는 패스워드 확인 일치하면 사용
        public User toEntity() {
            User user = User.builder()
                    .id(id)
                    .email(email)
                    .password(password)
                    .build();
            return user;
        }
    }

    @Getter
    public static class RegisterResponse {
        private String id;
        private String email;

        /* Entity -> Dto */
        public RegisterResponse(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
        }
    }
}
