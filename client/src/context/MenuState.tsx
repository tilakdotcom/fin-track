import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


interface OpenContxtType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const openContext = createContext<OpenContxtType|undefined>(undefined)

export const OpenStateProvider : React.FC<{children:React.ReactNode}>=({children})=>{
  const [open, setOpen] = useState(false);
  return (
    <openContext.Provider value={{open, setOpen}}>
      {children}
    </openContext.Provider>
  )
}

export const useMenu =()=>{
  const context = useContext(openContext)
  if(!context) throw new Error("OpenContext is not provided")
  return context
}