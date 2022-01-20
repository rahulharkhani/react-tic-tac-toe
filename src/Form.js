import React from 'react';
import './bootstrap.min.css';
const axios = require('axios');
//import { Alert } from 'bootstrap-4-react';

class ToDoList extends React.Component{
   
    state = {
        todoList : [],
        updateValue : "",
        currentPage : 1,
        itemperPage : 2,
        totalperPage : 2
    }
    
    /* Store edited value */
    handleChange =(event)=> {
        this.setState({value : event.target.value});
    }
    /* Assign to value is edited */
    handleChangeEdit =(event)=> {
        this.setState({updateValue : event.target.value});
    }
    
    /* Remove to do list item */
    handleRemoveClick =(event)=> {
        //let todoListArr = this.state.todoList;
        //console.log(this.state.todoList);
        //alert(event.target.value);

        let todoList = this.state.todoList;
        /* Using node js api */
        axios.post('http://localhost:8000/todolist/delete/:id', {
        //axios.delete('http://localhost:8000/todolist', {
            indexName: event.target.value
        })
        .then(response => {
            //console.log(response);
            todoList = response.data.body;
            this.setState({
                todoList
            });
        })
        .catch(error => {
            console.log(error);
        });

        /* Old flow without API */
        /*todoList.splice(event.target.value, 1);
        this.setState({
            todoList
        });*/
        //console.log(event.target.value);
    }

    /* Save to do list item */
    handleSubmit =(event)=> {
        //console.log(event);
        let todoList = this.state.todoList;
        let todoName = this.state.value;
        /* Using node js api */
        axios.post('http://localhost:8000/todolist', {
            value: todoName
        })
        .then(response => {
            //console.log(response);
            this.setState({
                todoList :[
                    ...todoList,
                    {
                        index : todoList.length + 1,
                        value :todoName,
                        done: false,
                        isEditable: false,
                    }
                ],
                isEditable: false
            });
        })
        .catch(error => {
            console.log(error);
        });
        this.state.value = "";
        /* Old flow without API */
        /*if(todoName) {
            this.setState({
                todoList :[
                    ...todoList,
                    {
                        index : todoList.length + 1,
                        value :todoName,
                        done: false,
                        isEditable: false,
                    }
                ],
                isEditable: false
            });
            this.state.value = "";
        }*/
        //alert("Form Submited "+ this.state.value);
        //console.log(todoList);
        event.preventDefault();
    }

    /* Onclick edit button here */
    handleEditClick =(event)=> {
        let todoList = this.state.todoList;

        todoList.map((res, i) => {
            if(res.isEditable) {
                todoList[i].isEditable = false;
            }
        })
        this.setState({
            todoList
        });

        todoList[event.target.value].isEditable = true;
        this.setState({
            todoList
        });
    }
    
    /* Update  button value onclick button */
    handleUpdateClick =(e)=> {
        let todoList = this.state.todoList;
        if(this.state.updateValue) {
            /* Using node js api */
            axios.put('http://localhost:8000/todolist', {
                value: this.state.updateValue,
                indexName: e.target.value
            })
            .then(response => {
                //console.log(response);
                this.setState({updateValue : ""});
                todoList = response.data.body;
                this.setState({
                    todoList
                });
            })
            .catch(error => {
                console.log(error);
            });

            /* Old flow without API */
            /*todoList[e.target.value].value = this.state.updateValue;
            todoList[e.target.value].isEditable = false;
            this.setState({updateValue : ""});
            this.setState({
                todoList
            });*/
        }
    }

    /* Cancel Update button */
    CancelUpdateClick =(e)=> {
        let todoList = this.state.todoList;
        todoList.updateValue = "";
        todoList[e.target.value].isEditable = false;
        this.setState({
            todoList
        });
    }

    /* Pagination click */
    pageClickbutton =(e)=> {
        //alert(e.target.id);
        let NextItem = this.state.totalperPage + this.state.itemperPage;
        this.setState({ currentPage : e.target.id, totalperPage : NextItem });
    }

    /* List of item here */
    todoList=() => {
        const {todoList} = this.state;
        const {currentPage, itemperPage, totalperPage} = this.state;
        const LastIndex = totalperPage; //currentPage * itemperPage;
        const FirstIndex = '0'; //LastIndex - itemperPage;
        const CurrentIndexes = todoList.slice(FirstIndex, LastIndex);

        // Get Current Index from array
        // const pageTools = CurrentIndexes.map((todoList, i) => {
        //     return <li key={i}>{todoList.index} ==> {todoList.value}</li>;
        // });
        
        // Logic for displaying page numbers
        const pageNumbers = [];
        for(let i = 1; i <= Math.ceil(todoList.length / itemperPage); i++) {
            pageNumbers.push(i);
        }

        //display page numbers
        /*const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li key={number} id={number} onClick={this.pageClickbutton}>
                    Nummber :  {number}
                </li>
            );
        });*/
        const renderPageNumbers = <button type="button" class="btn btn-info" onClick={this.pageClickbutton}>Load More</button>;
            /*<li onClick={this.pageClickbutton}>
                Number : 
            </li>;*/
        //console.log(todoList);
        return (
            <div>
                {CurrentIndexes.map((res,i)=>{  // todoList

                    var viewstyle = {};
                    var Displaystyle = {};
                    if(res.isEditable) {
                        viewstyle.display = 'block';
                        Displaystyle.display = 'none';
                    }else{
                        viewstyle.display = 'none';
                        Displaystyle.display = 'block';
                    }
                    
                    return (
                        <div>
                            <div class="col-md-3">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 key={i}>{i}) {res.value}</h5>
                                        <div style={Displaystyle}>
                                            <button type="button" class="btn btn-danger btn-sm" name="removeList" id="removeList" value={i} onClick={this.handleRemoveClick}>Remove</button>
                                            <button type="button" class="btn btn-primary btn-sm" name="editList" id="editList" value={i} onClick={this.handleEditClick}>Edit</button>
                                        </div>
                                        <div style={viewstyle}>
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="updateValue" id="updateValue" value={this.state.updateValue} onChange={(e) => this.handleChangeEdit(e)} /> {/*value={res.value} */}
                                                <button type="button" class="btn btn-info btn-sm" name="updateList" id="updateList" value={i} onClick={this.handleUpdateClick}>Update</button>
                                                <button type="button" class="btn btn-primary btn-sm" name="cancelList" id="cancelList" value={i} onClick={this.CancelUpdateClick}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                        </div>
                    )
                })
                
            }
                <ul id="page-numbers"> 
                    {renderPageNumbers}
                </ul>
            </div>
        );
    }

    componentDidMount(){
        axios.get('http://localhost:8000/todolist')
        .then(response=> {
            //console.log(response)
            this.setState({
                todoList:response && response.data.body
            })
        })
        .catch( error=> {
            console.log(error);
        })
    }

    /* Main form to display render function */
    render() {
        /*const { todoList } = this.state;
        console.log(todoList)*/
        return (
            <div>
                <form name="myform" ref="form" id="form" onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <div class="col-md-3">
                            <label>Todo</label>
                            <input type="text" class="form-control" name="addTodo" id="addTodo" value={this.state.value} onChange={this.handleChange} />
                        </div>
                    </div>    
                </form>
                {this.todoList()}
            </div>
          );
    }
}
export default ToDoList;