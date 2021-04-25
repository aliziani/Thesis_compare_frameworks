import React, {Component} from 'react';
import {FILTER_ALL} from '../../services/filter';
import {MODE_CREATE, MODE_NONE} from '../../services/mode';
import {objectWithOnly, wrapChildrenWith} from '../../util/common';
import {getAll, addToList, updateStatus, removeToList, removeToListFromIndex, removeToListFromItemId, updateText, removeAllCompleted, getAllCompleted} from '../../services/todo';
import {LOCALE_STORAGE_KEY} from '../../util/constants';

class StateProvider extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            list: getAll()
        }
    }

    render() {
        let children = wrapChildrenWith(this.props.children, {
            data: this.state,
            actions: objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery', 'removeFromList', 'changeText', "removeAllCompleted", "allCompleted", "switchStatusForAll"])
        });

        return <div>{children}</div>;
    }

    allCompleted(){
        return getAllCompleted(this.state.list);
    }


    removeAllCompleted(){
        let updatedList = removeAllCompleted(this.state.list);
        this.setState({list: updatedList});
    }

    removeFromList(data, index){
        let updatedList = removeToListFromIndex(this.state.list, data, index);
        this.setState({list: updatedList});
    }

    addNew(text) {
        let updatedList = addToList(this.state.list, {text, completed: false, editing: false});

        this.setState({list: updatedList});
    }

    changeFilter(filter) {
        this.setState({filter});
    }

    changeText(itemId, newText){
        let updatedList;
        if(!newText || newText.trim() == ""){
            updatedList = removeToListFromItemId(this.state.list, itemId);
        }else{
            updatedList = updateText(this.state.list, itemId, newText);
        }
        this.setState({list: updatedList});
    }

    changeStatus(itemId, completed) {
        const updatedList = updateStatus(this.state.list, itemId, completed);

        this.setState({list: updatedList});
    }

    switchStatusForAll(completed) {
        let newList = []
        for(var i = 0; i < this.state.list.length; i++){
            var newState = this.state.list[i];
            newState.completed = completed;
            newList.push(newState);
        }
        this.setState({list: newList});
    }

    changeMode(mode = MODE_NONE) {
        this.setState({mode});
    }

    setSearchQuery(text) {
        this.setState({query: text || ''});
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        // store always new version in local storage on each change
        localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(this.state.list));
    }

}

export default StateProvider;
