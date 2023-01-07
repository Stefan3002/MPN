import './App.css';
import {Route, Routes} from "react-router";
import NavigationExtension from "./components/navigation-extension/navigation-extension";
import Navigation from "./components/navigation/navigation";
import {useDispatch, useSelector} from "react-redux";
import {getNavigationExtended} from "./store/navigation/navigation-selectors";
import AuthPage from "./components/auth-page/auth-page";
import {useEffect} from "react";
import {getUserDataBack, onAuthStateChangedListener} from "./utils/firebase/firebase";
import {setUser, setUserData} from "./store/user/user-actions";
import ProfilePage from "./components/profile-page/profile-page";
import NotebookPage from "./components/notebook-page/notebook-page";

function App() {
    const navigationExtended = useSelector(getNavigationExtended)
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChangedListener(async (user) => {
            const userData = await getUserDataBack(user.uid)
            dispatch(setUser(user))
            dispatch(setUserData(userData))
        })
    }, [])
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={!navigationExtended ? <Navigation /> : <NavigationExtension />}>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/notebook' element={<NotebookPage />} />
        </Route>
          <Route path='/auth' element={<AuthPage />} />
      </Routes>

    </div>
  );
}

export default App;
