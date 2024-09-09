package sunlife_insurance.insurancemngt.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanDto {

    private Integer id;

    private String loanNumber;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private LocalDate loanDate;

    private String loanStatus;

    private String loanAmount;

    private String loanReason;

    private String reasonOthers;

    private String loanGrossValue;

    private String businessAddress;

    private ClientDto client;


}
