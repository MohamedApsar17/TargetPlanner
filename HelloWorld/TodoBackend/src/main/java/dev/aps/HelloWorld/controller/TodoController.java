package dev.aps.HelloWorld.controller;

import dev.aps.HelloWorld.service.TodoService;
import dev.aps.HelloWorld.models.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;

    // GET all todos
    @GetMapping
    public ResponseEntity<List<Todo>> getTodos() {
        return ResponseEntity.ok(todoService.getTodos());
    }

    // GET todo by id
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable long id) {
        return ResponseEntity.ok(todoService.getTodoById(id));
    }

    // CREATE todo
    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        System.out.println("CREATE TODO HIT 👉 " + todo);
        return new ResponseEntity<>(todoService.createTodo(todo), HttpStatus.CREATED);
    }

    // UPDATE todo
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(
            @PathVariable long id,
            @RequestBody Todo todo) {
        todo.setId(id);
        return ResponseEntity.ok(todoService.updateTodo(todo));
    }

    // DELETE todo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable long id) {
        todoService.deleteTodoById(id);
        return ResponseEntity.noContent().build();
    }
}

