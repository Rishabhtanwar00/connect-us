import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar.jsx';
import Landing from './components/layout/Landing.jsx';
import Register from '../src/components/auth/Register.jsx';
import Login from '../src/components/auth/Login.jsx';
import Alert from './components/layout/Alert.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import PrivateRoute from './components/routing/PrivateRoute.jsx';
import setAuthToken from './utils/setAuthToken.jsx';
import CreateProfile from './components/profile-forms/CreateProfile.jsx';
import EditProfile from './components/profile-forms/EditProfile.jsx';
import AddExperience from './components/profile-forms/AddExperience.jsx';
import AddEducation from './components/profile-forms/AddEducation.jsx';
import Profiles from './components/profiles/Profiles.jsx';
import Profile from './components/profile/Profile.jsx';
import Posts from './components/posts/Posts.jsx';
import Post from './components/post/Post.jsx';
import PageNotFound from './components/layout/PageNotFound.jsx';
import { loadUser } from './actions/auth.jsx';

//redux
import { Provider } from 'react-redux';
import Store from './store.jsx';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}
const App = () => {
	useEffect(() => {
		Store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={Store}>
			<Router>
				<Alert />
				<Navbar />
				<Routes>
					<Route exact path='/' element={<Landing />} />
					<Route exact path='/register' element={<Register />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/profiles' element={<Profiles />} />
					<Route exact path='/profile/:id' element={<Profile />} />
					<Route
						exact
						path='/dashboard'
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path='/create-profile'
						element={
							<PrivateRoute>
								<CreateProfile />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path='/edit-profile'
						element={
							<PrivateRoute>
								<EditProfile />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path='/add-experience'
						element={
							<PrivateRoute>
								<AddExperience />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path='/add-education'
						element={
							<PrivateRoute>
								<AddEducation />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path='/posts'
						element={
							<PrivateRoute>
								<Posts />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path='/posts/:id'
						element={
							<PrivateRoute>
								<Post />
							</PrivateRoute>
						}
					/>
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</Router>
		</Provider>
	);
};

export default App;
