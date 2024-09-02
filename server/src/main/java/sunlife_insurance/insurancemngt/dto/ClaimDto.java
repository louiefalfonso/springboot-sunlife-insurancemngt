package sunlife_insurance.insurancemngt.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sunlife_insurance.insurancemngt.entity.Policy;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaimDto {

    private Long id;

    private String claimNumber;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private LocalDate claimDate;

    private String claimStatus;

    private String claimAmount;

    private String description;

    private Policy policy;

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

    public Policy getPolicy() {
        return policy;
    }

    public String getClaimAmount(){ return  claimAmount;}
}
