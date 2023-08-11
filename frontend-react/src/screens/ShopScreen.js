import React from 'react';
import FooterBar from '../components/FooterBar';
import NavBar from '../components/NavBar';

class EnglishScreen extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <NavBar />

                <div className='English'>
                    <h1>English</h1>
                </div>
                <FooterBar />
            </div>
        );
    }
}

export default EnglishScreen;