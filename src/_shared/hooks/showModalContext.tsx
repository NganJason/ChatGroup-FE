import { useState, createContext } from "react"

export const ModalContext = createContext({
  showSidebarMenu: false,
  showChannelInfo: false,
  showAddChannelModal: false,
  showAddMemberModal: false,
  setShowChannelInfo: (input: boolean) => {},
  setShowSidebarMenu: (input: boolean) => {},
  setShowAddChannelModal: (input: boolean) => {},
  setShowAddMemberModal: (input: boolean) => {},
  toggleShowSidebarMenu: () => {},
  toggleShowChannelInfo: () => {},
  toggleShowAddChannelModal: () => {},
  toggleShowAddMemberModal: () => {},
});

type ShowModalProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const ShowModalProvider = (props: ShowModalProviderProps) => {
    const { children } = props

    const [ showSidebarMenu, setShowSidebarMenu ] = useState(false);
    const [ showChannelInfo, setShowChannelInfo ] = useState(false);
    const [ showAddChannelModal, setShowAddChannelModal ] = useState(false);
    const [ showAddMemberModal, setShowAddMemberModal ] = useState(false);

    const toggleShowChannelInfo = () => {
        setShowChannelInfo(!showChannelInfo)
    }

    const toggleShowSidebarMenu = () => {
        setShowSidebarMenu(!showSidebarMenu)
    }

    const toggleShowAddChannelModal = () => {
      setShowAddChannelModal(!showAddChannelModal)
    }

    const toggleShowAddMemberModal = () => {
      setShowAddMemberModal(!showAddMemberModal)
    }

    return (
      <ModalContext.Provider
        value={{
          showSidebarMenu,
          showChannelInfo,
          showAddChannelModal,
          showAddMemberModal,
          setShowChannelInfo,
          setShowSidebarMenu,
          setShowAddChannelModal,
          setShowAddMemberModal,
          toggleShowChannelInfo,
          toggleShowSidebarMenu,
          toggleShowAddChannelModal,
          toggleShowAddMemberModal,
        }}
      >
        {children}
      </ModalContext.Provider>
    );
}