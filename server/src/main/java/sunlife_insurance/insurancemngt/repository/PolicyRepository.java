package sunlife_insurance.insurancemngt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sunlife_insurance.insurancemngt.entity.Policy;

import java.util.Optional;

public interface PolicyRepository extends JpaRepository<Policy, Long> {

    Optional <Policy> findAllById (Long InsurancePolicyId);
}
