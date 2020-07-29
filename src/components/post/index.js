import React from 'react';
import { connect } from 'react-redux';
import {NavLink } from 'react-router-dom';
import * as actions from '../../store/reducers/profile';
const Post = (props) => {
  
  return (
    <div  id={props.data._id}>
      <p>{props.data.title}</p>
      <p>{props.data.description}</p>
      <NavLink to= {`/edit/${props.data._id}`} >edit </NavLink>
      <button onClick={()=>props.deletePost(props.data._id,props.token)}>delete</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log('state------>',state);
  return { 
    user: state.profile.user,
    posts:  state.profile.posts ,
    username: state.auth.username,
    token: state.auth.token,
  };
};


const mapDispatchToProps = (dispatch, getState) => ({
  getUser: (username) => dispatch(actions.getUser(username)),
  getPosts: (username) => dispatch(actions.getPosts(username)),
  deletePost: (id,token)=>dispatch(actions.deletePost(id,token)),
});

// const mapDispatchToProps = { select };
export default connect(mapStateToProps, mapDispatchToProps)(Post);