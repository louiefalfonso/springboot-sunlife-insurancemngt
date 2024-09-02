package sunlife_insurance.insurancemngt;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

//Exclude UserDetailsServiceAutoConfiguration.class temporarily
@SpringBootApplication
public class InsurancemngtApplication {

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

	public static void main(String[] args) {
		SpringApplication.run(InsurancemngtApplication.class, args);
	}

}
