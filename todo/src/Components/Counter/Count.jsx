import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

class Count extends Component{
    constructor(props){
        super(props);
        this.state={
            count:0,
            visible:false
        }
        // console.log("constructor")
        this.clicked=this.clicked.bind(this);
    }

    clicked(event){
        this.setState({
            visible: true
        })

        console.log(event.target.name)
    }

    componentDidMount(){
        // alert("hello function")
        // console.log("componentDidMount")
    }

    render(){
        // console.log("render")
        return(
            
            <div>
                <button className="btn btn-success" onClick={this.clicked}>visible enable</button>
                {this.state.visible && <h2>You have clicked</h2>}
            </div>
        )
    }
}

export default Count;