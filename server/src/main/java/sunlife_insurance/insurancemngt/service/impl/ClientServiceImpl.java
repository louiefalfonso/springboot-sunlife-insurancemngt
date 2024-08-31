package sunlife_insurance.insurancemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import sunlife_insurance.insurancemngt.dto.ClientDto;
import sunlife_insurance.insurancemngt.entity.Client;
import sunlife_insurance.insurancemngt.repository.ClientRepository;
import sunlife_insurance.insurancemngt.service.ClientService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService {

    private ClientRepository clientRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Client
    @Override
    public ClientDto createClient(ClientDto clientDto) {
        Client client = modelMapper.map(clientDto, Client.class);
        Client savedClient = clientRepository.save(client);
        return modelMapper.map(savedClient, ClientDto.class);
    }

    // REST API - Get All Clients
    @Override
    public List<ClientDto> getAllClients() {
        List<Client> clients = clientRepository.findAll();
        return clients.stream().map((client)->modelMapper.map(client, ClientDto.class))
                .collect(Collectors.toList());
    }

    // REST API - Get Client By Id
    @Override
    public ClientDto getClientById(Long clientId) {
        Client client = clientRepository.findAllById(clientId)
                .orElseThrow(()-> new RuntimeException("Client doesn't exist with a given Id:" + clientId));
        return modelMapper.map(client, ClientDto.class);
    }

    // REST API - Update Client
    @Override
    public ClientDto updateClient(Long clientId, ClientDto updateClient) {
        Client client = clientRepository.findAllById(clientId)
                .orElseThrow(()-> new RuntimeException("Client doesn't exist with a given Id:" + clientId));

        client.setFirstName(updateClient.getFirstName());
        client.setLastName(updateClient.getLastName());
        client.setAddress(updateClient.getAddress());
        client.setDateOfBirth(updateClient.getDateOfBirth());
        client.setPhoneNumber(updateClient.getPhoneNumber());
        client.setPassword(updateClient.getPassword());
        client.setNotes(updateClient.getNotes());

        Client updateClientObj = clientRepository.save(client);
        return modelMapper.map(updateClientObj, ClientDto.class);
    }

    // REST API - Delete Client
    @Override
    public void deleteClient(Long clientId) {
        Client client = clientRepository.findAllById(clientId).orElseThrow(
                ()-> new RuntimeException("Client doesn't exist with given id:" + clientId));
        clientRepository.deleteById(clientId);
    }
}
