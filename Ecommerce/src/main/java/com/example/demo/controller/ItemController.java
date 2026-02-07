package com.example.demo.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Item;
import com.example.demo.service.ItemService;

import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    // Constructor injection
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // 1. Add a new item
    @PostMapping("/add")
    public ResponseEntity<?> addItem(@RequestBody Item item) {
        // Input validation
        if (item.getName() == null || item.getName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item name is required");
        }
        if (item.getDescription() == null || item.getDescription().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item description is required");
        }
        if (item.getPrice() < 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item price cannot be negative");
        }

        Item newItem = itemService.addItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(newItem);
    }

    // 2. Get a single item by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getItemById(@PathVariable Long id) {
        Optional<Item> item = itemService.getItemById(id);
        return item
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Item with ID " + id + " not found"));
    }

    // Optional: Get all items
    @GetMapping("/all")
    public ResponseEntity<?> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }
}

