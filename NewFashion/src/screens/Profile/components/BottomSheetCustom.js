import React, {useMemo, useCallback, useRef, useEffect} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Keyboard} from 'react-native';
import BottomSheetTouchableWithoutFeedback from './BottomSheetTouchableWithoutFeedback';

export default function CustomBottomSheet({
  sheetType,
  onSheetChange,
  children,
}) {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '88%'], []);

  useEffect(() => {
    if (sheetType) {
      const index = sheetType === 'avatar' ? 0 : 1;
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(index);
      });
    }
  }, [sheetType]);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      handleComponent={null}
      enableDynamicSizing={false}
      keyboardBehavior="extend"
      onChange={onSheetChange}
      backdropComponent={renderBackdrop}>
      <BottomSheetTouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </BottomSheetTouchableWithoutFeedback>
    </BottomSheet>
  );
}
