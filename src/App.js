import React, { useRef, useEffect, createContext, useContext, useReducer } from 'react';

const useFlasher = () => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.classList.add('flash');
    setTimeout(() => {
      ref.current.classList.remove('flash');
    }, 300);
  });
  return ref
};

const initialState = {
  count1: 0,
  count2: 0,
  count3: 0
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        [action.name]: state[action.name] + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        [action.name]: state[action.name] - 1,
      };
    default:
      return state
  }
}

const useValue = () => useReducer(reducer, initialState);

const Context = createContext(null);

const useGlobalState = () => {
  const value = useContext(Context);
  if (value == null) throw new Error('Please add GlobalStateProvider');
  return value;
}

const GlobalStateProvider = ({ children }) => (
  <Context.Provider value={useValue()}>{children}</Context.Provider>
);

const Counter = ({ name }) => {
  const [state, dispatch] = useGlobalState();

  return (
    <div ref={useFlasher()}>
      {state[name]}
      <button onClick={() => dispatch({ type: 'INCREMENT', name})}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT', name})}>-1</button>
    </div>
  );

};


const App = () => (
  <GlobalStateProvider>
    <h1>Count1</h1>
    <Counter name="count1"/>
    <Counter name="count1"/>
    <h1>Count2</h1>
    <Counter name="count2"/>
    <Counter name="count2"/>
    <h1>Count3</h1>
    <Counter name="count3"/>
    <Counter name="count3"/>
  </GlobalStateProvider>
);

export default App;