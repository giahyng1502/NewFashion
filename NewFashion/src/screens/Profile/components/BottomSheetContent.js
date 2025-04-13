import React from 'react';
import BottomSheetAvatarPicker from './BottomSheetAvatarPicker';
import BottomSheetChangeName from './BottomSheetChangeName';

export default function BottomSheetContent({sheetType}) {
  switch (sheetType) {
    case 'avatar':
      return <BottomSheetAvatarPicker />;
    case 'name':
      return <BottomSheetChangeName />;
    default:
      return null;
  }
}
