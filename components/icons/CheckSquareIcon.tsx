import React, { FunctionComponent } from 'react';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  size?: number;
  color?: string;
}

const CheckSquareIcon: FunctionComponent<Props> = ({
  size = 24,
  color = '#000',
  ...otherProps
}) => {
  return (
    <FontAwesome
      name="check-square"
      size={size}
      color={color}
      {...otherProps}
    />
  );
};

export default CheckSquareIcon;
