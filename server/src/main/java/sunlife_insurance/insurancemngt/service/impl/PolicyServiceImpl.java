package sunlife_insurance.insurancemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sunlife_insurance.insurancemngt.dto.PolicyDto;
import sunlife_insurance.insurancemngt.entity.Client;
import sunlife_insurance.insurancemngt.entity.Policy;
import sunlife_insurance.insurancemngt.repository.PolicyRepository;
import sunlife_insurance.insurancemngt.service.ClientService;
import sunlife_insurance.insurancemngt.service.PolicyService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PolicyServiceImpl implements PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private ClientService clientService;

    @Autowired
    private ModelMapper modelMapper;

    // REST API - Create New Policy
    @Override
    public PolicyDto createNewPolicy(Long clientId, PolicyDto policyDto) {
        Client client = modelMapper.map(clientService.getClientById(clientId), Client.class);
        Policy policy = modelMapper.map(policyDto, Policy.class);
        policy.setClient(client);

        Policy savedPolicy = policyRepository.save(policy);
        return modelMapper.map(savedPolicy, PolicyDto.class);

    }

    // REST API - Get All Policies
    @Override
    public List<PolicyDto> getAllPolicies() {
        List<Policy> policies = policyRepository.findAll();
        return policies.stream().map((policy)->modelMapper.map(policy, PolicyDto.class))
                .collect(Collectors.toList());
    }


    // REST API - Get Policy By Id
    @Override
    public PolicyDto getPolicyById(Long policyId) {
        Policy policy = policyRepository.findAllById(policyId)
                .orElseThrow(()-> new RuntimeException("Policy doesn't exist with a given Id:" + policyId));
        return modelMapper.map(policy, PolicyDto.class);
    }

    // REST API - Update Policy
    @Override
    public PolicyDto updatePolicy(Long policyId, PolicyDto updatePolicy) {
        Policy policy = policyRepository.findAllById(policyId)
                .orElseThrow(()-> new RuntimeException("Policy doesn't exist with a given Id:" + policyId));

        policy.setPolicyNumber(updatePolicy.getPolicyNumber());
        policy.setPolicyType(updatePolicy.getPolicyType());
        policy.setCoverageAmount(updatePolicy.getCoverageAmount());
        policy.setPremium(updatePolicy.getPremium());
        policy.setStartDate(updatePolicy.getStartDate());
        policy.setEndDate(updatePolicy.getEndDate());
        policy.setClient(updatePolicy.getClient());

        Policy updatePolicyObj = policyRepository.save(policy);
        return modelMapper.map(updatePolicyObj, PolicyDto.class);
    }


    // REST API - Get All Claims By Policy
    @Override
    public List<Policy> getAllClaimsByPolicy(Long policyId) {
        policyRepository.findAllById(policyId).orElseThrow(()-> new RuntimeException((String) null));
        return null;
    }


    // REST API - Delete Policy
    @Override
    public void deletePolicy(Long policyId) {
        Policy policy = policyRepository.findAllById(policyId)
                .orElseThrow(()-> new RuntimeException("Policy doesn't exist with given id:" + policyId));
        policyRepository.deleteById(policyId);

    }

}
