import React from 'react';

export default function Randomizer({ randomizeEatery }) {
    return (
        <>
            <h1>Randomizer title</h1>
            <div>Randomizer</div>
            <button onClick={randomizeEatery}>Randomize</button>
        </>
    );
}
