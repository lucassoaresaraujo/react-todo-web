import axios from 'axios';

const URL = 'http://localhost:8080/api/todo/';

export const changeDescricao = event => ({
    type: 'DESCRICAO_CHANGED',
    payload: event.target.value
});

export const search = (descricao = '') => {

    return (dispatch, getState) => {
        const descricao = getState().todo.descricao;
        const request = axios.get(`${URL}?sort=createdAt,desc&descricao=${descricao}`)
        .then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data})) 

    }
}

export const showErros = (erros) => {
    return [{
        type: 'TODO_SHOW_ERROS',
        payload: erros.response.data
    }]
}

export const add = (descricao) => {
    return dispatch => {
        axios.post(URL, { descricao })
        .then(resp => dispatch(clear()))
        .catch(erros => dispatch(showErros(erros)))
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

// forma de usar o multi pra chamar duas ações sem promise
export const clear = () => {
    return [
        {type: 'TODO_CLEAR'},
        search()
    ]
}