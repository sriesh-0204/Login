import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../../api/api';
import { Images } from '../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!isChecked) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    const isSuccess = fakeApiLogin(username, password);
    
    if (isSuccess) {
      navigate('/home');
    } else {
      setError('Login failed. Please check your username and password.');
    }
  };

  const fakeApiLogin = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    return user !== undefined;
  };

  return (
    <div className="login">
      <div className="login-container">
        <div>
          <img src={Images.Logo} alt="logo" />
          <h3>Hello there, Sign in to continue</h3>

          <div>
            <form onSubmit={handleLogin} className="login-form">
              <div className="login-input">
                <div className='login-label'>
                  <label>Username/Email</label>
                </div>
                <div className='login-text'>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="login-input">
                <div className='login-label'>
                  <label>Password</label>
                </div>
                <div className="password-container login-text">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-icon"
                  />
                </div>
              </div>
              <button type="submit" className="login-submit">
                Next
              </button>
            </form>
            <div className='login-checkbox'>
              <input 
                type='checkbox' 
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              /> 
              by creating or logging into an account, you are agreeing with our terms & conditions and privacy policies
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
