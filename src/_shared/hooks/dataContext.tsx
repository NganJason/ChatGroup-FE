import { useState, useEffect, createContext } from "react";
import { User } from "../apis/chat_group";
import { channelsInfoMap } from "../types/types";
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
});

type DataProviderProps = {
    children: JSX.Element | JSX.Element[];
}

export const DataProvider = (props: DataProviderProps) => {
    const { children } = props

    const [ currChannel, setCurrChannel ] = useState("")
    const { 
        user,
        setUser,
        channelsMap,
        clearUnread, 
        addChannel
    } =
      useUserChannel();

    const { getCurrChannelMembers } = useChannelsMembers(currChannel);

    // useEffect(() => {
    //   clearUnread(currChannel);
    // }, [clearUnread, currChannel]);

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
          }}
        >
          {children}
        </DataContext.Provider>
      );
}