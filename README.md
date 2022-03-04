# Pivot
Pivot questions are diagnostic questions during a presentation that allow presenters to identify misconceptions. 
Pivot allows a presenter to attach response data to Google slides so that audience can vote and receive feedback. 

# Important Note -

 This app is part of Pivot google plugin which is not published yet at market place. So you can't test this app stand alone. This app requires code from three different repositories. Please check Backend Repo's read me file first. We have tried to give details about plugin installation which can run locally. But you will need google developer account for that.

## Pivot-Frontend-Student 

The student frontend asks the student to join via a QR code generated from the teacher's frontend, which opens the student's frontend for them and allows them to vote on the polling questions. They receive feedback based on their answers.

### Repos
- https://github.com/roshnig/pivot-backend.git                   (backend)
- https://github.com/roshnig/pivot-frontend-teacher.git          (teacher)
- https://github.com/isle88/pivot-frontend                       (student)

### Hosted version
- https://rhs-pivot-backend.herokuapp.com/                       (backend)
- https://pivot-fe-presenter.netlify.app                         (teacher)
- https://pivot-fe.netlify.app/                                  (student)

### Install
- npm init
- npm i express
- npm i socket.io-client 
- npm i react-router-dom 
- npm i @mui/material @emotion/react @emotion/styled @mui/icons-material 
- npm i axios

