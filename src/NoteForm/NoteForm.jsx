import React, { Component } from 'react';
import { Row, Alert, FormControl, Button} from 'react-bootstrap';


class NoteForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			newNoteContent: "",
		};

			this.handleInput = this.handleInput.bind(this);
			this.writeNote = this.writeNote.bind(this);
		}


	handleInput(e){
		console.log(this);
		this.setState({
			newNoteContent: e.target.value,
		})
	}

	writeNote(){
		this.props.addNote(this.state.newNoteContent);

		//Reset the input form to empty
		this.setState({
			newNoteContent: "",
		})
	}
    
	render() {
		return (
			<Row>
			<div>
			<Alert bsStyle='warning' className="footer">
			<h5>WRITE YOUR NOTE BELOW:</h5>
              <FormControl bsStyle="lg"
              type="text" 
              componentClass="textarea"
              value={this.state.newNoteContent}
              onChange={this.handleInput}
              />
        
              <Button bsSize="large" bsStyle="primary" onClick={this.writeNote}>Add Note</Button>

            </Alert>
            </div>	
          </Row>
		);
	}
}


export default NoteForm;
