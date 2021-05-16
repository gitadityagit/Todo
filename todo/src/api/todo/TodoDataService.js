import axios from "axios";


class TodoDataService{
    retrieveAllTodos(name){
        return axios.get(`http://localhost:8081/jpa/users/${name}/todos`)
    }
    deleteTodo(name,id){
        // return axios.get(`http://localhost:8081/users/todos/${id}`)
        return axios.delete(`http://localhost:8081/jpa/users/${name}/todos/${id}`)
    }
    retrieveTodo(name,id){
        // return axios.get(`http://localhost:8081/users/todos/${id}`)
        return axios.get(`http://localhost:8081/jpa/users/${name}/todos/${id}`)
    }

    updateTodo(name,id,todo){
        // return axios.get(`http://localhost:8081/users/todos/${id}`)
        return axios.put(`http://localhost:8081/jpa/users/${name}/todos/${id}`,todo)
    }

    createTodo(name,todo){
        // return axios.get(`http://localhost:8081/users/todos/${id}`)
        return axios.post(`http://localhost:8081/jpa/users/${name}/todos`,todo)
    }
    
}

export default new TodoDataService();