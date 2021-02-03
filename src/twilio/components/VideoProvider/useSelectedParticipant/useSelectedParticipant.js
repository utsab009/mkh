import React, { createContext, useContext, useState, useEffect } from 'react';
import { Participant, Room } from 'twilio-video';

// const selectedParticipantContextType = [Participant | null, (participant) => void];

export const selectedParticipantContext = createContext([Participant]);
// export const selectedParticipantContext = createContext(null!);
export default function useSelectedParticipant() {
  const [selectedParticipant, setSelectedParticipant] = useContext(selectedParticipantContext);
  return [selectedParticipant, setSelectedParticipant];
}

const SelectedParticipantProviderProps = {
  room: Room,
  children: React.ReactNode,
};

export function SelectedParticipantProvider({ room, children }) {
  // const [selectedParticipant, _setSelectedParticipant] = (useState < Participant) | (null > null);
  // const setSelectedParticipant = participant =>
  //   _setSelectedParticipant(prevParticipant =>
  //     prevParticipant === participant ? null : participant
  //   );

  // useEffect(() => {
  //   const onDisconnect = () => _setSelectedParticipant(null);
  //   const handleParticipantDisconnected = participant =>
  //     _setSelectedParticipant(prevParticipant =>
  //       prevParticipant === participant ? null : prevParticipant
  //     );

  //   room.on('disconnected', onDisconnect);
  //   room.on('participantDisconnected', handleParticipantDisconnected);
  //   return () => {
  //     room.off('disconnected', onDisconnect);
  //     room.off('participantDisconnected', handleParticipantDisconnected);
  //   };
  // }, [room]);

  return (
    // <selectedParticipantContext.Provider value={[selectedParticipant, setSelectedParticipant]}>
    //   {children}
    // </selectedParticipantContext.Provider>
    <div>{children}</div>
  );
}
