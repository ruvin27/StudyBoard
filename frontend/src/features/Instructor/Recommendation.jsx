import RecommendationCSS from '@assets/css/NewUser.module.css'
const Recommendation = () => {
  return (
    <div>
      <div>
        <div className={RecommendationCSS.addContainer}>
          <h2 className={RecommendationCSS.addAccessHeader}>Recommendations</h2>
        </div>
        <div className={RecommendationCSS.searchContainer}>
          <input
            type="text"
            className={RecommendationCSS.searchInput}
            placeholder="Search..."
          />
          <button className={RecommendationCSS.searchButton}>Search</button>
        </div>
        <table className={RecommendationCSS.newUsersTable}>
          <thead>
            <tr>
              <th>User Email</th>
              <th>Role</th>
              <th>Course Change Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>user1@example.com</td>
              <td>Program Cordinator</td>
              <td>Suggest providing more practice questions with hints.</td>
            </tr>
            <tr>
              <td>user2@example.com</td>
              <td>QA Officer</td>
              <td>Consider making the exam questions easier.</td>
            </tr>
            <tr>
              <td>user3@example.com</td>
              <td>QA Officer</td>
              <td>No change recommended at this time.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Recommendation
