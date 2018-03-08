import React, { Component } from 'react';
import './Note.css';
import { Row, Col, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Note extends Component {
	constructor(props){
		super(props);
		this.noteContent = props.noteContent;
		this.noteId = props.noteId;
		this.handeleRemoveNote = this.handeleRemoveNote.bind(this);
	}
	handeleRemoveNote(id){
		this.props.removeNote(id);
	}
	render(props) {
		return (
			<Col lg={8} lgOffset={2}>
				<Alert bsStyle="warning">
				<Row className="note">
					<span 	className="closeBtn btn btn-danger" 
							onClick={() => this.handeleRemoveNote(this.noteId)}>
							&times;
					</span>
					<p className="note bounceIn animated">{this.noteContent}</p>
				</Row>
				</Alert>
			</Col>					
			
		)
	}
}

Note.propTypes = {
    noteContent: PropTypes.string
}

export default Note;