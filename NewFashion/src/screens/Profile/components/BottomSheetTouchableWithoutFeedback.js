import React, {useCallback} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

const BottomSheetTouchableWithoutFeedback = ({children, ...rest}) => {
  const handlePress = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handlePress} {...rest}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default BottomSheetTouchableWithoutFeedback;
