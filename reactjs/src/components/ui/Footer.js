import React, {Component} from 'react';
import Filter from './Filter';
import ButtonWrapper from './ButtonWrapper';
import {pluralize} from '../../util/common';
import { render } from '@testing-library/react';

export default class Footer extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            clicked: 0
        };
    }
    render(){
        const {count, filter, changeFilter, removeAllCompleted, allCompleted} = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{count}</strong> {pluralize('item', count)} left
                </span>
                <div className="pull-left buttons">
                    <ButtonWrapper {...this.props}/>
                </div>
    
                <div className="pull-right">
                    <Filter {...{filter, changeFilter}}/>
                </div>
                {
                    allCompleted().length > 0 ?
                        <button className="clear-completed" onClick={(e) => {removeAllCompleted(); this.setState({clicked: ++this.state.clicked});}}>
                            Clear completed
                        </button>
                    :
                        <div></div>
                }
               
            </footer>
        );
    }
   
}
