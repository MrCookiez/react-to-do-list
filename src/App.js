import React, { Component } from 'react';
import { Grid, Row, Alert } from 'react-bootstrap';
import logo from './logo.svg';
import firebaselogo from './assets/firebase.svg';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm'; 
import { DB_CONFIG } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('notes');

    // We're going to setup the React state of our component
    this.state = {
      notes: [],
    }
  }

  componentWillMount(){
    const previousNotes = this.state.notes;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      //REVERSE
      let i=previousNotes.length;
      while (i>=0){
        console.log(previousNotes[i]);
        i--;
      }

      this.setState({
        notes: previousNotes
      })

    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }
      this.setState({
        notes: previousNotes
      })
    })
  }

  addNote(note){
  //  if(note != '') {
      this.database.push().set({ noteContent: note});
  //  }    
  }
  




    removeNote(noteId){
    console.log("from the parent: " + noteId);
    this.database.child(noteId).remove();
  }
  
  render() {
    return (
      <div className="App">
       <Alert bsStyle='warning'>
              <h2 className="title">To Do App</h2>
              <img src={logo} className="App-logo" alt="logo" />
              <strong> + </strong>
              <img src={firebaselogo} className="App-logo2 bounceIn animated" alt="logo" />
         {/*NOTES*/}
         <Grid className="myGrid">
          <Row className="notes">
            {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note.noteContent} 
                noteId={note.id} 
                key={note.id} 
                removeNote ={this.removeNote}/>
              )
            })
          }
          </Row>
          <Row>
            <NoteForm addNote={ this.addNote } />
          </Row>

       </Grid>
      </Alert>
      </div>
    );
  }
}

export default App;
