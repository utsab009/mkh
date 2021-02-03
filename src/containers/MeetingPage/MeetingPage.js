import React, { Component } from 'react';
import Room from './Room';
import { connect, LocalDataTrack } from 'twilio-video';
import axios from 'axios';
import './MeetingPage.css';

const dataTrack = new LocalDataTrack();

class MeetingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      identity: '',
      room: null,
    };
  }
  getToken = async obj => {
    const response = await axios.post(`http://localhost:4000/twilio/getTwilioToken`, {
      room: 'cool-room',
      identity: obj,
    });
    const { data } = response;
    // return data.token;
    console.log('token>>>', response);
    this.setState({ token: data });
  };

  componentDidMount() {
    const { name } = this.props.params;
    this.getToken(name);
  }

  joinRoom = async () => {
    try {
      const { token } = this.state;
      const room = await connect(
        token,
        {
          name: 'cool-room',
          audio: true,
          video: true,
          // tracks: [dataTrack],
        }
      );

      this.setState({ room: room });
    } catch (err) {
      console.log(err);
    }
  };
  returnToLobby = () => {
    this.setState({ room: null });
  };

  render() {
    return (
      <div className="app-meeting">
        {this.state.room === null ? (
          <div className="lobby">
            <button onClick={this.joinRoom}>Join Room</button>
          </div>
        ) : (
          <Room returnToLobby={this.returnToLobby} room={this.state.room} />
        )}
      </div>
    );
  }
}

export default MeetingPage;
