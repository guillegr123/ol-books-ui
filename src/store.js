import { createStore } from 'redux';

const addToCircularBuffer = (buffer, element) => {
    console.log(buffer);
    const bufferMaxSize = 10;

    // Check if element already exists
    var existingIndex = buffer.findIndex(item => item.olid === element.olid);

    // If element exists, remove from array
    if (existingIndex >= 0) {
        buffer.splice(existingIndex, 1);
    }

    // If buffer already has the max size, remove the last element
    if (buffer.length === bufferMaxSize) {
        buffer.splice(-1, 1);
    }

    // Finally, add the new element
    buffer.unshift(element);

    return buffer
}

const reducer = (state, action) => {
    if (action.type === 'ADD_WORK_TO_HISTORY') {
        return {
            ...state,
            viewHistory: addToCircularBuffer(state.viewHistory, { olid: action.olid, title: action.title })
        };
    }

    return state;
}

export default createStore(reducer, { viewHistory: [] });
