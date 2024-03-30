import { useState } from 'react'
import Button from '../src/Button'

const StatisticLine = (props) =>
{
  const { text, value } = props;

  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) =>
{
  const { good, neutral, bad } = props;
  const sum = good + neutral + bad
    if (sum === 0){
      return (
        <div>
          <p>No feedback given</p>
        </div>
      )
    }
  return (
    <table>
      <tbody>
        <h1>statistics</h1>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={sum} />
        <StatisticLine text="averge" value={(good * 1 + bad * (-1))/sum * 100 + '%'}/>
        <StatisticLine text="positive" value={good / sum * 100 + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment_state = (setter, currentValue) =>
  {
    setter(currentValue + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => increment_state(setGood, good)} text="good" />
      <Button handleClick={() => increment_state(setNeutral, neutral)} text="neutral" />
      <Button handleClick={() => increment_state(setBad, bad)} text="bad" />    
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App