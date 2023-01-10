import './App.css';
import {Route, Routes, useNavigate} from "react-router";
import NavigationExtension from "./components/navigation-extension/navigation-extension";
import Navigation from "./components/navigation/navigation";
import {useDispatch, useSelector} from "react-redux";
import {getNavigationExtended} from "./store/navigation/navigation-selectors";
import AuthPage from "./components/auth-page/auth-page";
import {useEffect} from "react";
import {getLanguagesBack, getUserDataBack, onAuthStateChangedListener} from "./utils/firebase/firebase";
import {setUser, setUserData} from "./store/user/user-actions";
import ProfilePage from "./components/profile-page/profile-page";
import NotebookPage from "./components/notebook-page/notebook-page";
import {setLanguages} from "./store/utils/utils-actions";
import HomePage from "./components/home-page/home-page";
import {getUser} from "./store/user/user-selectors";
import FeedPage from "./components/feed-page/feed-page";
import PublicProfilePage from "./components/public-profile-page/public-profile-page";
import FollowingPage from "./components/following-page/following-page";

function App() {
    const navigationExtended = useSelector(getNavigationExtended)
    const dispatch = useDispatch()
    const user = useSelector(getUser)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const languages = await getLanguagesBack()
            dispatch(setLanguages(languages))
        })()
        onAuthStateChangedListener(async (user) => {
            const userData = await getUserDataBack(user.uid)
            dispatch(setUser(user))
            dispatch(setUserData(userData))
        })
    }, [])

    // useEffect(() => {
    //     if(!user)
    //         navigate('/auth')
    // }, [user])
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={!navigationExtended ? <Navigation /> : <NavigationExtension />}>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/notebook' element={<NotebookPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/feed' element={<FeedPage />} />
            <Route path='/publicprofile/:userUid' element={<PublicProfilePage />}/>
            <Route path='/following' element={<FollowingPage />}/>
        </Route>
          <Route path='/auth' element={<AuthPage />} />
      </Routes>

    </div>
  );
}

export default App;
