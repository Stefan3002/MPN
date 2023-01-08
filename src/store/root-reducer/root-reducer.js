import {combineReducers} from "redux";
import navigationReducer from "../navigation/navigation-reducer";
import {userReducer} from "../user/user-reducer";
import {notesReducer} from "../notes/notes-reducer";
import {utilsReducer} from "../utils/utils-reducer";

const rootReducer = combineReducers({
        navigation: navigationReducer,
        user: userReducer,
        notes: notesReducer,
        utils: utilsReducer
    }
)
export default rootReducer