package com.example.demo.service;



import org.springframework.stereotype.Service;

import com.example.demo.entity.Item;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    // In-memory storage
    private final List<Item> items = new ArrayList<>();
    private Long nextId = 1L; // Auto-increment id

    // Add a new item
    public Item addItem(Item item) {
        item.setId(nextId++);
        items.add(item);
        return item;
    }

    // Get a single item by ID
    public Optional<Item> getItemById(Long id) {
        return items.stream()
                .filter(item -> item.getId().equals(id))
                .findFirst();
    }

    // Optional: Get all items
    public List<Item> getAllItems() {
        return items;
    }
}
