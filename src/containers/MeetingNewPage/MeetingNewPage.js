import React from 'react';
import { styled, Theme } from '@material-ui/core/styles';

// import MenuBar from './../../components/MenuBar/MenuBar';
// import MobileTopMenuBar from './../../components/MobileTopMenuBar/MobileTopMenuBar';
import PreJoinScreens from './../../twilio/components/PreJoinScreens/PreJoinScreens';
// import ReconnectingNotification from './../../components/ReconnectingNotification/ReconnectingNotification';
import Room from './../../twilio/components/Room/Room';
import { VideoProvider } from './../../twilio/components/VideoProvider';
import useHeight from './../../twilio/hooks/useHeight/useHeight';
import useRoomState from '../../twilio/hooks/useRoomState/useRoomState';
import useConnectionOptions from './../../twilio/utils/useConnectionOptions/useConnectionOptions';
import AppStateProvider, { useAppState } from './../../twilio/state';
import ErrorDialog from './../../twilio/components/ErrorDialog/ErrorDialog';
import UnsupportedBrowserWarning from './../../twilio/components/UnsupportedBrowserWarning/UnsupportedBrowserWarning';

import Meeting from './Meeting';

const VideoApp = () => {
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();

  return (
    <UnsupportedBrowserWarning>
      <VideoProvider options={connectionOptions} onError={setError}>
        <ErrorDialog dismissError={() => setError(null)} error={error} />
        <Meeting />
      </VideoProvider>
    </UnsupportedBrowserWarning>
  );
};
export default function MeetingNewPage() {
  return (
    <AppStateProvider>
      <VideoApp />
    </AppStateProvider>
  );
}
