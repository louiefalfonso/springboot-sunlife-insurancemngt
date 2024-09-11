package sunlife_insurance.insurancemngt.service;

import sunlife_insurance.insurancemngt.dto.LoanDto;

import java.util.List;

public interface LoanService {

    LoanDto createNewLoan(LoanDto loanDto);

    List<LoanDto> getAllLoans();

    LoanDto getLoanById(Long loanId);

    LoanDto updateLoan(Long loadId, LoanDto updateLoan);

    void deleteLoan(Long loanId);

}
