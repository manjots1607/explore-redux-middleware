const { applyMiddleware, createStore, combineReducers } = Redux;

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

// ACTION CREATORS

// INCREMENT COUNTER
let incrementCounter = function(val) { 
  //return an action
  return {
    type: INCREMENT_COUNTER,
    payload: val
  }
}

const delayedIncrement = function(val) {
  return function(dispatch, getState) {
    // We can put sideeffect here....
    setTimeout(() => {
      dispatch(incrementCounter(val));
    }, 1000);
  }
}

//Our reducer
let counterReducer = function(state=0, action) {

  switch(action.type) {
    case INCREMENT_COUNTER:
      return state + (action.payload || 1);
    default:
      return state;
  }
}

//This is the final reducer that gets attached to our store.
const rootReducer = combineReducers ({
  counter: counterReducer,
});

const logger = (middlewareApi) => (next) => (action) => {
  console.log("ACTION DISPATCHED: ", action);
  const ret = next(action);
  console.log("NEW STATE: ", middlewareApi.getState());
}

// my own thunk
const myThunk = (middlewareApi) => (next) => (action) => {
  if (typeof action == "function" ) {
    action(middlewareApi.dispatch, middlewareApi.getState);
  } else {
    return next(action);
  }
}

//create the store
let store = createStore(rootReducer, applyMiddleware(logger, myThunk));
store.subscribe(render);

function render() {
  const state= store.getState();
  document.getElementById("count-val").innerText = state.counter;
}

document.getElementById("counter-block").addEventListener("click", () => {
  store.dispatch(incrementCounter());
});

document.querySelector(".inc-delay-btn").addEventListener("click", () => {
  store.dispatch(delayedIncrement());
})

render();
