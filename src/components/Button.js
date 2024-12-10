import React from 'react';

function BigButton() {
    const handleClick = () => {
        alert("Button was clicked!");
    };

    return (
        <button onClick={handleClick} className="App-button">
            BIG BUTTON
        </button>
    );
}

export default BigButton;
