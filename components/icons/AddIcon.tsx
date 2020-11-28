import React, { FunctionComponent } from 'react';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  size?: number;
  color?: string;
}

const AddIcon: FunctionComponent<Props> = ({
  size = 24,
  color = '#000',
  ...otherProps
}) => {
  return (
    <AntDesign name="pluscircleo" size={size} color={color} {...otherProps} />
  );
};

export default AddIcon;
