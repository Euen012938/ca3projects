import React from 'react';

class NavBar extends React.Component
{
    constructor() {
        super()
    }

    render()
    {
        return (
            <div id='Nav'>
                <a href='/home'>Home</a>
                <a href='localhost:3000/english'>English</a>
                <a href='/math'>Math</a>
                <a href='/science'>Science</a>
                <a href='/health'>Health</a>
                <a href='/shop'>Shop</a>
            </div>
        );
    }
}

export default NavBar;