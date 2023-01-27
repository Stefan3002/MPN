import './App.css';
import {Route, Routes} from "react-router";
import NavigationExtension from "./components/navigation-extension/navigation-extension";
import Navigation from "./components/navigation/navigation";
import {useDispatch, useSelector} from "react-redux";
import {getNavigationExtended} from "./store/navigation/navigation-selectors";
import AuthPage from "./components/landing-page-components/auth-page/auth-page";
import {useEffect} from "react";
import {onAuthStateChangedListener} from "./utils/firebase/firebase";
import {setUser, setUserData} from "./store/user/user-actions";
import ProfilePage from "./components/profile-page/profile-page";
import NotebookPage from "./components/notebook-page/notebook-page";
import {setLanguages} from "./store/utils/utils-actions";
import HomePage from "./components/home-page/home-page";
import FeedPage from "./components/feed-page/feed-page";
import PublicProfilePage from "./components/public-profile-page/public-profile-page";
import FollowingPage from "./components/following-page/following-page";
import {getError, getErrorMessage} from "./store/error/error-selectors";
import ErrorModal from "./components/error-modal/error-modal";
import Blur from "./components/blur/blur";
import {getLoading} from "./store/utils/utils-selectors";
import Loader from "./components/loader/loader";
import {setError, setErrorMessage} from "./store/error/error-actions";

function App() {
    const navigationExtended = useSelector(getNavigationExtended)
    const dispatch = useDispatch()
    const error = useSelector(getError)
    const errorMessage = useSelector(getErrorMessage)
    const loading = useSelector(getLoading)

    useEffect(() => {
        (async () => {
            try{
                const response = await fetch(`${process.env.REACT_APP_BACKURL}/utils/languages`, {
                    method: 'GET'
                })
                const responseData = await response.json()
                if(!response.ok)
                    throw new Error(responseData.errorMessage)
                else{
                    dispatch(setLanguages(responseData.languages))
                }
            }catch (err) {
                dispatch(setError(true))
                dispatch(setErrorMessage(err.message))
            }
        })()
        onAuthStateChangedListener(async (user) => {
            try{
                const userData = await fetch(`${process.env.REACT_APP_BACKURL}/auth/userData/${user.uid}`, {
                    method: 'GET'
                })
                dispatch(setUser(user))
                const userDataJson = await userData.json()
                dispatch(setUserData(userDataJson.userData))
            }catch (err){
                console.log(err)
            }
        })
    }, [])

    // useEffect(() => {
    //     if(!user)
    //         navigate('/auth')
    // }, [user])
  return (
    <div className="App">
        {loading && <div><Blur /><Loader /></div>}
        {error && <div> <Blur /><ErrorModal errorMessage={errorMessage} /></div>}
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
