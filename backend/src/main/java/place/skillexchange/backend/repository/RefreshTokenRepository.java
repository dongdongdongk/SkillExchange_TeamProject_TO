package place.skillexchange.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import place.skillexchange.backend.entity.RefreshToken;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {

    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
