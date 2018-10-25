import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import IconButton from '../template/iconButton';
import {markAsDone, markAsPending, remove} from './todoActions';


const TodoList = props => {

    //const list = props.list || [];
    const {markAsDone, markAsPending, remove} = props;
    const renderRows = () =>{
        const list = props.list || [];
        return list.map(todo => (
            <tr key={todo.id}>
                <td className={todo.done ? 'markedAsDone': ''}>{todo.descricao}</td>
                <td>
                    <IconButton
                        hide={todo.done}  
                        type='success' 
                        icon='check'
                        onClick={()=>markAsDone(todo)}></IconButton>

                    <IconButton
                        hide={!todo.done} 
                        type='warning' 
                        icon='undo'
                        onClick={()=>markAsPending(todo)}></IconButton>                        

                    <IconButton
                        hide={!todo.done} 
                        type='danger' 
                        icon='trash-o'
                        onClick={()=>remove(todo)}></IconButton>
                </td>
            </tr>
        ));
    }

    return (
    <table className='table'>
        <thead>
            <tr>
                <th>Descrição</th>
                <th className='tableActions'>Ações</th>
            </tr>
        </thead>
        <tbody>            
            {renderRows()}
        </tbody>
    </table>
    )
}

const mapStateToProps = state => ({list: state.todo.list});

const mapDispatchToProps = dispatch => 
    bindActionCreators({markAsDone, markAsPending, remove}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);