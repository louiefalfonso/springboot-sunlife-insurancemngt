package sunlife_insurance.insurancemngt.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sunlife_insurance.insurancemngt.dto.ClaimDto;
import sunlife_insurance.insurancemngt.entity.Claim;
import sunlife_insurance.insurancemngt.repository.ClaimRepository;
import sunlife_insurance.insurancemngt.service.ClaimService;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/claims")
public class ClaimController {

    @Autowired
    private ClaimRepository claimRepository;
    private ClaimService claimService;

    //POST Create New Claim REST API
    @PostMapping
    public ResponseEntity<ClaimDto> createClaim(@RequestBody ClaimDto claimDto){
        ClaimDto savedClaim = claimService.createClaim(claimDto);
        return new ResponseEntity<>(savedClaim, HttpStatus.CREATED);
    }

    //GET Claim By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Claim> getClaimById(@PathVariable("id") long id){
        Claim claim = claimRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Claim does not exist with Id:" + id));
        return ResponseEntity.ok(claim);
    }

    //GET All Claims REST API
    @GetMapping
    public ResponseEntity<List<ClaimDto>> getAllClaims(){
        List<ClaimDto> claim = claimService.getAllClaims();
        return ResponseEntity.ok(claim);
    }

    //UPDATE Claim REST API
    @PutMapping("{id}")
    public ResponseEntity<Claim> updateClaim(@PathVariable("id") long id,
                                             @RequestBody Claim claimDetails){

        Claim updateClaim = claimRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Claim does not exist with id: " + id));

        updateClaim.setClaimStatus(claimDetails.getClaimStatus());
        updateClaim.setClaimDate(claimDetails.getClaimDate());
        updateClaim.setClaimNumber(claimDetails.getClaimNumber());
        updateClaim.setDescription(claimDetails.getDescription());
        updateClaim.setPolicy(claimDetails.getPolicy());

        claimRepository.save(updateClaim);
        return ResponseEntity.ok(updateClaim);

    }

    //DELETE Claim REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteClaim (@PathVariable("id") Long claimId){
        claimService.deleteClaim(claimId);
        return ResponseEntity.ok("Claim Deleted Successfully");
    }


}
