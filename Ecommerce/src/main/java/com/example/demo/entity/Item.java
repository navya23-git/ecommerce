package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "items", uniqueConstraints = {@UniqueConstraint(columnNames = {"name"})})
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is mandatory")
    @Size(min = 3, max = 100, message = "Name must be 3-100 characters")
    @Pattern(regexp = ".*[a-zA-Z].*", message = "Name must contain letters")
    private String name;  // numbers allowed

    @NotBlank(message = "Name is mandatory")
    @Size(min = 3, max = 100, message = "Name must be 3-100 characters")
    @Pattern(regexp = ".*[a-zA-Z].*", message = "Name must contain letters")
    private String description;  // numbers allowed

    @Positive(message = "Price must be greater than 0")
    @Max(value = 10000, message = "Price cannot exceed 10,000")
    private double price;

    @NotBlank(message = "Name is mandatory")
    @Size(min = 3, max = 100, message = "Name must be 3-100 characters")
    @Pattern(regexp = ".*[a-zA-Z].*", message = "Name must contain letters")
    private String category;  // flexible, frontend can change

    // Constructors
    public Item() {}

    public Item(Long id, String name, String description, double price, String category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    @Override
    public String toString() {
        return "Item [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price + ", category=" + category + "]";
    }
}


