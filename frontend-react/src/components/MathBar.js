import React from 'react';

class MathBar extends React.Component
{
    constructor() {
        super()
    }

    render()
    {
        return (
            <div id='MathBar'>
                <a href='/home'>Home</a>
                <a href='/'>Tutorial</a>
                <a href='/math'>Games</a>
                <a href='/'>Comments</a>
                <a href='/'>Feedbacks</a>
            </div>
        );
    }
}

export default MathBar;