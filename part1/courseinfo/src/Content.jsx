import Part from "./Part"

const Content = ({ courses }) =>
{
  const results = courses.map(course => course)
  
  return (
    <div>
      {results.map((result, i) => (<Part key={i} result={result} />))}
    </div>
  )
}

export default Content