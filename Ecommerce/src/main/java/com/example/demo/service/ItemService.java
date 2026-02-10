package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Item;
import com.example.demo.repo.ItemRepository;


@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public Item addItem(Item item) {
        if(itemRepository.existsByName(item.getName())) {
            throw new RuntimeException("Item name already exists");
        }
        return itemRepository.save(item);
    }

    public Item updateItem(Long id, Item updated) {
        return itemRepository.findById(id).map(item -> {
            if(!item.getName().equals(updated.getName()) && itemRepository.existsByName(updated.getName())) {
                throw new RuntimeException("Item name already exists");
            }
            item.setName(updated.getName());
            item.setDescription(updated.getDescription());
            item.setPrice(updated.getPrice());
            item.setCategory(updated.getCategory());
            return itemRepository.save(item);
        }).orElse(null);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item getItemById(Long id) {
        return itemRepository.findById(id).orElse(null);
    }

    public boolean deleteItem(Long id) {
        if(itemRepository.existsById(id)) {
            itemRepository.deleteById(id);
            return true;
        }
        return false;
    }
}




