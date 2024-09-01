package sunlife_insurance.insurancemngt.service;

import sunlife_insurance.insurancemngt.dto.ClaimDto;

import java.util.List;

public interface ClaimService {

    ClaimDto createClaim (ClaimDto claimDto);

    List<ClaimDto> getAllClaims();

    ClaimDto getClaimById(Long claimId);

    ClaimDto updateClaim(Long claimId, ClaimDto updateClient);

    void  deleteClaim(Long claimId);




}
