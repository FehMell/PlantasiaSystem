package com.plantasia.plantasiasystem.models;
import lombok.Data;
 
import java.util.List;
 
@Data
public class User {
 
    private String name;
    private String email;
    private List<Plant> plants;
}
 