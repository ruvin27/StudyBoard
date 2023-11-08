<!DOCTYPE html>
            <html>
            <head>
            <style>
              /* Add your CSS styles here */
              body {
                font-family: Arial, sans-serif;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
              }
              .message {
                font-size: 16px;
                margin-bottom: 20px;
              }
              .reset-link {
                font-size: 16px;
                color: #007bff;
                text-decoration: none;
              }
            </style>
            </head>
            <body>
            <div class='container'>
              <p class='message'>Hello, {{$receiverName}}</p>
              <p class='message'>You have requested to reset your password. Please click the following link to set up your new password:</p>
              <p class='reset-link'><a href="http://localhost:3000/newpassword/{{$receiverEmail}}/{{$verificationCode}}">Reset Your Password</a></p>
              <p class='message'>If you did not request this reset, please ignore this email.</p>
            </div>
            </body>
            </html>