import { useState, createContext } from "react";
import { User } from "../apis/chat_group";
import { channelsInfoMap, userInfo } from "../types/types";
import { useChannelsMembers } from "./useChannelsMembers";
import { useChannelsMessages } from "./useChannelsMessages";
import { useUserChannel } from "./useUserChannel";

export const DataContext = createContext({
  user: {} as User,
  setUser: (input: User) => {},
  channelsMap: {} as channelsInfoMap,
  clearUnread: (input: number) => {},
  addChannel: (input: string) => {},
});

type DataProviderProps = {
    children: JSX.Element | JSX.Element[];
}

export const DataProvider = (props: DataProviderProps) => {
    const { children } = props

    const { 
        user,
        setUser,
        channelsMap,
        clearUnread, 
        addChannel
    } =
      useUserChannel();

      return (
        <DataContext.Provider
          value={{
            user,
            setUser,
            channelsMap,
            clearUnread,
            addChannel,
          }}
        >
          {children}
        </DataContext.Provider>
      );
}