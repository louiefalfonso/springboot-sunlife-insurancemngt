package sunlife_insurance.insurancemngt.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sunlife_insurance.insurancemngt.dto.ClientDto;
import sunlife_insurance.insurancemngt.entity.Client;
import sunlife_insurance.insurancemngt.repository.ClientRepository;
import sunlife_insurance.insurancemngt.service.ClientService;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;
    private ClientService clientService;

    //POST New Client REST API
    @PostMapping
    public ResponseEntity<ClientDto> createClient(@RequestBody ClientDto clientDto){
        ClientDto savedClient = clientService.createClient(clientDto);
        return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    }

    //GET All Clients REST API
    @GetMapping
    public ResponseEntity<List<ClientDto>> getAllClients(){
        List<ClientDto> client = clientService.getAllClients();
        return ResponseEntity.ok(client);
    }


    //GET Client By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Client> getClientById(@PathVariable("id") long id){
        Client client = clientRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Client does not exist with Id:" + id));
        return ResponseEntity.ok(client);
    }


    //UPDATE Client REST API
    @PutMapping("{id}")
    public ResponseEntity<Client> updateClient (@PathVariable ("id")  long id,
                                                @RequestBody Client clientDetails){
        Client updateClient = clientRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Client does not exist with id: " + id));

        updateClient.setFirstName(clientDetails.getFirstName());
        updateClient.setLastName(clientDetails.getFirstName());
        updateClient.setDateOfBirth(clientDetails.getDateOfBirth());
        updateClient.setPhoneNumber(clientDetails.getPhoneNumber());
        updateClient.setAddress(clientDetails.getAddress());
        updateClient.setNotes(clientDetails.getNotes());
        updateClient.setPassword(clientDetails.getPassword());

        clientRepository.save(updateClient);
        return ResponseEntity.ok(updateClient);
    }

    //DELETE Client REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteClient (@PathVariable("id") Long clientId){
        clientService.deleteClient(clientId);
        return ResponseEntity.ok("Client Deleted Successfully");
    }
}
