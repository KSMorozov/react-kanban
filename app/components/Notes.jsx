import React from 'react';
import Note from './Note.jsx';

export default class Notes extends React.Component {
	// function which returns a Notes virtual DOM element.
	render() {
		// apply notes to virtual dom element (passed through items property from App)
		const notes = this.props.items;

		// ul Notes consist of Single Note triggers renderNote()
		return <ul className="notes">{notes.map(this.renderNote)}</ul>;
	}
	// Create Note Virtual DOM element
	// Use Note Component (instantiate?)
	// passing: note task(text) as task property
	renderNote = (note) => {
		return (
			<li className="note" key={note.id}>
				<Note task={note.task}
					  onEdit={this.props.onEdit.bind(null, note.id)}
					  onDelete={this.props.onDelete.bind(null, note.id)}
				/>
			</li>
		);
	}
}