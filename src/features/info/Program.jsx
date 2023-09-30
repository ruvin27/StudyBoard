import React from 'react'
import ProgramImg from '../../assets/images/program.jpg'
import ProgramCSS from '../../assets/css/program.module.css'

const Program = () => {
    return ( 
        <div className={ProgramCSS.container}>
        <div className={ProgramCSS.programDetails}>
            <div className={ProgramCSS.contentHeader}><h1>Masters of Science in Data Science</h1></div>
            <div className={ProgramCSS.frontImage}>
                <img src={ProgramImg} alt=""/>
            </div>
            <ul>
                <li>Develop a strong foundation in data analysis and statistical techniques.</li>
                <li>Master machine learning algorithms and their applications in real-world scenarios.</li>
                <li>Gain expertise in data visualization and storytelling with data.</li>
                <li>Understand the ethical considerations and responsible use of data science tools.</li>
                <li>Complete a comprehensive data science project from data collection to analysis.</li>
            </ul>
            <div className={ProgramCSS.courseButtonStyle}>
                <a href="../Student/allcourses.html"><button className={ProgramCSS.coursesButton}>All Courses</button></a>
            </div>
        </div>
    </div>
     );
}
 
export default Program;