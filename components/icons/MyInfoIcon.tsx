import React, { FunctionComponent } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  size?: number;
  color?: string;
}

const MyInfoIcon: FunctionComponent<Props> = ({
  size = 24,
  color = '#000',
  ...otherProps
}) => {
  return (
    <MaterialCommunityIcons
      name="account-details"
      size={size}
      color={color}
      {...otherProps}
    />
  );
};

export default MyInfoIcon;
