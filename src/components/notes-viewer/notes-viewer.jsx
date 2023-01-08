import './notes-viewer.css'
import Note from "../note/note";
const NotesViewer = ({notes}) => {
    return (
        <div className='notes-viewer'>
            {notes.map((note) => {
                return <Note noteData={note} />
            })}
        </div>
    )
}
export default NotesViewer