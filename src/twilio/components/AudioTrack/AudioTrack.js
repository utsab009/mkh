import { useEffect, useRef } from 'react';
import { AudioTrack as IAudioTrack } from 'twilio-video';
import { useAppState } from '../../state';

// interface AudioTrackProps {
//   track: IAudioTrack;
// }

export default function AudioTrack({ track }) {
  const { activeSinkId } = useAppState();
  const audioEl = useRef();

  useEffect(() => {
    audioEl.current = track.attach();
    audioEl.current.setAttribute('data-cy-audio-track-name', track.name);
    document.body.appendChild(audioEl.current);
    return () => track.detach().forEach(el => el.remove());
  }, [track]);

  useEffect(() => {
    audioEl.current && audioEl.current.setSinkId(activeSinkId);
  });

  return null;
}
