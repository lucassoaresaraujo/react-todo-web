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
            return {...state, list: action.payload.content}    
        case 'TODO_CLEAR':
            return {...state, descricao: '', erros: []}
        case 'TODO_SHOW_ERROS':
            return {...state, erros: action.payload}            
        default:
            return state;
    }
}