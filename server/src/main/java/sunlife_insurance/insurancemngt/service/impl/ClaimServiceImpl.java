package sunlife_insurance.insurancemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import sunlife_insurance.insurancemngt.dto.ClaimDto;
import sunlife_insurance.insurancemngt.entity.Claim;
import sunlife_insurance.insurancemngt.repository.ClaimRepository;
import sunlife_insurance.insurancemngt.service.ClaimService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClaimServiceImpl implements ClaimService {

    private ClaimRepository claimRepository;
    private ModelMapper modelMapper;


    // REST API - Create New Claim
    @Override
    public ClaimDto createClaim(ClaimDto claimDto) {
        Claim claim = modelMapper.map(claimDto, Claim.class);
        Claim savedClaim = claimRepository.save(claim);
        return modelMapper.map(savedClaim, ClaimDto.class);
    }

    // REST API - Get All Claims
    @Override
    public List<ClaimDto> getAllClaims() {
        List<Claim> claims = claimRepository.findAll();
        return  claims.stream().map((claim)-> modelMapper.map(claim, ClaimDto.class))
                .collect(Collectors.toList());
    }

    // REST API - Get Claim By Id
    @Override
    public ClaimDto getClaimById(Long claimId) {
       Claim claim = claimRepository.findAllById(claimId)
               .orElseThrow(()->new RuntimeException("Claim doesn't exist with a given Id:" + claimId));
       return modelMapper.map(claim, ClaimDto.class);

    }


    // REST API - Update Claim
    @Override
    public ClaimDto updateClaim(Long claimId, ClaimDto updateClaim) {
        Claim claim = claimRepository.findAllById(claimId)
                .orElseThrow(()-> new RuntimeException("Client doesn't exist with a given Id:" + claimId));

        claim.setClaimNumber(updateClaim.getClaimNumber());
        claim.setClaimDate(updateClaim.getClaimDate());
        claim.setClaimStatus(updateClaim.getClaimStatus());
        claim.setDescription(updateClaim.getDescription());
        claim.setPolicy(updateClaim.getPolicy());

        Claim updateClaimObj = claimRepository.save(claim);
        return modelMapper.map(updateClaimObj, ClaimDto.class);
    }

    // REST API - Delete Claim
    @Override
    public void deleteClaim(Long claimId) {
        Claim claim = claimRepository.findAllById(claimId)
                .orElseThrow(()-> new RuntimeException("Claim doesn't exist with given id:" + claimId));
        claimRepository.deleteById(claimId);
    }


}
