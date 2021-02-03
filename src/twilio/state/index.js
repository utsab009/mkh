import React, { createContext, useContext, useReducer, useState } from 'react';
// import { RoomType } from '../types';
import { TwilioError } from 'twilio-video';
import {
  settingsReducer,
  initialSettings,
  Settings,
  SettingsAction,
} from './settings/settingsReducer';
import axios from 'axios';
import useActiveSinkId from './useActiveSinkId/useActiveSinkId';
// import useFirebaseAuth from './useFirebaseAuth/useFirebaseAuth';
// import usePasscodeAuth from './usePasscodeAuth/usePasscodeAuth.ss';
// import { User } from 'firebase';

// export interface StateContextType {
//   error: TwilioError | null;
//   setError(error: TwilioError | null): void;
//   getToken(name: string, room: string, passcode?: string): Promise<string>;
//   user?: User | null | { displayName: undefined, photoURL: undefined, passcode?: string };
//   signIn: Promise<void>;
//   signOut: Promise<void>;
//   isAuthReady?: boolean;
//   isFetching: boolean;
//   activeSinkId: string;
//   setActiveSinkId(sinkId: string): void;
//   settings: Settings;
//   dispatchSetting: React.Dispatch<SettingsAction>;
//   roomType?: RoomType;
// }

export const StateContext = createContext(null);

/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks fron being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/
export default function AppStateProvider(props) {
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [activeSinkId, setActiveSinkId] = useActiveSinkId();
  const [settings, dispatchSetting] = useReducer(settingsReducer, initialSettings);

  let contextValue = {
    error,
    setError,
    isFetching,
    activeSinkId,
    setActiveSinkId,
    settings,
    dispatchSetting,
  };

  // if (process.env.REACT_APP_SET_AUTH === 'firebase') {
  //   contextValue = {
  //     ...contextValue,
  //     ...useFirebaseAuth(), // eslint-disable-line react-hooks/rules-of-hooks
  //   };
  // } else if (process.env.REACT_APP_SET_AUTH === 'passcode') {
  //   contextValue = {
  //     ...contextValue,
  //     ...usePasscodeAuth(), // eslint-disable-line react-hooks/rules-of-hooks
  //   };
  // } else {
  contextValue = {
    ...contextValue,
    // getToken: async (identity, roomName) => {
    //   const headers = new window.Headers();
    //   const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || '/token';
    //   // const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || '/token';
    //   const params = new window.URLSearchParams({ identity, roomName });

    //   return fetch(`${endpoint}?${params}`, { headers }).then(res => res.text());
    // },
    getToken: async (identity, roomName) => {
      const response = await axios.post(`http://localhost:4000/twilio/getTwilioToken`, {
        room: roomName,
        identity: identity,
      });
      const { data } = response;
      return data;
    },
  };
  // }

  const getToken = (name, room) => {
    setIsFetching(true);
    return contextValue
      .getToken(name, room)
      .then(res => {
        console.log('121 token>>>', { res, name, room });
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        console.log('123 err', err);
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  return (
    <StateContext.Provider value={{ ...contextValue, getToken }}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
}
