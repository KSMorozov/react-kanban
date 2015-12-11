import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
	constructor() {
		this.bindActions(NoteActions);

		this.notes = [];

		this.exportPublicMethods({
			get: this.get.bind(this)
		});
	}
	create(note) {
		const notes = this.notes;

		note.id = uuid.v4();

		this.setState({
			notes: notes.concat(note)
		});
	}
	update({id, task}) {
		const notes = this.notes;
		const n_id = this.findNote(id);

		if (n_id < 0) return ;
		notes[n_id].task = task;

		this.setState({notes});
	}
	delete(id) {
		const notes = this.notes;
		const n_id = this.findNote(id);

		if (n_id < 0) return ;

		this.setState({
			notes: [...notes.slice(0, n_id), ...notes.slice(n_id + 1)]
		});
	}
	findNote(id) {
		const notes = this.notes;
		const n_id = notes.findIndex((note) => note.id === id);

		if (n_id < 0) return;
		return n_id;
	}
	get(ids = []) {
		return ids.map((id) => this.notes[this.findNote(id)]).filter((a) => a);
	}
}

export default alt.createStore(NoteStore, 'NoteStore');