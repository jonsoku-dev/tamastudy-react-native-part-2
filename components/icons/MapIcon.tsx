import React, { FunctionComponent } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  size?: number;
  color?: string;
}

const MapIcon: FunctionComponent<Props> = ({
  size = 24,
  color = '#000',
  ...otherProps
}) => {
  return (
    <FontAwesome5
      name="map-marked-alt"
      size={size}
      color={color}
      {...otherProps}
    />
  );
};

export default MapIcon;
