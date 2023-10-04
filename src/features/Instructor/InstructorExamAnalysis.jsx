import React from 'react';
import ReportsCSS from "../../assets/css/Reports.module.css";
import navbarCSS from "../../assets/css/navbar.module.css";
const InstructorExamAnalysis = () => {
    return(
        <div>
            <div className={ReportsCSS.container}>
			<div className={ReportsCSS.leftElement}><h2>Course Name</h2></div>
		    </div>

		<div className={ReportsCSS.tableContainer}>
			<table>
				<tr>
					<th colspan="2">Exam Analysis</th>
				</tr>
				<tr>
					<td>Exam 1</td>
					<td><span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span></td>
				</tr>
				<tr>
					<td>Exam 2</td>
					<td><span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span></td>
				</tr>
				<tr>
					<td>Exam 3</td>
					<td><span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span></td>
				</tr>
				<tr>
					<td>Exam 4</td>
					<td><span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span></td>
				</tr>
				<tr>
					<td>Exam 5</td>
					<td><span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span></td>
				</tr>
			</table>

			<table>
				<tr>
					<th colspan="2">Student Reports</th>
				</tr>
				<tr>
					<td>Student 1</td>
					<td><span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span></td>
				</tr>
				<tr>
					<td>Student 2</td>
					<td><span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span></td>
				</tr>
				<tr>
					<td>Student 3</td>
					<td><span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span></td>
				</tr>
				<tr>
					<td>Student 4</td>
					<td><span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span></td>
				</tr>
				<tr>
					<td>Student 5</td>
					<td><span className={ReportsCSS.downloadIcon}>&#x1F4E5;</span></td>
				</tr>
			</table>
		</div>
		<div className={navbarCSS.chatContainer}>
    <div className={navbarCSS.chatHeader}>Instant Messaging</div>
    <div className={navbarCSS.chatMessages}>
        <div className={navbarCSS.message}>Alice: Hi there!</div>
        <div className={navbarCSS.message}>Bob: Hey, Alice! How are you?</div>
        <div className={navbarCSS.message}>Alice: I'm good, thanks. How about you?</div>
        <div className={navbarCSS.message}>Bob: I'm doing well too.</div>
        <div className={navbarCSS.message}>Alice: That's great to hear!</div>
    </div>
    <div className={navbarCSS.chatInput}>
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
    </div>
    </div>
        </div>
    );
}
export default InstructorExamAnalysis;
