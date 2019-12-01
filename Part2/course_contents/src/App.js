import React from '../node_modules/react';
import Course from './components/Course';

const App = ({courses}) => {
  return (
    <div>
      <h1>Greetings</h1>
    {courses.map(course => {
        return <Course key={course.id} course={course}/>
    })}
  </div>
  )
}
export default App