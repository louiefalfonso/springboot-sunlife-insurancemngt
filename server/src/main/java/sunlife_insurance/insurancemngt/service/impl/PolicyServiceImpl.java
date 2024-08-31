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

@Service
@AllArgsConstructor
public class PolicyServiceImpl implements PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private ClientService clientService;

    @Autowired
    private ModelMapper modelMapper;


    /*

    @Override
	public InsurancePolicyDto createNewInsurancePolicy(Integer clientId, InsurancePolicyDto insurancePolicy) {
		Client client = modelMapper.map(clientService.findById(clientId), Client.class);
		InsurancePolicy policy = modelMapper.map(insurancePolicy, InsurancePolicy.class);
		policy.setClient(client);
		InsurancePolicy savedPolicy = insurancePolicyRepository.save(policy);
		return modelMapper.map(savedPolicy, InsurancePolicyDto.class);
	}
     */
}
