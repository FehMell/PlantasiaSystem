package com.plantasia.plantasiasystem.service;

import com.plantasia.plantasiasystem.dto.TrefleData;
import com.plantasia.plantasiasystem.dto.TrefleResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Service
public class TrefleIntegrationService {
    private final WebClient webClient;

    @Value("${trefle.api.token}")
    private String token;

    public TrefleIntegrationService(WebClient.Builder builder, @Value("${trefle.api.url}") String url) {
        this.webClient = builder.baseUrl(url).build();
    }

    public Optional<TrefleData> searchForPlant(String name) {
        TrefleResponse response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("token", token)
                        .queryParam("q", name)
                        .build())
                .retrieve()
                .bodyToMono(TrefleResponse.class)
                .block();

        if (response != null && response.getData() != null && !response.getData().isEmpty()) {
            return Optional.of(response.getData().get(0));
        }
        return Optional.empty();
    }
}
