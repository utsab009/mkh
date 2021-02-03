import { useState, useEffect } from 'react';

export function useDevices() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const getDevices = () =>
      navigator.mediaDevices.enumerateDevices().then(devices => setDevices(devices));
    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    getDevices();

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    };
  }, []);
  console.log('123 dev', devices);
  return devices;
}

export function useAudioInputDevices() {
  const devices = useDevices();
  return devices.filter(device => device.kind === 'audioinput');
}

export function useVideoInputDevices() {
  const devices = useDevices();
  return devices.filter(device => device.kind === 'videoinput');
}

export function useAudioOutputDevices() {
  const devices = useDevices();
  const audioOutputs = devices.filter(device => device.kind === 'audiooutput');

  console.log('123 useAudioOutputDevices>>>', devices, audioOutputs);
  return audioOutputs;
}

export function useHasAudioInputDevices() {
  const audioDevices = useAudioInputDevices();
  return audioDevices.length > 0;
}

export function useHasVideoInputDevices() {
  const videoDevices = useVideoInputDevices();
  return videoDevices.length > 0;
}
