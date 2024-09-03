package sunlife_insurance.insurancemngt.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sunlife_insurance.insurancemngt.entity.User;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findByEmail(String email);
}
