package sunlife_insurance.insurancemngt.service;

import sunlife_insurance.insurancemngt.dto.ClientDto;

import java.util.List;

public interface ClientService {

    ClientDto createClient(ClientDto clientDto);

    List<ClientDto> getAllClients();

    ClientDto getClientById(Long clientId);

    ClientDto updateClient(Long clientId, ClientDto updateClient);

    void deleteClient(Long clientId);

    ClientDto findById(Long clientId);
}
