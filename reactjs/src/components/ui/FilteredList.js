import React, {Component} from 'react';
import TodoItem from './TodoItem';
import {MSG_NO_ITEMS} from '../../assets/text/en_US';

export default class FilteredList extends Component {
   
   constructor(props){
       super(props);
       this.state = {
        makeAllComplete: false
       };
   }

   switchToComplete = (event) => {
       console.log("clicked", this.state);
       this.state.makeAllComplete = !this.state.makeAllComplete;
       this.props.switchStatusForAll(this.state.makeAllComplete);
   }

    render(){
        const {items, changeStatus, removeFromList, changeText, switchStatusForAll} = this.props;

        if (items.length === 0) {
            return (
                <p className="alert alert-info">{MSG_NO_ITEMS}</p>
            );
        }

        return (
            <section className="main">
                <input id="toggle-all" className="toggle-all" type="checkbox" /> 
                <label forhtml="toggle-all" onClick={this.switchToComplete} >Mark all as complete</label>
                <ul className="todo-list">
                    {items.map((item, index) => (
                        <TodoItem key={item.id} data={item} index={index} changeStatus={changeStatus} removeFromList={removeFromList} changeText={changeText} />
                    ))}
                </ul>
            </section>
        );
   }
}
