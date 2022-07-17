import { useState, createContext, useEffect } from "react"

export const ModalContext = createContext({
  showSidebarMenu: false,
  showChannelInfo: false,
  showAddChannelModal: false,
  setShowChannelInfo: (input: boolean) => {},
  setShowSidebarMenu: (input: boolean) => {},
  setShowAddChannelModal: (input: boolean) => {},
  toggleShowSidebarMenu: () => {},
  toggleShowChannelInfo: () => {},
  toggleShowAddChannelModal: () => {},
});

type ShowModalProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const ShowModalProvider = (props: ShowModalProviderProps) => {
    const { children } = props

    const [ showSidebarMenu, setShowSidebarMenu ] = useState(false)
    const [ showChannelInfo, setShowChannelInfo ] = useState(false)
    const [ showAddChannelModal, setShowAddChannelModal ] = useState(false);

    const toggleShowChannelInfo = () => {
        setShowChannelInfo(!showChannelInfo)
    }

    const toggleShowSidebarMenu = () => {
        setShowSidebarMenu(!showSidebarMenu)
    }

    const toggleShowAddChannelModal = () => {
      setShowAddChannelModal(!showAddChannelModal)
    }

    useEffect(() => {
        console.log(showChannelInfo)
    }, [showChannelInfo])
    return (
      <ModalContext.Provider
        value={{
          showSidebarMenu,
          showChannelInfo,
          showAddChannelModal,
          setShowChannelInfo,
          setShowSidebarMenu,
          setShowAddChannelModal,
          toggleShowChannelInfo,
          toggleShowSidebarMenu,
          toggleShowAddChannelModal
        }}
      >
        {children}
      </ModalContext.Provider>
    );
}