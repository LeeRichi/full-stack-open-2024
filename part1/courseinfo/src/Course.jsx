import Header from "./Header"
import Content from "./Content"

const Course = ({ courses }) =>
{
  return (
      <>
        <Header courses={courses} />
        <Content courses={courses} />
      </>
  )
}

export default Course