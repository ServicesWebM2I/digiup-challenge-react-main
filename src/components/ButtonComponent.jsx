
import React from 'react';

const ButtonComponent = ({ onClick, text }) => (
    <button
        className="w-8 h-8 bg-orange-400 text-xl rounded-md font-extrabold"
        type="button"
        onClick={onClick}
    >
        {text}
    </button>
);

export default ButtonComponent;
