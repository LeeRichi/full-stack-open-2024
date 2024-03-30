import './index.css'

const Notification = ({message, errorFlag}) => {
    return (
      errorFlag ?  <div className='message_error'>{message}</div> :  <div className='message_success'>{message}</div>
  )
}

export default Notification