import React, { useState } from 'react';
import { styled, Theme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from '../../util/reactIntl';
import MenuBar from './../../twilio/components/MenuBar/MenuBar';
import MobileTopMenuBar from './../../twilio/components/MobileTopMenuBar/MobileTopMenuBar';
import PreJoinScreens from '../../twilio/components/PreJoinScreens/PreJoinScreens';
import ReconnectingNotification from './../../twilio/components/ReconnectingNotification/ReconnectingNotification';
import Room from '../../twilio/components/Room/Room';

import useHeight from '../../twilio/hooks/useHeight/useHeight';
import useRoomState from '../../twilio/hooks/useRoomState/useRoomState';

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: '1fr auto',
});

const Main = styled('main')(({ theme }) => ({
  overflow: 'hidden',
  paddingBottom: `${theme.footerHeight}px`, // Leave some space for the footer
  background: 'black',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: `${theme.mobileFooterHeight + theme.mobileTopBarHeight}px`, // Leave some space for the mobile header and footer
  },
}));

const Meeting = props => {
  const roomState = useRoomState();
  const [name, setName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const {
    currentUser,
    match: { params },
  } = props;
  const displayName = currentUser && currentUser.attributes.profile.displayName;
  // Here we would like the height of the main container to be the height of the viewport.
  // On some mobile browsers, 'height: 100vh' sets the height equal to that of the screen,
  // not the viewport. This looks bad when the mobile browsers location bar is open.
  // We will dynamically set the height with 'window.innerHeight', which means that this
  // will look good on mobile browsers even after the location bar opens or closes.
  const height = useHeight();
  console.log('displayName', displayName);
  const roomName = 'Test';
  if (displayName && !isLoading) {
    setLoading(true);
    setName(displayName);
  }
  return (
    <Container style={{ height }}>
      {roomState === 'disconnected' ? (
        <PreJoinScreens roomName={roomName} displayName={name} />
      ) : (
        <Main>
          <ReconnectingNotification />
          <MobileTopMenuBar />
          <Room />
          <MenuBar />
        </Main>
      )}
    </Container>
  );
};
const mapStateToProps = state => {
  const { currentUser } = state.user;
  return {
    currentUser,
  };
};
export default compose(
  withRouter,
  connect(
    mapStateToProps
    // mapDispatchToProps
  ),
  injectIntl
)(Meeting);
