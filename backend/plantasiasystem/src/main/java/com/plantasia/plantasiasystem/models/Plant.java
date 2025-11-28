package com.plantasia.plantasiasystem.models;

import jakarta.persistence.Entity;
 
import lombok.Data;
 
@Entity
@Data
public class Plant {
 
    private String plantNickname;
 
    private String commonName;
    private String scientificName;
    private String family;
    private String imageUrl;
    private User user;
}
 