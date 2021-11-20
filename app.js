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


//Our reducer
let counterReducer = function(state=0, action) {

  switch(action.type) {
    case INCREMENT_COUNTER:
      return state + (+action.payload || 1);
    default:
      return state;
  }
}

//This is the final reducer that gets attached to our store.
const rootReducer = combineReducers ({
  counter: counterReducer,
});

//Middleware
const loggerMiddleware = (middlewareApi) => (next) => (action) => {
  console.log("ACTION DISPATCHED: ", action);
  const ret = next(action);
  console.log("UPDATED STATE: ", middlewareApi.getState());

  return ret;
}

//create the store
let store = createStore(rootReducer, applyMiddleware(loggerMiddleware));
store.subscribe(render);

function render() {
  const state= store.getState();
  document.getElementById("count-val").innerText = state.counter;
}

document.getElementById("counter-block").addEventListener("click", () => {
  store.dispatch(incrementCounter());
})

document.querySelector(".inc-btn").addEventListener("click", function(e) {
  store.dispatch(incrementCounter(e.target.dataset.val));
})

render();
