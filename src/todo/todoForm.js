import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Grid from '../template/grid';
import IconButton from '../template/iconButton';
import If from '../template/if';
import ErrorMessage from '../template/ErrorMessage';
import {add, changeDescricao, search} from './todoActions';

class TodoForm extends Component {

    componentWillMount() {
        this.props.search();
    }

    keyHandler = e => {
        const {add, search, descricao} = this.props;
        if (e.key ==='Enter'){
            e.shiftKey ? search() : add(descricao);
        } else if (e.key === 'Escape') {
            this.props.handleClear();
        } 
    }

    render(){
        const {add, search, descricao, changeDescricao} = this.props;
        return (        
            <div>
                <div role='form' className='todoForm'>
                    <p>
                        <strong>Nova tarefa: </strong>
                        <If test={descricao===""}>
                            <em>adicione o nome da atividade</em>
                        </If>    
                        {descricao}
                    </p>
                    <Grid cols='8 9 10'>
                        <input id='descricao' 
                            type="text"
                            autoComplete='off' 
                            className='form-control'
                            value={descricao}
                            onChange={changeDescricao}
                            onKeyUp={this.keyHandler}
                            onFocus={this.props.handleClearErros}
                            placeholder='Adicione uma tarefa'/>
                    </Grid>
                    
                    <Grid cols='4 3 2'>
                        <IconButton 
                            type='primary' 
                            icon='plus'
                            onClick={() => add(descricao)} />    
            
                        <IconButton
                            type='info'
                            icon='search'
                            onClick={search} />
            
                        <IconButton
                            type='default'
                            icon='close'
                            onClick={this.props.handleClear} />    
                    </Grid>
                    
                </div>
                <ErrorMessage 
                        erros={this.props.erros}/>
            </div>
        );
    }
}

const mapsStateToProps = state => ({
    descricao: state.todo.descricao,
    erros: state.todo.erros
});

const mapDispatchToProps = dispatch => 
    bindActionCreators({add, changeDescricao, search}, dispatch);

export default connect(mapsStateToProps, mapDispatchToProps)(TodoForm);