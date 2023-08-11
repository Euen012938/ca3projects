import React from 'react';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';

class NoScreen extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className='Main'>
                    <h1>404 Not Found</h1>
                </div>
                <FooterBar />
            </div>

        );
    }
}

export default NoScreen;