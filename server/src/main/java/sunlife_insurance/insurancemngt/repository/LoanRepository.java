package sunlife_insurance.insurancemngt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sunlife_insurance.insurancemngt.entity.Loan;

import java.util.Optional;

public interface LoanRepository extends JpaRepository<Loan, Long> {
     Optional<Loan> findAllById (Long LoanId);

}
