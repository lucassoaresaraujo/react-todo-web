import React from 'react'
import If from './if';
export default props => {
    const erros = props.erros || [];
    const renderErros = () => {
            return erros.map(erro =>(
                <li>{erro.mensagemUsuario}</li>
            ))
    };
    return (  
        <If test={erros.length > 0}>
            <div className="alert alert-danger" role="alert">
                <p>
                    <strong>Quase lá! Reveja alguns itens...</strong>
                </p>
                <ul>
                    {renderErros()}
                </ul>
            </div>
        </If>        
    )    
}