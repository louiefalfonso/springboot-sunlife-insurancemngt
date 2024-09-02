package sunlife_insurance.insurancemngt.service;

import sunlife_insurance.insurancemngt.dto.PolicyDto;
import sunlife_insurance.insurancemngt.entity.Policy;

import java.util.List;

public interface PolicyService {

    PolicyDto createNewPolicy(PolicyDto policyDto);

    List<PolicyDto> getAllPolicies();

    PolicyDto getPolicyById (Long policyId);

    PolicyDto updatePolicy (Long policyId, PolicyDto updatePolicy);

    List<Policy> getAllClaimsByPolicy(Long policyId);

    void deletePolicy(Long policyId);

}
