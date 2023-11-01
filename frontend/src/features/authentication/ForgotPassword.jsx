import AuthCSS from '@assets/css/auth.module.css'
import React, {useState} from 'react';
import { apiClient } from '@lib/apiClient';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     apiClient
      .post(`/authentication/forgotpassword.php`, {
        email: email,
      })
      .then(async (res) => {
        alert(res.data.message);
      });
  };
  return (
    <div className={AuthCSS.containerforgotpass}>
      <div className={AuthCSS.wrapForgotpass}>
        <div className={AuthCSS.headerimg}>
          <span>Forgot Password</span>
        </div>
        <form
          className={AuthCSS.forgotpasswordform}
          onSubmit={handleSubmit}
        >
          <p style={{ color: 'red' }}>A password reset link will be sent to the Email*</p>
          <div className={AuthCSS.forgotpassInput}>
            <input
              className={AuthCSS.input100}
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              value={email} // Bind the input value to the 'email' state
              onChange={handleChange} // Handle input changes
            />
          </div>
          <div className={AuthCSS.forgotBtn}>
            <button className={AuthCSS.subBtn} name="submit" type="submit">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
