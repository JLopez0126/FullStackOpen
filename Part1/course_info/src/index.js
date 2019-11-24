import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//Displaying Course name Component
const Hello = (props) => {
    return (
      <div>
        <p>
          {props.course.name}
        </p>
      </div>
    )
  }

  //Parts name Component
  const Content = (props) => {
    return (
      <div>
        <Parts parts = {props.parts[0]} />
        <Parts parts = {props.parts[1]} />
        <Parts parts = {props.parts[2]} />

      </div>
    )
  }
  //Displaying individual Parts
  const Parts = (props) => {
      return(
          <div>
              {props.parts.name} {props.parts.exercises}
          </div>
      )
  }
  const Total =(props) => {
      return(
        <div>
            Total exercises is {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}
        </div>
      )
  }
  
  const App = () => {
    const course = {
        name : 'Half Stack application development',
        parts: [
            {
              name: 'Fundamentals of React',
              exercises: 13
            },
            {
              name: 'Using props to pass data',
              exercises: 8
            },
            {
              name: 'State of a component',
              exercises: 10
            }
          ]
        }
  
    return (
      <div>
        <h1>Greetings</h1>,
            <Hello course={course} />,
            <Content parts={course.parts} />
            <Total parts = {course.parts} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));