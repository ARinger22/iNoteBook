import React from 'react'

const Alert = (props) => {
  return (
    <>
      <div className="alert alert-danger" role="alert">
              {console.log(props.message)}
              {props.message}
          </div>
          {/* <div className="alert alert-secondary" role="alert"> 
            {props.message}
          </div>
          <div className="alert alert-success" role="alert"> {props.message}
          </div>
          <div className="alert alert-primary" role="alert"> {props.message}
          </div>
          <div className="alert alert-warning" role="alert"> {props.message}
          </div>
          <div className="alert alert-info" role="alert"> {props.message}
          </div>
          <div className="alert alert-light" role="alert"> {props.message}
          </div>
          <div className="alert alert-dark" role="alert"> {props.message}
          </div> */}
    </>
  )
}

export default Alert
