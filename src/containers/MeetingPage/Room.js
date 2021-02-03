import React, { Component } from 'react';
import Participant from './Participant';
import { LocalVideoTrack, createLocalVideoTrack } from 'twilio-video';
import './MeetingPage.css';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remoteParticipants: Array.from(this.props.room.participants.values()),
      isVideoEnable: true,
      isAudioEnable: true,
    };
  }
  componentDidMount() {
    // Add event listeners for future remote participants coming or going
    this.props.room.on('participantConnected', participant => {
      console.log('111 participants >>>', participant);
      this.addParticipant(participant);
    });
    this.props.room.on('participantDisconnected', participant => {
      console.log('111 participant disconnected>>>>', participant);
      this.removeParticipant(participant);
    });

    window.addEventListener('beforeunload', this.leaveRoom);
  }
  componentWillUnmount() {
    this.leaveRoom();
  }
  addParticipant = participant => {
    console.log(`111 ${participant.identity} has joined the room.`);

    this.setState({
      remoteParticipants: [...this.state.remoteParticipants, participant],
    });
  };

  removeParticipant = participant => {
    console.log(`111 ${participant.identity} has left the room`);

    this.setState({
      remoteParticipants: this.state.remoteParticipants.filter(
        p => p.identity !== participant.identity
      ),
    });
  };
  leaveRoom = () => {
    const { room } = this.props;
    // room.on('disconnected', room => {
    //   // Detach the local media elements
    //   room.localParticipant.tracks.forEach(publication => {
    //     const attachedElements = publication.track.detach();
    //     attachedElements.forEach(element => element.remove());
    //   });
    // });

    room.disconnect();
    this.props.returnToLobby();
  };
  toggleAudio = () => {
    this.setState({
      isAudioEnable: !this.state.isAudioEnable,
    });
    const { isAudioEnable } = this.state;

    const { room } = this.props;
    if (isAudioEnable) {
      room.localParticipant.audioTracks.forEach(publication => {
        publication.track.disable();
      });
    } else {
      room.localParticipant.audioTracks.forEach(publication => {
        publication.track.enable();
      });
    }
  };
  toggleVideo = () => {
    const { isVideoEnable } = this.state;

    const { room } = this.props;
    if (isVideoEnable) {
      room.localParticipant.videoTracks.forEach(publication => {
        publication.track.stop();
        publication.unpublish();
        // publication.track.disable();
      });
    } else {
      //   room.localParticipant.videoTracks.forEach(publication => {
      //     publication.track.enable();
      //   });
      createLocalVideoTrack().then(localVideoTrack => {
        room.localParticipant.publishTrack(localVideoTrack);
      });
      //     .then(publication => {
      //       this.setState({
      //         isVideoEnable: !this.state.isVideoEnable,
      //       });
      //       console.log('Successfully unmuted your video:', publication);
      //     });
    }
    this.setState({
      isVideoEnable: !this.state.isVideoEnable,
    });
  };
  shareScreen = async () => {
    const { room } = this.props;
    const stream = await navigator.mediaDevices.getDisplayMedia();
    const screenTrack = new LocalVideoTrack(stream.getTracks()[0]);
    room.localParticipant.publishTrack(screenTrack);
  };
  render() {
    console.log('111 room>>>', this.props);
    return (
      <div className="room">
        <div className="participants">
          <Participant
            key={this.props.room.localParticipant.identity}
            localParticipant="true"
            participant={this.props.room.localParticipant}
          />
          {this.state.remoteParticipants.map(participant => (
            <Participant key={participant.identity} participant={participant} />
          ))}
        </div>
        <button id="leaveRoom" onClick={this.leaveRoom}>
          Leave Room
        </button>
        <button id="leaveRoom" onClick={this.toggleAudio}>
          Mute
        </button>
        <button id="leaveRoom" onClick={this.toggleVideo}>
          video off
        </button>
        <button id="leaveRoom" onClick={this.shareScreen}>
          Share
        </button>
      </div>
    );
  }
}
