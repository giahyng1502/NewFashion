import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Keyboard, View} from 'react-native';
import styles from './styles';
import Body from './components/Body';
import Footer from './components/Footer';
import CustomBottomSheet from './components/BottomSheetCustom';
import BottomSheetContent from './components/BottomSheetContent';
import BaseHeader from '../../components/BaseHeader';
import {useSelector} from 'react-redux';

function ProfileScreen({navigation}) {
  const [sheetType, setSheetType] = useState(null);
  const timeoutRef = useRef(null);
  const {personalInfo} = useSelector(state => state.personalInfo);
  const {avatar, name} = personalInfo;

  console.log('personalInfo: ', personalInfo);

  const user = {
    avatar,
    name,
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const onHandleOpenSheet = useCallback(
    type => {
      if (type !== sheetType) {
        setSheetType(type);
      } else {
        setSheetType(null);

        timeoutRef.current = setTimeout(() => {
          setSheetType(type);
        }, 0);
      }
    },
    [sheetType],
  );

  const handleSheetChanges = useCallback(index => {
    if (index === -1) {
      Keyboard.dismiss();
      setSheetType(null);
    }
  }, []);

  return (
    <View style={styles.container}>
      <BaseHeader
        showLeftButton={true}
        title="Thông tin cá nhân"
        onLeftButtonPress={() => navigation.navigate('Main', {screen: 'You'})}
      />
      <Body user={user} onHandleOpenSheet={onHandleOpenSheet} />
      <Footer />
      {sheetType && (
        <CustomBottomSheet
          sheetType={sheetType}
          onSheetChange={handleSheetChanges}>
          <BottomSheetContent sheetType={sheetType} />
        </CustomBottomSheet>
      )}
    </View>
  );
}

export default ProfileScreen;
