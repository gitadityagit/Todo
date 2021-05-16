import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import TodoApp from './Components/todo/TodoApp';
import {BrowserRouter as Router} from 'react-router-dom'
import Count from './Components/Counter/Count'



const App = () => {
    return (
        // <div>
        //     <Count />
        // </div>
        <>
            <Router>
                <TodoApp />
            </Router>

        </>
    );
};

export default App;