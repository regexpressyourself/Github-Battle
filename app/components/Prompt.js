import React from 'react';
import PropTypes from 'react';
import { transparentBg } from '../styles';

function Prompt (props) {
  return (
    <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>

      <h1>{props.header}</h1>
      <div className="col-sm-12">
        <form onSubmit={props.onSubmitUser}>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Github username"
              type="text"
              onChange={props.onUpdateUser}
              value={props.username}
            />
          </div>
          <div className="form-group col-sm-4 col-sm-offset-4 ">
            <button className="btn btn-block btn-success" type="submit">Continue</button>
          </div>
        </form>
      </div>
    </div>
  )
}

Prompt.propTypes = {
  header       : React.PropTypes.string.isRequired,
  onUpdateUser : React.PropTypes.func.isRequired,
  onSubmitUser : React.PropTypes.func.isRequired,
  username     : React.PropTypes.string.isRequired,
}

export default Prompt;
