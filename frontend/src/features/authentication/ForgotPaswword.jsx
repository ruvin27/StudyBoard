import AuthCSS from '@assets/css/auth.module.css'

const ForgotPassword = () => {
  return (
    <div className={AuthCSS.containerforgotpass}>
      <div className={AuthCSS.wrapForgotpass}>
        <div className={AuthCSS.headerimg}>
          <span>Forgot Password</span>
        </div>
        <form
          className={AuthCSS.forgotpasswordform}
          action="index.php"
          method="POST"
        >
          <div className={AuthCSS.forgotpassInput}>
            <input
              className={AuthCSS.input100}
              type="email"
              name="email"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className={AuthCSS.forgotBtn}>
            <button className={AuthCSS.subBtn} name="submit">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
