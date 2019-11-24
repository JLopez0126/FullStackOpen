import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState } from 'react'

//Button Component for submitting feedback
const Button = (props) => {
	return (
		<button onClick={props.handleClick}>{props.text}</button>
	)
}

//Statistic Component to display single 'statistic'
const Statistic = ({text,value}) =>{
  return(
    <tr>
      <td>
        {text} 
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}


// Statistics Component
const Statistics = ({good,neutral,bad}) => {
  const total = (good+neutral+bad)
  const average = ((good * 1 +neutral * 0+bad * -1)/total)
  const Positive = ((good / total) * 100)

  if(total === 0){
    return(
      <div>
      <p>No Feedback given</p>
    </div> 
    )
  }

  return(<div>
    <table>
      <tbody>
        <Statistic text="Good" value = {good}/>
        <Statistic text="neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="Total" value={total} />
        <Statistic text="Average" value={average} />
        <Statistic text="Positive" value={Positive}  />
      </tbody>
    </table>
  </div>
  )
}



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlegood =() => setGood(good + 1)
  const handleneutral =() => setNeutral(neutral + 1)
  const handlebad =() =>  setBad(bad + 1)
  return (
    <div>
      <h1>
        Give Feedback
      </h1>
      <Button handleClick = {handlegood} text="Good"/>
      <Button handleClick = {handleneutral} text="Neutral"/>
      <Button handleClick = {handlebad} text="Bad"/>
      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

ReactDOM.render(<App />, document.getElementById('root'));