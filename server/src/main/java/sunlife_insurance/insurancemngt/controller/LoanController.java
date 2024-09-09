package sunlife_insurance.insurancemngt.controller;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sunlife_insurance.insurancemngt.dto.LoanDto;
import sunlife_insurance.insurancemngt.repository.LoanRepository;
import sunlife_insurance.insurancemngt.service.LoanService;

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

}
