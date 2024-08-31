package sunlife_insurance.insurancemngt.dto;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sunlife_insurance.insurancemngt.entity.InsurancePolicy;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaimDto {

    private Long id;
    private String claimNumber;
    private LocalDate claimDate;
    private String claimStatus;
    private String description;
    private InsurancePolicy policy;

    public String getClaimNumber() {
        return claimNumber;
    }

    public LocalDate getClaimDate() {
        return claimDate;
    }

    public String getClaimStatus() {
        return claimStatus;
    }

    public String getDescription() {
        return description;
    }

    public InsurancePolicy getPolicy() {
        return policy;
    }
}
