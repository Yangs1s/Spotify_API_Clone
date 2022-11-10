import React, { createContext, useContext, useReducer } from 'react';


interface StateProviderType {
    children:any,
    initialState:any,
    reducer :any
}


export const StaetContext = createContext<any | null>(null);


const StateProvider = ({children,initialState,reducer}:StateProviderType) => {
    return (
        <StaetContext.Provider value={useReducer(reducer,initialState)}>
            {children}
        </StaetContext.Provider>
    );
};

export default StateProvider;


export const useSteteProvider = () =>{
   const value = useContext(StaetContext);

   if(!value){
    throw new Error('do not use useStateProvider')
   }
   return value;
}