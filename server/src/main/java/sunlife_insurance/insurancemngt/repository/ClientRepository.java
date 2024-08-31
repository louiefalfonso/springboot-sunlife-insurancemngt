package sunlife_insurance.insurancemngt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sunlife_insurance.insurancemngt.entity.Client;

import java.util.Optional;

public interface ClientRepository extends JpaRepository <Client, Long> {

    Optional <Client> findAllById (Long ClientId);

}
