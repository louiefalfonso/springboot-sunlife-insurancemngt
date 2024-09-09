package sunlife_insurance.insurancemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sunlife_insurance.insurancemngt.dto.LoanDto;
import sunlife_insurance.insurancemngt.entity.Loan;
import sunlife_insurance.insurancemngt.repository.LoanRepository;
import sunlife_insurance.insurancemngt.service.LoanService;

@Service
@AllArgsConstructor
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private LoanService loanService;

    @Autowired
    private ModelMapper modelMapper;

    // REST API - Create New Loan
    @Override
    public LoanDto createNewLoan(LoanDto loanDto) {
        Loan loan = modelMapper.map(loanDto, Loan.class);
        Loan savedLoan = loanRepository.save(loan);
        return  modelMapper.map(savedLoan, LoanDto.class);
    }
}
