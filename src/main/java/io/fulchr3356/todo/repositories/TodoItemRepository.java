package io.fulchr3356.todo.repositories;

import io.fulchr3356.todo.Models.TodoItem;
import io.fulchr3356.todo.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {

}
