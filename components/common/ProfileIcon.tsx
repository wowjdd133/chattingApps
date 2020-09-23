import React from 'react';
import { Avatar } from 'react-native-paper';

interface ProfileIconProps {
  size: number,
  uri: string,
}

const ProfileIcon = ({
  size,
  uri = "https://scontent-ssn1-1.xx.fbcdn.net/v/t1.30497-1/cp0/c12.0.40.40a/p40x40/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_eui2=AeGERGzEtRjUa_u_MaVjfT2RLYw35eBBIRQtjDfl4EEhFPQZqIQ00RpGVeT4JwrMFSKKPfd5z8oaoWCmyTk92RSc&_nc_ohc=YZKr_iHlzhUAX8--3Sk&_nc_ht=scontent-ssn1-1.xx&oh=c5c8dcccfcf78f42fb8fafdaef0e447b&oe=5F90039E"
}:ProfileIconProps) => {

  return(
    <Avatar.Image
      accessibilityStates
      size={size}
      source={{uri: uri}}
    />
  )
}

export default ProfileIcon;