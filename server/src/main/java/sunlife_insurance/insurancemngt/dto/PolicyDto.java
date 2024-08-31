package sunlife_insurance.insurancemngt.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sunlife_insurance.insurancemngt.entity.Client;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PolicyDto {

    private Integer id;
    private String policyNumber;
    private String policyType;
    private BigDecimal coverageAmount;
    private BigDecimal premium;
    private LocalDate startDate;
    private LocalDate endDate;
    private Client client;
    private Set<ClaimDto> claims = new HashSet<>();
}
