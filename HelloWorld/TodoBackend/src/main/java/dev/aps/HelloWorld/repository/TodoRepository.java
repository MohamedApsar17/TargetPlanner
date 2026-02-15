package dev.aps.HelloWorld.repository;

import dev.aps.HelloWorld.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo,Long> {
}
