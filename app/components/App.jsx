import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';

// component.
export default class App extends React.Component {
	// Constructor of your own.
	// We're passing props to super by convention.
	// If you don't pass it, this.props won't get set!
	// Calling super invokes the same method of the parent class
	// and you see this kind of usage in object oriented programming often.
	constructor(props) {
		// Extend React.Component(parent) constructor with yours.
		super(props);
		// add initial state
		this.state = {
			notes: [
				{
					id: uuid.v4(),
					task: 'Learn Webpack'
				},
				{
					id: uuid.v4(),
					task: 'Learn React'
				},
				{
					id: uuid.v4(),
					task: 'Do laundry'
				}
			]
		};
	}
	// function which returns a App(Wrapper) virtual DOM element.
	render() {
		// apply initial state.
		const notes = this.state.notes;
		// use Notes component (instantiate?)
		// pass notes through items property
		return (
			<div>
				<button className="add-note" onClick={this.addNote}>Add Note</button>

				<Notes items={notes}
					onEdit={this.editNote}
					onDelete={this.deleteNote} />
			</div>
		);
	}
	// delete note
	deleteNote = (id) => {
		const notes = this.state.notes;
		const n_idx = this.findNote(id);

		if (n_idx < 0) return ;

		this.setState({
			notes : notes.slice(0, n_idx).concat(notes.slice(n_idx + 1))
		});
	}
	// add note method
	addNote = () => {
		this.setState({
			notes: [...this.state.notes, {id: uuid.v4(), task: 'New task'}]
		});
	}
	editNote = (id, task) => {
		const notes = this.state.notes;
		const n_idx = this.findNote(id);

		if (n_idx < 0) return ;

		notes[n_idx].task = task;

		this.setState({notes});
	}
	findNote = (id) => { return this.state.notes.findIndex((note) => note.id === id); }
}