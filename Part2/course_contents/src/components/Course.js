import React from '../../node_modules/react'


const Course = ({course}) => {

  const parts = course.parts
  const total = parts.reduce( (s, parts) => s + parts.exercises ,0)

  return (
        <div>
          <Hello name={course.name} />
          <Content parts={course.parts} />
          <h4>Total of  {total} exercises</h4>
        </div>             
  )
}

// Course name Component
const Hello = (props) => <h2>{props.name}</h2>
 
//Content Component
const Content = ({parts}) =>
    <div>{parts.map(part => <Part part={part} key={part.id}/>)}</div>


//Parts name Component
const Part = ({part}) =>
    <p>{part.name} {part.exercises}</p>

export default Course