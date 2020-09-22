import React from 'react';
import { Avatar } from 'react-native-paper';

interface ProfileIconProps {
  size: number,
  uri: string,
}

const ProfileIcon = ({
  size,
  uri
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