import AuthCSS from '@assets/css/auth.module.css'

const NewPassword = () => {
  return (
    <div className={AuthCSS.containerNewpass}>
      <div className={AuthCSS.wrapNewpass}>
        <div className={AuthCSS.headerimg}>
          <span>New Password</span>
        </div>
        <form
          className={AuthCSS.newpasswordform}
          action="index.php"
          method="POST"
        >
          <div className={AuthCSS.newpasswordInput}>
            <input
              className={AuthCSS.input100}
              type="password"
              name="password"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className={AuthCSS.newpasswordInput}>
            <input
              className={AuthCSS.input100}
              type="password"
              name="password"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className={AuthCSS.newpasswordBtn}>
            <button className={AuthCSS.subBtn} name="submit">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPassword
