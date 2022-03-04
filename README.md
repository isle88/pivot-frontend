# Pivot
Pivot questions are diagnostic questions during a presentation that allow presenters to identify misconceptions. 
Pivot allows a presenter to attach response data to Google slides so that audience can vote and receive feedback. 

## pivot-frontend-student

### Repos
- https://github.com/isle88/pivot-frontend                       (student)
- https://github.com/roshnig/pivot-frontend-teacher.git          (teacher)
- https://github.com/roshnig/pivot-backend.git                   (backend)

### Hosted version
- https://rhs-pivot-backend.herokuapp.com/                       (backend)
- https://pivot-fe.netlify.app/                                  (student)
- https://pivot-fe-presenter.netlify.app                         (teacher)

### Install
- npm init
- npm i express socket.io-client 
- npm i react-router-dom 
- npm i @mui/material @emotion/react @emotion/styled @mui/icons-material 
- npm i axios
- npm i nodemon -D

### Creating the google apps script project
```
npm install @google/clasp -g
```
With your google account:
```
clasp login
```
Create a new apps script project
```
clasp create pivot
```
Upload to google apps script
```
clasp push
```
Edit in app script editor
```
clasp open
``` 
