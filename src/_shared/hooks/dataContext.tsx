import { useState, createContext } from "react";
import { Message, User } from "../apis/chat_group";
import { channelsInfoMap, channelsMessagesMap } from "../types/types";
import { useChannelsMembers } from "./useChannelsMembers";
import { useChannelsMessages } from "./useChannelsMessages";
import { useUserChannel } from "./useUserChannel";

export const DataContext = createContext({
  user: {} as User,
  setUser: (input: User) => {},
  channelsMap: {} as channelsInfoMap,
  clearUnread: (input: string) => {},
  addChannel: (input: string) => {},
  currChannel: "",
  setCurrChannel: (input: string) => {},
  getCurrChannelMembers: () => [] as User[],
  addMembers: (channelID: string, userIDs: string[]) => {},
  createMessage: (channelID: string, content: string) => {},
  channelsMessagesMap: {} as channelsMessagesMap,
  messageLoading: false,
  addMessage: (channelID: string, message: Message) => {},
});

type DataProviderProps = {
    children: JSX.Element | JSX.Element[];
}

export const DataProvider = (props: DataProviderProps) => {
    const { children } = props

    const [ 
      currChannel, 
      setCurrChannel 
    ] = useState("")

    const { 
        user,
        setUser,
        channelsMap,
        clearUnread, 
        addChannel
    } =
      useUserChannel();

    const { 
      getCurrChannelMembers,
      addMembers,
    } = useChannelsMembers(currChannel);

    const {
      createMessage, 
      channelsMessagesMap, 
      messageLoading,
      addMessage,
    } = useChannelsMessages(currChannel)

    return (
      <DataContext.Provider
        value={{
          user,
          setUser,
          channelsMap,
          clearUnread,
          addChannel,
          currChannel,
          setCurrChannel,
          getCurrChannelMembers,
          addMembers,
          createMessage,
          channelsMessagesMap,
          messageLoading,
          addMessage,
        }}
      >
        {children}
      </DataContext.Provider>
    );
}