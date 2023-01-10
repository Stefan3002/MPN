import './notes-viewer.css'
import Note from "../note/note";
const NotesViewer = ({noShareable, notes}) => {
    return (
        <div className='notes-viewer'>
            {notes ? notes.map((note) => {
                return <Note noShareable={noShareable} noteData={note} />
            }) : null}
        </div>
    )
}
export default NotesViewer