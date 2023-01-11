import { createContext, useState } from "react";

export const ModalContext = createContext()

const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState({

    isShown: false,
    text: "",
    action: "",
    outcome: () => { },
  })

  return <ModalContext.Provider value={{
    modalData,
    setModalData
  }}>
    {children}
  </ModalContext.Provider>
}

export default ModalProvider