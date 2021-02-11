package io.fulchr3356.todo.controllers;

import io.fulchr3356.todo.Models.TodoItem;
import io.fulchr3356.todo.Models.User;
import io.fulchr3356.todo.repositories.TodoItemRepository;
import io.fulchr3356.todo.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class TodoItemController {
    private final TodoItemRepository todoItemRepository;
    private final Logger log = LoggerFactory.getLogger(TodoItemController.class);

    public TodoItemController(TodoItemRepository todoItemRepository) {
        this.todoItemRepository = todoItemRepository;
    }

    @PostMapping (value = "/item/{id}")
    public ResponseEntity<TodoItem> add(@Valid @RequestBody TodoItem item){
        log.info("Attempt to add item : " + item);
        todoItemRepository.save(item);
        return ResponseEntity.status(HttpStatus.OK)
                .body(item);
    }
}

