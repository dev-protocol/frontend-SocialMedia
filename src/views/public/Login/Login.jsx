import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { LoginUser } from '../../../services/apiCalls';
import { isTokenValid } from '../../../utils/functions';
import { CForm } from '../../../components/CForm/CForm';
import { validateCredentials } from '../../../utils/functions';

export const Login = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});

	const loginFields = [
		{ type: 'email', name: 'email', placeholder: 'Email' },
		{ type: 'password', name: 'password', placeholder: 'Password' },
	];

	const handleLogin = async (credentials) => {
		try {
			const isValid = validateCredentials(credentials);
			if (isValid) {
				const response = await LoginUser(credentials);
				if (response.success) {
					const decodedToken = jwtDecode(response.token);
					const passport = {
						token: response.token,
						tokenData: decodedToken,
					};
					localStorage.setItem('passport', JSON.stringify(passport));
					isTokenValid(decodedToken.exp);
				} else {
					alert(response.message);
				}
			} else {
				setErrors({
					email: 'Invalid email format',
					password: 'Password must be between 8 and 12 characters',
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h1>Login</h1>
			<CForm
				fields={loginFields}
				onSubmit={handleLogin}
				submitButtonText='Login'
			/>
			{errors.email && <div>{errors.email}</div>}
			{errors.password && <div>{errors.password}</div>}
		</>
	);
};
