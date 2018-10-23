import React from 'react';
import Grid from '../template/grid';
import IconButton from '../template/iconButton';
import If from '../template/if';
import ErrorMessage from '../template/ErrorMessage';

export default props => {

    const keyHandler = e => {
        if (e.key ==='Enter'){
            e.shiftKey ? props.handleSearch() : props.handleAdd();
        } else if (e.key === 'Escape') {
            props.handleClear();
        } 
    }

    return (
        <div>
            <div role='form' className='todoForm'>
                <p>
                    <strong>Nova tarefa: </strong>
                    <If test={props.descricao===""}>
                        <em>adicione o nome da atividade</em>
                    </If>    
                    {props.descricao}
                </p>
                <Grid cols='8 9 10'>
                    <input id='descricao' 
                        type="text"
                        autoComplete='off' 
                        className='form-control'
                        value={props.descricao}
                        onChange={props.handleChange}
                        onKeyUp={keyHandler}
                        onFocus={props.handleClearErros}
                        placeholder='Adicione uma tarefa'/>
                </Grid>
                
                <Grid cols='4 3 2'>
                    <IconButton 
                        type='primary' 
                        icon='plus'
                        onClick={props.handleAdd} />    
        
                    <IconButton
                        type='info'
                        icon='search'
                        onClick={props.handleSearch} />
        
                    <IconButton
                        type='default'
                        icon='close'
                        onClick={props.handleClear} />    
                </Grid>
                
            </div>
            <ErrorMessage 
                    erros={props.erros}/>
        </div>
    )
} 