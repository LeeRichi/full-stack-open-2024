const Header = ({ courses }) =>
{
  return (
      <h1>{courses.map(course => course.name)}</h1>
  )
}

export default Header