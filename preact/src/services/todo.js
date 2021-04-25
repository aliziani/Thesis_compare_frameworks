import update from 'immutability-helper';
import {LOCALE_STORAGE_KEY} from '../util/constants';

/**
 * Get the list of todo items.
 * @return {Array}
 */
export function getAll() {
    let rawData = localStorage.getItem(LOCALE_STORAGE_KEY);
    if(!rawData || rawData.trim() == "")
        return [];
    return JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY))
}

export function getItemById(itemId) {
    return getAll().find(item => item.id === itemId);
}

export function updateStatus(items, itemId, completed) {
    let index = items.findIndex(item => item.id === itemId);

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            completed: {$set: completed}
        }
    });
}

export function updateText(items, itemId, newText) {
    let index = items.findIndex(item => item.id === itemId);

    if(!newText || newText.trim() == "")
        return items;

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            text: {$set: newText.trim()}
        }
    });
}

/**
 * A counter to generate a unique id for a todo item.
 * Can remove this logic when the todo is created using backend/database logic.
 * @type {Number}
 */
let todoCounter = 1;

function getNextId() {
    return getAll().length + todoCounter++;
}

/**
 * Adds a new item on the list and returns the new updated list (immutable).
 *
 * @param {Array} list
 * @param {Object} data
 * @return {Array}
 */
export function addToList(list, data) {
    let item = Object.assign({
        id: getNextId()
    }, data);

    return list.concat([item]);
}

/**
 * Adds a new item on the list and returns the new updated list (immutable).
 *
 * @param {Array} list
 * @param {Object} data
 * @return {Array}
 */
 export function removeToListFromIndex(list, data, index) {
     return list.filter((el, ind) => ind != index );
}

export function removeToListFromItemId(list, itemId) {
    return list.filter((el, ind) => el.id != itemId );
}

export function removeAllCompleted(list){
    return list.filter(el => !el.completed);
}

export function getAllCompleted(list){
    return list.filter(el => el.completed);
}
