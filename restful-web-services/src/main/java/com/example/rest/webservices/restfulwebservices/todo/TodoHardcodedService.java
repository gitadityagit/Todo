package com.example.rest.webservices.restfulwebservices.todo;

import java.util.*;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;


@Service
public class TodoHardcodedService {

	private static List<Todo> todos = new ArrayList<>();
	private static long idCounter = 0;

	static {
		todos.add(new Todo(++idCounter, "in28minutes", "Learn to Dance 2", new Date(), false));
		todos.add(new Todo(++idCounter, "in28minutes", "Learn about Microservices 2", new Date(), false));
		todos.add(new Todo(++idCounter, "in28minutes", "Learn about Angular", new Date(), false));
	}

	public List<Todo> findAll() {
		return todos;
	}
	
	public Todo save(Todo todo) {
		if(todo.getId()==-1 || todo.getId()==0) {
			todo.setId(++idCounter);
			todos.add(todo);
		} else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
	
	public Todo create(Todo todo) {
			todo.setId(++idCounter);
			todos.add(todo);
		
		return todo;
	}

	public Todo deleteById(long id) {
		Todo todo = findById(id);

		if (todo == null)
			return null;

		if (todos.remove(todo)) {
			return todo;
		}

		return null;
	}

	public Todo findById(long id) {
		for (Todo todo : todos) {
			if (todo.getId() == id) {
				return todo;
			}
		}

		return null;
	}
}


//@Service
//public class TodoHardcodedService {
//	
//	private static List<Todo> todos=new ArrayList<>();
//	private static long idCounter=0;
//	
//	static {
//		todos.add(new Todo(++idCounter,"aditya","learn react.js",new Date(),false));
//		todos.add(new Todo(++idCounter,"aditya","learn spring",new Date(),false));
//		todos.add(new Todo(++idCounter,"aditya","learn javascript",new Date(),false));
//	}
//	
//	public List<Todo> findAll(){
//		return todos;
//	}
//	
//	public Todo save(Todo todo) {
//		if(todo.getId()==-1|| todo.getId()==0) {
////		if(!todos.contains(todo)) {
//			todo.setId(++idCounter);
//			todos.add(todo);
//		}else {
//			deleteById(todo.getId());
//			todos.add(todo);
//		}
//		return todo;
//	}
//	
//	public Todo deleteById(Long id) {
//		System.out.println("deleteById");
//		Todo todo=findById(id);
//		if(todo==null) return null;
//		todos.remove(todo);
//		return todo;
//	}
//
//	public Todo findById(Long id) {
//		// TODO Auto-generated method stub
//		System.out.println("findById");
//		for(Todo todo:todos) {
//			if(todo.getId()==id)
//				return todo;
//		}
//		return null;
//	}
//}
