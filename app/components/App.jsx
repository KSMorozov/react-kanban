import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore'

// component.
export default class App extends React.Component {
	render() {
		return (
			<div>
				<button className="add-note" onClick={this.addNote}>Add Note</button>
				<AltContainer stores={[NoteStore]} inject={{
					items: () => NoteStore.getState().notes
				}}>
					<Notes onEdit={this.editNote} onDelete={this.deleteNote} />
				</AltContainer>
			</div>
		);
	}
	deleteNote = (id) => {
		NoteActions.delete(id);	
	}
	addNote = () => {
		NoteActions.create({task: 'New Task'});		
	}
	editNote = (id, task) => {
		NoteActions.update({id, task});
	}
	findNote = (id) => { return this.state.notes.findIndex((note) => note.id === id); }
}