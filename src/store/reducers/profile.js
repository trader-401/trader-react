import superagent from 'superagent';
import axios from 'axios';
import cookie from 'react-cookies';


const initialState = {
  user: {},
  posts: [],
  user1: {},
  posts1: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  // console.log('action ---->',payload,type);
  switch (type) {
  case 'setUser':
    return {...state,user : payload};
    case 'setUser1':
      return {...state,user1 : payload};
  case 'setPosts':
    return {...state,posts : payload};
    case 'setPosts1':
      return {...state,posts1 : payload};
  case 'clear':
    console.log('clear......----->');
    return initialState;
  case 'delete':
    console.log('delete......----->');
    let newPosts = state.posts1.filter(post=>post._id !== payload._id) ;
    return {...state,posts : newPosts};
  default:
    return state;
  }
};

export const select = (name) => {
    
  return {
    type: 'categories',
    payload: name,
  };
};

export const getUser = (username , token) => dispatch => {
  // const token = cookie.load('auth');

  let api = `https://trader401.herokuapp.com/user/${username}`;
  console.log('token inside profile---->',token);
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' 
      ,'Authorization': `Bearer ${token}`},
    cache: 'no-cache',
  };
  console.log('token inside profile / options---->',token,options,api);
  axios.get(api, options)
    .then(data => {
      console.log('getuser',data.data.user);
      dispatch(setUser(data.data.user));
    });
};
export const getUser1 = (username , token) => dispatch => {
  // const token = cookie.load('auth');

  let api = `https://trader401.herokuapp.com/user/${username}`;
  console.log('token inside profile---->',token);
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' 
      ,'Authorization': `Bearer ${token}`},
    cache: 'no-cache',
  };
  console.log('token inside profile / options---->',token,options,api);
  axios.get(api, options)
    .then(data => {
      console.log('getuser',data.data.user);
      dispatch(setUser1(data.data.user));
    });
};
export const setUser = payload => {
  return {
    type: 'setUser',
    payload: payload,
  };
};
export const setUser1 = payload => {
  return {
    type: 'setUser1',
    payload: payload,
  };
};
export const clear = () => {
  console.log('clear....222222..----->');
  return {
    type: 'clear',
    payload: 'nan',
  };
};

export const getPosts = (username ,token ) => dispatch => {
  // const token = cookie.load('auth');

  let api = `https://trader401.herokuapp.com/user/${username}`;
  
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
    cache: 'no-cache',
  };
  axios.get(api,options)
    .then(data => {
      console.log('getposts',data.data.data||[]);
      dispatch(setPosts(data.data.data||[]));
    });
};

export const getPosts1 = (username ,token ) => dispatch => {
  // const token = cookie.load('auth');

  let api = `https://trader401.herokuapp.com/user/${username}`;
  
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
    cache: 'no-cache',
  };
  axios.get(api,options)
    .then(data => {
      console.log('getposts',data.data.data||[]);
      dispatch(setPosts1(data.data.data||[]));
    });
};
export const deletePost = (id,token) => dispatch => {
  let api = `https://trader401.herokuapp.com/search/${id}`;
  
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
    cache: 'no-cache',
  };
  axios.delete(api,options)
    .then(data => {
      console.log('deletepost',data||[]);
      dispatch(delPost(data.data||[]));
    });
};
export const delPost = payload => {
  return {
    type: 'delete',
    payload: payload,
  };
};
export const setPosts = payload => {
  return {
    type: 'setPosts',
    payload: payload,
  };
};
export const setPosts1 = payload => {
  return {
    type: 'setPosts1',
    payload: payload,
  };
};