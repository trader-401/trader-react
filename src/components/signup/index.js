import React from 'react';
import { connect } from 'react-redux';
import Show from '../show';
import * as actions from '../../store/reducers/auth';
import Form from 'react-bootstrap/Form';
import './signup.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const SignUP = (props) => {
  const state = {
    username: '',
    password: '',
    email: '',
    role: '',
  };




  const handleChange = e => {
    console.log('signuo---->',state);
    state[e.target.name] = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.signup(state.username, state.password, state.email, state.role);
  };


  return (
    <>
      <Show condition={!props.loggedIn}>
        {/* <div className='flexRight'> */}
        <form className='signup' onSubmit={handleSubmit}  >
          <label>Signup</label>
          <Form.Control
            placeholder="userName"
            name="username"
            onChange={handleChange}>
          </Form.Control>
          <Form.Control
            placeholder="password"
            name="password"
            onChange={handleChange}
          >
          </Form.Control>
          <Form.Control
            placeholder="email"
            name="email"
            onChange={handleChange}
          >
          </Form.Control>
          <Form.Control
            placeholder="role"
            name="role"
            onChange={handleChange}
          >
          </Form.Control>
          <button>SignUP</button>
        </form>
        {/* </div> */}


      </Show>

    </>
  );


};

const mapStateToProps = (state) => {
  console.log('state------>', state);
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
  };
};


const mapDispatchToProps = (dispatch, getState) => ({
  signup: (username, password, email, role) => dispatch(actions.signup(username, password, email, role)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUP);