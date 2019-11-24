import './index.css';
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote,setVote] = useState(new Array(anecdotes.length).fill(0))
  
  //Votes
  const copy = ()=>{
    const copyVotes = [...vote]
    copyVotes[selected] += 1
    setVote(copyVotes)
  }
  
  //Creating a Random Number
  const randomAnecdote = ()  => {
    setSelected(Math.floor(Math.random() * 6))
  }

  return (
    <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <h6>Has {vote[selected]} Votes</h6>
      <button onClick={copy} >Vote</button>
      <button onClick={randomAnecdote}>next anecdotes</button>
      <div>
          <h1>Anecdote with most votes</h1>
            {anecdotes[vote.indexOf( Math.max(...vote))]}
            <br/>
            Has {vote[vote.indexOf( Math.max(...vote))]} Votes
      </div>
      

      
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

