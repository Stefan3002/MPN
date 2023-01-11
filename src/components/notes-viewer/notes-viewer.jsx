import './notes-viewer.css'
import Note from "../note/note";
const NotesViewer = ({noShareable, notes, uid}) => {
    return (
        <div className='notes-viewer'>
            {notes ? notes.map((note) => {
                return <Note uid={uid} noShareable={noShareable} noteData={note} />
            }) : null}
        </div>
    )
}
export default NotesViewer