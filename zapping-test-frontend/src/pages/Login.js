import React from 'react';
import './styles/Login.css';
import { login } from '../api/user/index.js';
import { useAuth } from '../auth/AuthContext';
import { Helmet, HelmetProvider } from "react-helmet-async";

const Login = () => {
  const { authLogin } = useAuth();

  const [form, setForm] = React.useState({
    email: '',
    password: ''
  });
  const [error, setError] = React.useState('');
  const [showError, setShowError] = React.useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = form; 
      const loginResponse = await login({ email, password });
      setShowError(false);
      await authLogin(loginResponse);
    } catch (error) {
      if (!error.response || error.response.status !== 401) {
        console.error('Error during login:', error);
      }
      setError('Correo electrónico o contraseña incorrectos');
      setShowError(true);
    }
  }
  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-9 col-sm-10 col-md-8 col-lg-6 col-xl-6">
              <h1 className="text-center">Login</h1>
              <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="inputEmail">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    name='email'
                    value={form.email}
                    placeholder="Correo electrónico"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="inputPassword">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name='password'
                    value={form.password}
                    placeholder="Contraseña"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <a href="/account" type="button" className="btn btn-light btn-lg">Crear cuenta</a>
                  <button type="submit" className="btn btn-primary btn-lg">Iniciar sesión</button>
                </div>
                <div className="alert alert-danger mt-3" hidden={!showError}>
                  <p>{error}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Login;