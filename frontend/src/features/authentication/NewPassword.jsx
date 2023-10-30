import React, { useState } from 'react';
import AuthCSS from '@assets/css/auth.module.css';
import { useParams } from 'react-router-dom';
import { apiClient } from '@lib/apiClient';
import { useNavigate } from 'react-router-dom'

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { email,code } = useParams();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please make sure the passwords match.'); // Passwords don't match.
    } else if (password.length <= 5) {
      alert('Password too short. Please use a longer password.'); // Password is too short.
    } else {
      apiClient
      .post(`/authentication/resetpassword.php`, {
        email: email,
        code: code,
        password: password
      })
      .then(async (res) => {
        alert(res.data.message);
        if(res.data.code === 200){
          navigate('/login');
        }
      });
    }
  };
  

  return (
    <div className={AuthCSS.containerNewpass}>
      <div className={AuthCSS.wrapNewpass}>
        <div className={AuthCSS.headerimg}>
          <span>New Password</span>
        </div>
        <form
          className={AuthCSS.newpasswordform}
          onSubmit={handleSubmit}
        >
          <div className={AuthCSS.newpasswordInput}>
            <input
              className={AuthCSS.input100}
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className={AuthCSS.newpasswordInput}>
            <input
              className={AuthCSS.input100}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className={AuthCSS.newpasswordBtn}>
            <button className={AuthCSS.subBtn} name="submit" type="submit">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
