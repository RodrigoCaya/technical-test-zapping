import React, { useState } from 'react';
import { createUser } from '../api/user/index.js';
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  
  const handleCreateUser = async (e) => {
    try {
      await createUser({ name: form.name, email: form.email, password: form.password });
      setShowError(false);
      setShowSuccess(true);
      setForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'User already exists') {
        setError('El usuario ya existe');
        setShowError(true);
      } else {
        console.error('Error during user creation:', error);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if password is valid
    if (!form.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
      setError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número');
      setShowError(true);
      return;
    }
    // check if passwords match
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setShowError(true);
      return;
    }
    setShowError(false);
    handleCreateUser();
  }
  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <title>Crear cuenta</title>
        </Helmet>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <h1 className="text-center">Crear cuenta</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="inputName">Nombre <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name='name'
                    value={form.name}
                    placeholder="Nombre"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputEmail">Correo electrónico <span className="text-danger">*</span></label>
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
                  <label htmlFor="inputPassword">Contraseña <span className="text-danger">*</span></label>
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
                <div className="form-group">
                  <label htmlFor="inputConfirmPassword">Confirmar contraseña <span className="text-danger">*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    name='confirmPassword'
                    value={form.confirmPassword}
                    placeholder="Confirmar contraseña"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary btn-lg">Crear cuenta</button>
                </div>
                <p className="text-center mt-3">
                  ¿Ya estás registrado? <a href="/">Inicia sesión</a>
                </p>
              </form>
              <div className="alert alert-danger mt-3" hidden={!showError}>
                <p>{error}</p>
              </div>
              <div className="alert alert-success mt-3" hidden={!showSuccess}>
                <p>Usuario creado con éxito</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default CreateAccount;