import React from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import {applyFilter, search} from '../../services/filter';

export default function TodoList(props) {
    const {list, filter, mode, query} = props.data;
    const {addNew, changeFilter, changeStatus, changeMode, setSearchQuery, removeFromList, changeText, removeAllCompleted, allCompleted, switchStatusForAll} = props.actions;
    const count = list.length;
    const items = search(applyFilter(list, filter), query);

    return (
        <main>
            <section className="todoapp">
                <Header {...{addNew, mode, query, setSearchQuery}}/>
                <FilteredList {...{items, changeStatus, removeFromList, changeText, switchStatusForAll}}/>
                {
                    count > 0 ?
                        <Footer {...{count, filter, changeFilter, mode, changeMode, removeAllCompleted, allCompleted}}/>
                    :
                        <div></div>
                }
                {/* <Info {...{mode}}/> */}
            </section>
        </main>
    );
}
