import React, { Component } from 'react'
import moment from 'moment'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'


class ListTodos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [],
            message: null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.refreshTodos=this.refreshTodos.bind(this)
        this.addTodoClicked=this.addTodoClicked.bind(this)
    }
    componentDidMount = () => {
        console.log("component did mount")
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUser()
        TodoDataService.retrieveAllTodos(username)
            .then(response => {
                // console.log(response.data)
                this.setState({
                    todos: response.data
                })
            })
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUser()
        // console.log(id+" "+ username)
        TodoDataService.deleteTodo(username, id)
            .then(response => {
                console.log(response)
                this.setState({message: `Delete of todo ${id} Successful`});
                this.refreshTodos();
            })
            .catch(error => console.log(error))
        // .then(response=>{
        //     this.setState({
        //         message: `delete of todo ${id} successful`
        //     })
        // })
    }

    updateTodoClicked(id) {
        // let username = Authentication.getLoggedInUser()
        // // console.log(id+" "+ username)
        // TodoDataService.deleteTodo(username, id)
        //     .then(response => {
        //         console.log(response)
        //         this.setState({message: `Delete of todo ${id} Successful`});
        //         this.refreshTodos();
        //     })
        //     .catch(error => console.log(error))
        console.log("update "+id);
        this.props.history.push(`/todos/${id}`)
        
    }

    addTodoClicked() {
        this.props.history.push(`/todos/-1`)
    }

    render() {
        console.log("render")
        return (
            <div className="container">
                <h3 className="text-center">List of Todos</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Completed</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(todo => {
                                return (
                                    <tr key={todo.id} >
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format("DD/MM/YYYY")}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-danger" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={() => this.addTodoClicked()}>Add</button>
                    </div>
            </div>
        );
    }
}

export default ListTodos;