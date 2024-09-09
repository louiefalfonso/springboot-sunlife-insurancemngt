package sunlife_insurance.insurancemngt.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "loans")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "loanNumber")
    private String loanNumber;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    @Column(name = "loanDate")
    private LocalDate loanDate;

    @Column(name = "loanStatus")
    private String loanStatus;

    @Column(name = "loanAmount")
    private String loanAmount;

    @Column(name = "loanReason")
    private String loanReason;

    @Column(name = "reasonOthers")
    private String reasonOthers;

    @Column(name = "loanGrossValue")
    private String loanGrossValue;

    @Column(name = "businessAddress")
    private String businessAddress;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private Client client;

}
