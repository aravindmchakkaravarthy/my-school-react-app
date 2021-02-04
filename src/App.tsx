import React from 'react';
import './App.css';

import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';



function App() {
  return (
    <>
      <Header />
      
      <div>
        <audio src="https://ssl.gstatic.com/dictionary/static/sounds/oxford/define--_us_1.mp3" controls autoPlay />
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Steve Jobs</h5>
          <h6 className="card-subtitle mb-2 text-muted">steve@apple.com</h6>
          <p className="card-text">Stay Hungry, Stay Foolish</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Steve Jobs</h5>
          <h6 className="card-subtitle mb-2 text-muted">steve@apple.com</h6>
          <p className="card-text">Stay Hungry, Stay Foolish</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
