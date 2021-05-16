import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';
import React, { Component } from 'react';
import TodoDataService from './../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class TodoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {

        if(this.state.id===-1){
            return 
        }


        console.log("component did mount update")
        let username = AuthenticationService.getLoggedInUser();
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => {
                // console.log(response.data.targetDate)
                this.setState({
                    description: response.data.description,
                    target: moment(response.data.targetDate).format('YYYY-MM-DD')
                })
            }
        )
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = "Enter a description";
        } else if (values.description.length < 5) {
            errors.description = "Enter at least 5 characters in description"
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = "Enter a valid target date"
        }
        return errors
    }
    onSubmit(values) {
        // console.log(values)
        let username = AuthenticationService.getLoggedInUser();

        if(this.state.id===-1){
            TodoDataService.createTodo(username,{
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            }).then(()=>{
                this.props.history.push(`/todos`)
            })
        }else{
            TodoDataService.updateTodo(username,this.state.id,{
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            }).then(()=>{
                this.props.history.push(`/todos`)
            })
        }
        


    }

    render() {
        // let description=this.state.description
        // let targetDate=this.state.targetDate
        let { description, targetDate } = this.state

        return (
            <div>
                <h1 className="text-center">Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{
                            description: description,
                            targetDate: targetDate
                        }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning"></ErrorMessage>
                                    <ErrorMessage name="targetDate" component="div"
                                        className="alert alert-warning"></ErrorMessage>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit" >Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>

            </div>
        );
    }
}

export default TodoComponent;