import React from 'react';
import IconButton from '../template/iconButton';

export default props => {

    //const list = props.list || [];

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
                        onClick={()=>props.handleMarkAsDone(todo)}></IconButton>

                    <IconButton
                        hide={!todo.done} 
                        type='warning' 
                        icon='undo'
                        onClick={()=>props.handleMarkAsPending(todo)}></IconButton>                        

                    <IconButton
                        hide={!todo.done} 
                        type='danger' 
                        icon='trash-o'
                        onClick={()=>props.handleRemove(todo)}></IconButton>
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