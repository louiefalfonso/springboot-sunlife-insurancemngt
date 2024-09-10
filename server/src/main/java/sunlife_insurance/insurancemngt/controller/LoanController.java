package sunlife_insurance.insurancemngt.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sunlife_insurance.insurancemngt.dto.LoanDto;
import sunlife_insurance.insurancemngt.entity.Loan;
import sunlife_insurance.insurancemngt.repository.LoanRepository;
import sunlife_insurance.insurancemngt.service.LoanService;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/loans")
public class LoanController {

    @Autowired
    private LoanRepository loanRepository;
    private LoanService loanService;

    //POST Create New Loan REST API
    @PostMapping
    public ResponseEntity<LoanDto> createNewLoan(@RequestBody LoanDto loanDto){
        LoanDto savedLoan = loanService.createNewLoan(loanDto);
        return new ResponseEntity<>(savedLoan, HttpStatus.CREATED);
    }


    //GET All Loans REST API
    @GetMapping
    public ResponseEntity<List<LoanDto>> getAllLoans(){
        List<LoanDto> loan = loanService.getAllLoans();
        return ResponseEntity.ok(loan);
    }

    //GET Loan By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Loan>  getLoanById(@PathVariable("id") long id){
        Loan loan = loanRepository.findAllById(id)
                .orElseThrow(()->new RuntimeException("Loan does not exist with Id:" + id));
        return ResponseEntity.ok(loan);
    }

    //DELETE Loan REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteLoan(@PathVariable("id") Long loanId){
        loanService.deleteLoan(loanId);
        return ResponseEntity.ok("Loan Deleted Successfully");
    }


    //UPDATE Loan REST API
    @PutMapping("{id}")
    public ResponseEntity<Loan> updateLoan(@PathVariable("id") long id,
                                           @RequestBody Loan loanDetails){
        Loan updateLoan = loanRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Loan does not exist with id: " + id));

        updateLoan.setLoanNumber(loanDetails.getLoanNumber());
        updateLoan.setLoanDate(loanDetails.getLoanDate());
        updateLoan.setLoanStatus(loanDetails.getLoanStatus());
        updateLoan.setLoanAmount(loanDetails.getLoanAmount());
        updateLoan.setLoanReason(loanDetails.getLoanReason());
        updateLoan.setReasonOthers(loanDetails.getReasonOthers());
        updateLoan.setLoanGrossValue(loanDetails.getLoanGrossValue());
        updateLoan.setBusinessAddress(loanDetails.getBusinessAddress());
        updateLoan.setClient(loanDetails.getClient());

        loanRepository.save(updateLoan);
        return ResponseEntity.ok(updateLoan);
    }


}
