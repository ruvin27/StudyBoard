import React from 'react';
import '../../assets/css/contact.module.css';

const ContactUsResponses = () => {
  return (
    <div>
     
      <div className="container">
        <div className="left-element">
          <h2>Contact Us Responses</h2>
        </div>
      </div>
      <div className="grades">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Date</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>john@example.com</td>
              <td>2023-09-25</td>
              <td>This is a sample comment.</td>
            </tr>
            <tr>
              <td>jane@example.com</td>
              <td>2023-09-26</td>
              <td>Another sample comment here.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );}

  export default ContactUsResponses;

     
     
