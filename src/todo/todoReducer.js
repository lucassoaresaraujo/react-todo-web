const INITIAL_STATE = {
    descricao: '',
    list: [],
    erros: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DESCRICAO_CHANGED':
            return {...state, descricao: action.payload};
        case 'TODO_SEARCHED':
            return {...state, list: action.payload.data.content}
        default:
            return state;
    }
}