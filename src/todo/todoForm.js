import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Grid from '../template/grid';
import IconButton from '../template/iconButton';
import If from '../template/if';
import ErrorMessage from '../template/ErrorMessage';
import {changeDescricao, search} from './todoActions';

class TodoForm extends Component {

    componentWillMount() {
        this.props.search();
    }

    keyHandler = e => {
        if (e.key ==='Enter'){
            e.shiftKey ? this.props.handleSearch() : this.props.handleAdd();
        } else if (e.key === 'Escape') {
            this.props.handleClear();
        } 
    }

    render(){
        return (        
            <div>
                <div role='form' className='todoForm'>
                    <p>
                        <strong>Nova tarefa: </strong>
                        <If test={this.props.descricao===""}>
                            <em>adicione o nome da atividade</em>
                        </If>    
                        {this.props.descricao}
                    </p>
                    <Grid cols='8 9 10'>
                        <input id='descricao' 
                            type="text"
                            autoComplete='off' 
                            className='form-control'
                            value={this.props.descricao}
                            onChange={this.props.changeDescricao}
                            onKeyUp={this.keyHandler}
                            onFocus={this.props.handleClearErros}
                            placeholder='Adicione uma tarefa'/>
                    </Grid>
                    
                    <Grid cols='4 3 2'>
                        <IconButton 
                            type='primary' 
                            icon='plus'
                            onClick={this.props.handleAdd} />    
            
                        <IconButton
                            type='info'
                            icon='search'
                            onClick={this.props.handleSearch} />
            
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
    bindActionCreators({changeDescricao, search}, dispatch);

export default connect(mapsStateToProps, mapDispatchToProps)(TodoForm);