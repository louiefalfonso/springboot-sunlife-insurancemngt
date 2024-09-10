package sunlife_insurance.insurancemngt.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sunlife_insurance.insurancemngt.dto.PolicyDto;
import sunlife_insurance.insurancemngt.entity.Policy;
import sunlife_insurance.insurancemngt.repository.PolicyRepository;
import sunlife_insurance.insurancemngt.service.PolicyService;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/policies")
public class PolicyController {

    @Autowired
    private PolicyRepository policyRepository;
    private PolicyService policyService;


    //POST New Policy REST API
    @PostMapping
   public ResponseEntity<PolicyDto> createPolicy(@RequestBody PolicyDto policyDto){
       PolicyDto savedPolicy = policyService.createNewPolicy(policyDto);
       return new ResponseEntity<>(savedPolicy, HttpStatus.CREATED);
   }


    //GET All Policies REST API
    @GetMapping
    public ResponseEntity<List<PolicyDto>> getAllPolicies(){
        List<PolicyDto> policy = policyService.getAllPolicies();
        return ResponseEntity.ok(policy);
    }


    //GET Policy By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Policy> getPolicyById(@PathVariable("id") long id){
        Policy policy = policyRepository.findAllById(id)
                .orElseThrow(()->new RuntimeException("Policy does not exist with Id:" + id));
        return ResponseEntity.ok(policy);
    }

    //UPDATE Policy REST API
    @PutMapping("{id}")
    public ResponseEntity<Policy> updatePolicy (@PathVariable("id") long id,
                                                @RequestBody Policy policyDetails){
        Policy updatePolicy = policyRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Policy does not exist with id: " + id));

        updatePolicy.setPolicyNumber(policyDetails.getPolicyNumber());
        updatePolicy.setPolicyType(policyDetails.getPolicyType());
        updatePolicy.setCoverageAmount(policyDetails.getCoverageAmount());
        updatePolicy.setPremium(policyDetails.getPremium());
        updatePolicy.setStartDate(policyDetails.getStartDate());
        updatePolicy.setEndDate(policyDetails.getEndDate());
        updatePolicy.setClient(policyDetails.getClient());

        policyRepository.save(updatePolicy);
        return ResponseEntity.ok(updatePolicy);

    }

    //DELETE Policy REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePolicy(@PathVariable("id") Long policyId){
        policyService.deletePolicy(policyId);
        return ResponseEntity.ok("Policy Deleted Successfully");
    }

    @GetMapping("/")
    public ResponseEntity<List<PolicyDto>> getAllClaimsByPolicy(){
        return new ResponseEntity<>(policyService.getAllPolicies(), HttpStatus.OK);
    }

}
