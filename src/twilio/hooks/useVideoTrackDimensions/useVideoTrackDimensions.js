import { useState, useEffect } from 'react';
import { LocalVideoTrack, RemoteVideoTrack } from 'twilio-video';

// type TrackType = LocalVideoTrack | RemoteVideoTrack;

export default function useVideoTrackDimensions(track) {
  const [dimensions, setDimensions] = useState(track && track.dimensions);

  useEffect(() => {
    setDimensions(track && track.dimensions);

    if (track) {
      const handleDimensionsChanged = track =>
        setDimensions({
          width: track.dimensions.width,
          height: track.dimensions.height,
        });
      track.on('dimensionsChanged', handleDimensionsChanged);
      return () => {
        track.off('dimensionsChanged', handleDimensionsChanged);
      };
    }
  }, [track]);

  return dimensions;
}
