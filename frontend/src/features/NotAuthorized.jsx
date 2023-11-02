const NotAuthorized = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <h1>Not Authorized</h1>
      <p>You are not authorized to access this page. Contact Your Administrator for approval.</p>
    </div>
  )
}

export default NotAuthorized
