import React from 'react';
import enhance from '../hoc/wrapInputBox';

function InputBox(props) {
    const { value, handleChange, handleKeyUp } = props;

    return (
        <input autoFocus
            type="text"
            className="new-todo"
            value={value}
            onKeyUp={handleKeyUp}
            onChange={handleChange}
            placeholder="new todo item..."
        />
    );
}

export default enhance(InputBox);
