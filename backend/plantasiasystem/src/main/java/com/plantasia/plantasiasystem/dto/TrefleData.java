package com.plantasia.plantasiasystem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TrefleData {
    @JsonProperty("common_name")
    private String commonName;

    @JsonProperty("scientific_name")
    private String scientificName;

    @JsonProperty("image_url")
    private String imageUrl;

    private String family;
}
