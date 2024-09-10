package sunlife_insurance.insurancemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sunlife_insurance.insurancemngt.dto.LoanDto;
import sunlife_insurance.insurancemngt.entity.Client;
import sunlife_insurance.insurancemngt.entity.Loan;
import sunlife_insurance.insurancemngt.repository.LoanRepository;
import sunlife_insurance.insurancemngt.service.ClientService;
import sunlife_insurance.insurancemngt.service.LoanService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private ClientService clientService;

    @Autowired
    private ModelMapper modelMapper;

    // REST API - Create New Loan
    @Override
    public LoanDto createNewLoan(LoanDto loanDto) {
        Loan loan = modelMapper.map(loanDto, Loan.class);
        Loan savedLoan = loanRepository.save(loan);
        return  modelMapper.map(savedLoan, LoanDto.class);
    }

    // REST API - Get All Loans
    @Override
    public List<LoanDto> getAllLoans() {
        List<Loan> loans = loanRepository.findAll();
        return loans.stream().map((loan)->modelMapper.map(loan, LoanDto.class))
                .collect(Collectors.toList());
    }

    // REST API - Get Loan By Id
    @Override
    public LoanDto getLoanById(Long loanId) {
        Loan loan = loanRepository.findAllById(loanId)
                .orElseThrow(()-> new RuntimeException("Loan doesn't exist with a given Id:" + loanId));
        return modelMapper.map(loan, LoanDto.class);
    }


    // REST API - Update Loan
    @Override
    public LoanDto updateLoan(Long loadId, LoanDto updateLoan) {
        Loan loan = loanRepository.findAllById(loadId)
                .orElseThrow(()-> new RuntimeException("Loan doesn't exist with a given Id:" + loadId));

        loan.setLoanNumber(updateLoan.getLoanNumber());
        loan.setLoanDate(updateLoan.getLoanDate());
        loan.setLoanStatus(updateLoan.getLoanStatus());
        loan.setLoanAmount(updateLoan.getLoanAmount());
        loan.setLoanReason(updateLoan.getLoanReason());
        loan.setReasonOthers(updateLoan.getReasonOthers());
        loan.setLoanGrossValue(updateLoan.getLoanGrossValue());
        loan.setBusinessAddress(updateLoan.getBusinessAddress());
        loan.setClient(modelMapper.map(updateLoan.getClient(), Client.class));

        Loan updateLoanObj = loanRepository.save(loan);
        return modelMapper.map(updateLoanObj, LoanDto.class);
    }

    // REST API - Delete Loan
    @Override
    public void deleteLoan(Long loanId) {
        Loan loan  = loanRepository.findAllById(loanId)
                .orElseThrow(()-> new RuntimeException("Loan doesn't exist with given id:" + loanId));
        loanRepository.deleteById(loanId);

    }

}
