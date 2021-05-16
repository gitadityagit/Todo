package com.example.rest.webservices.restfulwebservices.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.*;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TodoJpaResource {
	
	@Autowired
	private TodoHardcodedService todoService;
	
	@Autowired
	private TodoJpaRepository todoJpaRepository;

	@GetMapping("/jpa/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username){
		return todoJpaRepository.findByUsername(username);
//		return todoService.findAll();
	}
	
//	@GetMapping("/users/{username}/todos/{id}")
//	public Todo getTodo(@PathVariable String username,@PathVariable long id){
//		Todo todo=todoService.findById(id);
//		return todo;
//	}
	
	@GetMapping("/jpa/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username,@PathVariable long id){
		
		return todoJpaRepository.findById(id).get();
//		Todo todo=todoService.findById(id);
//		if(todo!=null) {
////			return ResponseEntity.noContent().build();
//			return ResponseEntity.ok(todo);
//		}else {
//			return ResponseEntity.notFound().build();
//		}
	}
	
	@DeleteMapping("/jpa/users/{username}/todos/{id}")
	public void deleteTodo(@PathVariable String username,@PathVariable long id){
		todoJpaRepository.deleteById(id);
//		System.out.println("delete todo");
//		Todo todo=todoService.deleteById(id);
//		if(todo!=null) {
////			return ResponseEntity.noContent().build();
//			return ResponseEntity.ok(todo);
//		}else {
//			return ResponseEntity.notFound().build();
//		}
	}
	
	@PutMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username,
								@PathVariable long id,@RequestBody Todo todo){
		todo.setUsername(username);
		Todo todoUpdated=todoJpaRepository.save(todo);
		return new ResponseEntity<Todo>(todo,HttpStatus.OK);
	}	
	
	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Todo> createTodo(@PathVariable String username,
											@RequestBody Todo todo){
//		Todo createdTodo=todoService.create(todo);
		todo.setUsername(username);
		Todo createdTodo=todoJpaRepository.save(todo);
		
		
		java.net.URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
					.path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	
}
