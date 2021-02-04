import React, { useState, useEffect, FormEvent } from 'react';
import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen';
import IntroContainer from '../../components/IntroContainer/IntroContainer';
import MediaErrorSnackbar from './MediaErrorSnackbar/MediaErrorSnackbar';
import PreflightTest from './PreflightTest/PreflightTest';
import RoomNameScreen from './RoomNameScreen/RoomNameScreen';
// import { useAppState } from '../../state';
import { useParams } from 'react-router-dom';
import useVideoContext from './../../hooks/useVideoContext/useVideoContext';
import Video from 'twilio-video';

export const Steps = {
  roomNameStep: null,
  deviceSelectionStep: null,
};

export default function PreJoinScreens(props) {
  // const { user } = useAppState();

  const { getAudioAndVideoTracks } = useVideoContext();
  // const { URLRoomName } = useParams();
  const [step, setStep] = useState(Steps.roomNameStep);

  // const [name, setName] = useState(props && props.displayName);
  // const [name, setName] = useState((user && user.displayName) || '');
  const [roomName, setRoomName] = useState(props && props.roomName);
  const name = props && props.displayName;
  const [mediaError, setMediaError] = useState('');
  console.log('1234 name>>>', props, name, roomName);
  useEffect(() => {
    // if (URLRoomName) {
    //   setRoomName(URLRoomName);
    //   // if (user && user.displayName) {
    //   setStep(Steps.deviceSelectionStep);
    //   // }
    // }
  });
  // , [user, URLRoomName]);

  useEffect(() => {
    if (step === Steps.deviceSelectionStep && !mediaError) {
      getAudioAndVideoTracks().catch(error => {
        console.log('Error acquiring local media:');
        console.dir(error);
        setMediaError(error);
      });
    }
  }, [getAudioAndVideoTracks, step, mediaError]);

  const handleSubmit = event => {
    event.preventDefault();
    // If this app is deployed as a twilio function, don't change the URL because routing isn't supported.
    // if (!window.location.origin.includes('twil.io')) {
    //   window.history.replaceState(
    //     null,
    //     '',
    //     window.encodeURI(`/room/${roomName}${window.location.search || ''}`)
    //   );
    // }
    setStep(Steps.deviceSelectionStep);
  };

  const SubContent = (
    <>
      {Video.testPreflight && <PreflightTest />}
      <MediaErrorSnackbar error={mediaError} />
    </>
  );

  return (
    <IntroContainer subContent={step === Steps.deviceSelectionStep && SubContent}>
      {/* {step === Steps.roomNameStep && (
        <RoomNameScreen
          name={name}
          roomName={roomName}
          setName={setName}
          setRoomName={setRoomName}
          handleSubmit={handleSubmit}
        />
      )} */}

      {step === Steps.deviceSelectionStep && (
        <DeviceSelectionScreen name={name} roomName={roomName} setStep={setStep} />
      )}
    </IntroContainer>
  );
}
