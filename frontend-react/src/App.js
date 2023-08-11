import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './App.css';

import {
  Route,
  useParams,
  Routes,
  BrowserRouter
} from "react-router-dom";

import LoginScreen from './screens/LoginScreen';
import AdminLogin from './screens/AdminLogin';
import HomeScreen from './screens/HomeScreen';
import EnglishScreen from './screens/EnglishScreen';
import MathScreen from './screens/MathScreen';
import MTutorialScreen from './screens/MTutorialScreen';
import MCommentScreen from './screens/MCommentScreen';
import MFeedbackScreen from './screens/MFeedbackScreen';
import ScienceScreen from './screens/ScienceScreen';
import HealthScreen from './screens/HealthScreen';
import ShopScreen from './screens/ShopScreen';
import NoScreen from './screens/NoScreen';
import FlashcardGame from './screens/FlashcardGame';
// import AdminScreen from './screens/AdminScreen';
// import AdminStudentScreen from './screens/AdminStudent';
import 'boostrap/package.json';

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoginScreen />} />
            <Route path='/adminlogin' element={<AdminLogin />} />
            <Route path='/home' element={<HomeScreen />} />
            {/* <Route path="/admin" element={<AdminScreen />} />
            <Route path="/adminStudent" element={<AdminStudentScreen />} /> */}
            <Route path="/english" element={<EnglishScreen />} />
            <Route path="/math" element={<MathScreen />} />
            <Route path="/mathT" element={<MTutorialScreen />} />
            <Route path="/mathC" element={<MCommentScreen />} />
            <Route path="/mathF" element={<MFeedbackScreen />} />
            <Route path="/science" element={<ScienceScreen />} />
            <Route path="/health" element={<FlashcardGame />} />
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="*" element={<NoScreen />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;