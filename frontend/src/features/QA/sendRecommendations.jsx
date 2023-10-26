import RecommendationsqaCSS from '@assets/css/sendRecommendations.module.css'

const CourseRecommendationQA = () => {
  return (
    <div>
      <div className={RecommendationsqaCSS.container}>
        <h2 className={RecommendationsqaCSS.leftElement}>
          Course Recommendation
        </h2>
      </div>
      <div className={RecommendationsqaCSS.recommendationform}>
        <form action="#" method="post">
          <label htmlFor="courseName" className={RecommendationsqaCSS.label}>
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            required
            className={RecommendationsqaCSS.input}
          />

          <label
            htmlFor="instructorName"
            className={RecommendationsqaCSS.label}
          >
            Instructor Name
          </label>
          <input
            type="text"
            id="instructorName"
            name="instructorName"
            required
            className={RecommendationsqaCSS.input}
          />

          <label htmlFor="message" className={RecommendationsqaCSS.label}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            className={RecommendationsqaCSS.textarea}
          ></textarea>

          <button type="submit" className={RecommendationsqaCSS.btn}>
            Send Recommendation
          </button>
        </form>
      </div>
    </div>
  )
}

export default CourseRecommendationQA
