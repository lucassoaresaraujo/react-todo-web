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