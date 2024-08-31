package sunlife_insurance.insurancemngt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sunlife_insurance.insurancemngt.entity.Claim;

import java.util.Optional;

public interface ClaimRepository extends JpaRepository<Claim, Long> {

    Optional<Claim> findAllById (Long ClaimId);

}
