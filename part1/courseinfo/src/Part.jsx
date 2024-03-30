import Total from './Total'

const Part = (props) =>
{
  const { name, parts } = props.result;

  return (
    <div>
      <h2>{name}</h2>
      {parts.map((part, i) => <p key={i}>{part.name}: {part.exercises}</p>)} 
      <Total parts={parts} />
    </div>
  )
}

export default Part