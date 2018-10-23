import React, {Component} from 'react';
import axios from 'axios';

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';

const URL = 'http://localhost:8080/api/todo/';

export default class Todo extends Component{

    constructor(props){
        super(props);
        this.refresh();
    }

    state = {
        descricao: "",
        list: [],
        erros: [],
    }

    handleAdd = () => {
        const descricao = this.state.descricao;
        axios.post(URL, {descricao: descricao})
            .then(resp => this.refresh())
            .catch(error => {
                console.dir(error);
                const erros = error.response.data;
                this.setState({...this.state, erros: erros});
            });;
        
    }

    refresh = (descricao = '') => {
        axios.get(`${URL}?sort=createdAt,desc&descricao=${descricao}`)
        .then(resp=> this.setState({...this.state, descricao, list:resp.data.content }))
        .catch(error => console.dir(error));
    }

    handleSearch = () => {
        this.refresh(this.state.descricao);
    }

    handleClear = () => {
        this.refresh();
        this.handleClearErros();
    }

    handleClearErros = () => {
        console.log("Entrou");
        this.setState({...this.state, erros: []})
    }

    handleChange = (ev) => {
        this.setState({
            ...this.state,
            descricao: ev.target.value,
        });
    }

    handleRemove = (todo) => {
        axios.delete(`${URL}/${todo.id}`)
            .then(resp => this.refresh(this.state.descricao));
    }

    handleMarkAsDone = todo => {
        axios.put(`${URL}/${todo.id}`, {...todo, done: true})
        .then(resp => this.refresh(this.state.descricao));
    }

    handleMarkAsPending = todo => {
        axios.put(`${URL}/${todo.id}`, {...todo, done: false})
        .then(resp => this.refresh(this.state.descricao));
    }

    render(){
        const {descricao, list, erros} = this.state;
        return (
            <div>
                <PageHeader name="Tarefas" small='Cadastro' />
                <TodoForm 
                    handleAdd={this.handleAdd} 
                    descricao={descricao}
                    erros={erros}
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                    handleClearErros={this.handleClearErros} />
                <TodoList 
                    list={list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    />
            </div>
        )
    }
}