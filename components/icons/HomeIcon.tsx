import React, { FunctionComponent } from 'react';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  size?: number;
  color?: string;
}

const HomeIcon: FunctionComponent<Props> = ({
  size = 24,
  color = '#000',
  ...otherProps
}) => {
  return <FontAwesome name="home" size={size} color={color} {...otherProps} />;
};

export default HomeIcon;
