import React, {Component} from 'react';
import './App.css';

import { Header } from './components/header/header';

import spellingBee from './spelling-bee.png';

import {Button} from 'react-bootstrap';



class App extends Component {


  state = {
    playStarted: false,
    playComplete: false,
    currentScore: 0,
    total: 0,
    word: {
      word: '',
      id: '',
      url: '',
      spelling: ''
    },
    backgroundColor: ''
  }

  searchInput:any = null;

  audioTag:any = null;

  componentDidMount(){
    
  }

  startPlay =  () => {
    this.setState({playStarted: true, playComplete:false});
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentScore: this.state.currentScore, total:this.state.total })
  };
  let url = 'http://myschoolapp-env.eba-3ujvyqcp.us-east-1.elasticbeanstalk.com/play';
  //let url = 'http://localhost:5000/play';
  fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => this.setState({
        currentScore:data.currentScore, 
        total:data.total,
        word:{
          word: data.nextWord.word,
          id: data.nextWord.id,
          url: data.nextWord.url,
          spelling: ''
        }
      }));
  }

  nextPlay = () => {
    let url = 'http://myschoolapp-env.eba-3ujvyqcp.us-east-1.elasticbeanstalk.com/play';
    if(null != this.searchInput){
      this.searchInput?.focus();
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        currentScore: this.state.currentScore, 
        total:this.state.total,
        currentWord:{
          word: this.state.word.word,
          spelling: this.state.word.spelling,
        } 
      })
  };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          this.setState({
          currentScore:data.currentScore, 
          total:data.total,
          word:{
            word: data.nextWord.word,
            id: data.nextWord.id,
            url: data.nextWord.url,
            spelling: ''
          }
        })
        if(data.result){
          this.setState({backgroundColor: 'lightgreen'});
        }else{
          this.setState({backgroundColor: '#ff4b4b'});
        }
        setTimeout(()=>this.setState({backgroundColor: ''}), 200);
      }).catch(err => {
        alert("Some error happened. Please contact administrator");
        alert(err);
      });
        
  }

  

  closePlay = () => {
    this.setState({playComplete:true})
  }

  changeSpelling = (evt:any) => {
    let word = this.state.word;
    word.spelling = evt.target.value;
    this.setState({word:word})
  }

  

  setPlayBack = () => {
    this.audioTag.playbackRate = 0.9;
    console.log("Set audio play back to slow");
  }

  render() {
    const {playStarted, word, currentScore, total, playComplete} = this.state;
    return (
      <>
      
      <Header />
      <div className="body" style={{backgroundColor:this.state.backgroundColor}}>
        <form onSubmit={this.nextPlay} action="#">
          {playComplete? <>
            <div style={{fontSize:'2rem', margin:'20px'}}>
              <span>Your score</span>
              <div className="end-score"><div style={{margin:'auto'}}>{currentScore}/{total}</div></div>
            
            </div>
          </>:<>
            {playStarted ? 
            <div style={{margin:'10px' }}>
              <div className="score"><div style={{margin:'auto'}}>{currentScore}/{total}</div></div>
              <audio ref={c => (this.audioTag = c)} onCanPlay={this.setPlayBack} style={{margin:'20px'}}src={word.url} autoPlay controls></audio>
              <input autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" ref={c => (this.searchInput = c)} type="text" autoFocus={true}  className="form-control" value={word.spelling} onChange={this.changeSpelling}/>
            </div>: <img src={spellingBee} className="welcome-image"  />}
          </>}
        </form>
      </div>
      <div className="footer">
        <div className="navbar navbar-dark bg-dark box-shadow">
          <div className="d-flex justify-content-between">
          {playComplete? <><Button variant="success" style={{margin:'20px'}} onClick={this.startPlay}>Play again</Button></>:
          <>
            {!playStarted ? <Button variant="success" style={{margin:'20px'}} onClick={this.startPlay}>Play</Button> : 
            <>
            <Button variant="success" style={{margin:'20px'}} onClick={this.nextPlay}>Next</Button>
            <Button variant="secondary" style={{margin:'20px'}} onClick={this.closePlay}>End Game</Button>
            </>}</>}
          </div>
        </div>
        
      </div>
      
    </>
    );
  }
}


export default App;
