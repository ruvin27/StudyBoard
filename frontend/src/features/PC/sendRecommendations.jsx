import SendRecommendationsCSS from '@assets/css/sendRecommendations.module.css'

const SendRecommendations = () => {
  return (
    <div>
      <div className={SendRecommendationsCSS.container}>
        <h2 className={SendRecommendationsCSS.leftElement}>
          Course Recommendation
        </h2>
      </div>
      <div className={SendRecommendationsCSS.recommendationform}>
        <form action="#" method="post">
          <label htmlFor="courseName" className={SendRecommendationsCSS.label}>
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            required
            className={SendRecommendationsCSS.input}
          />

          <label
            htmlFor="instructorName"
            className={SendRecommendationsCSS.label}
          >
            Instructor Name
          </label>
          <input
            type="text"
            id="instructorName"
            name="instructorName"
            required
            className={SendRecommendationsCSS.input}
          />

          <label htmlFor="message" className={SendRecommendationsCSS.label}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            className={SendRecommendationsCSS.textarea}
          ></textarea>

          <button type="submit" className={SendRecommendationsCSS.btn}>
            Send Recommendation
          </button>
        </form>
      </div>
    </div>
  )
}

export default SendRecommendations
