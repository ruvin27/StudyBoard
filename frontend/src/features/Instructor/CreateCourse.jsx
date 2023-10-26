import CreateCourseCSS from '@assets/css/CreateCourse.module.css'
import MyCoursesCSS from '@assets/css/MyCourses.module.css'
import { useAuth } from '@contexts/AuthContext'
import { useCreateCourse } from '@hooks/course'

const CreateCourse = () => {
  const { mutate } = useCreateCourse()

  const { user } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const _data = {
      course_name: formData.get('courseName'),
      course_description: formData.get('courseDescription'),
      instructor_id: user.userid,
      program_id: formData.get('courseCredit'),
    }

    mutate({})
  }

  return (
    <div>
      <div className={MyCoursesCSS.container}>
        <div className={MyCoursesCSS.leftElement}>
          <h2>Create a new Course</h2>
        </div>
      </div>
      <div className={CreateCourseCSS.courseFormContainer}>
        <form id="courseForm" onSubmit={handleSubmit}>
          <label className={CreateCourseCSS.labelClass} htmlFor="courseName">
            Course Name:
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            className={CreateCourseCSS.createInput}
            required
          />
          <br />
          <br />

          <label
            className={CreateCourseCSS.labelClass}
            htmlFor="courseDescription"
          >
            Description:
          </label>
          <input
            type="text"
            id="courseDescription"
            name="courseDescription"
            className={CreateCourseCSS.createInput}
            required
          />
          <br />
          <br />
          {/* 
					<label className={CreateCourseCSS.labelClass} htmlFor="courseCode">
						Course Code:
					</label>
					<input
						type="text"
						id="courseCode"
						name="courseCode"
						className={CreateCourseCSS.createInput}
						required
					/>
					<br />
					<br /> */}

          {/* <label className={CreateCourseCSS.labelClass} htmlFor="courseCredit">
						Credit:
					</label>
					<input
						type="number"
						id="courseCredit"
						name="courseCredit"
						className={CreateCourseCSS.createInput}
						required
					/>
					<br />
					<br /> */}

          {/* <label
						className={CreateCourseCSS.labelClass}
						htmlFor="courseStartDate"
					>
						Start Date:
					</label>
					<input
						type="date"
						id="courseStartDate"
						name="courseStartDate"
						className={CreateCourseCSS.createInput}
						required
					/>
					<br />
					<br />

					<label className={CreateCourseCSS.labelClass} htmlFor="courseEndDate">
						End Date:
					</label>
					<input
						type="date"
						id="courseEndDate"
						name="courseEndDate"
						className={CreateCourseCSS.createInput}
						required
					/>
					<br />
					<br /> */}

          {/* <label
						className={CreateCourseCSS.labelClass}
						htmlFor="programObjective"
					>
						Program Objective:
					</label>
					<select
						id="programObjective"
						name="programObjective"
						className={CreateCourseCSS.programObjective}
					>
						<option value="objective1">Objective 1</option>
						<option value="objective2">Objective 2</option>
						<option value="objective3">Objective 3</option>
						<option value="objective4">Objective 4</option>
					</select> */}
          <br />
          <br />

          <button type="submit" className={CreateCourseCSS.submitBtn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateCourse
