import axios from 'axios';
import { setAlert } from './alert.jsx';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
	BASE_URL,
} from './types.js';
import setAuthToken from '../utils/setAuthToken.jsx';

//load user
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get(`${BASE_URL}/api/auth`);

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

//register user
export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const config = {
			headers: {
				'content-type': 'application/json',
			},
		};

		const body = JSON.stringify({ name, email, password });
		try {
			const res = await axios.post(`${BASE_URL}/api/users`, body, config);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, 'danger', 3000))
				);
			}
			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

//login user
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'content-type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });
	try {
		const res = await axios.post(`${BASE_URL}/api/auth`, body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 3000)));
		}
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

//Logout / clean profile
export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};
