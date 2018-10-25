import axios from 'axios';

const URL = 'http://localhost:8080/api/todo/';

export const changeDescricao = event => ({
    type: 'DESCRICAO_CHANGED',
    payload: event.target.value
});

export const search = () => {
    const request = axios.get(`${URL}?sort=createdAt,desc`);        
    return {
        type: 'TODO_SEARCHED',
        payload: request
    }
}

export const add = (descricao) => {
    return dispatch => {
        axios.post(URL, { descricao })
        .then(resp => dispatch(clear()))
        .then(resp => dispatch(search()));    
    }    
}

export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo.id}`, {...todo, done: true})        
        .then(resp => dispatch(search()));
    }
}

export const markAsPending = todo => {
    return dispatch => {
        axios.put(`${URL}/${todo.id}`, {...todo, done: false})
        // .then(resp => dispatch({type: 'TODO_MARKED_AS_PENDING', payload: resp.data}))
        .then(resp => dispatch(search()));
    }
}

export const remove = todo => {
    return dispatch => {
        axios.delete(`${URL}/${todo.id}`)
        .then(resp => dispatch(search()));
    }
}

export const clear = () => {
    return {type: 'TODO_CLEAR'}
}