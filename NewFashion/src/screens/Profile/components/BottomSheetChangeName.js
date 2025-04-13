import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useBottomSheet} from '@gorhom/bottom-sheet';
import {updateUser} from '../../../redux/actions/userActions';
import {useDispatch} from 'react-redux';
import {fetchInformation} from '../../../redux/actions/infomationActions';
import TextField from '../../../components/TextField';
import ScreenSize from '../../../contants/ScreenSize';
import FilledButton from '../../../components/FilledButton';
import LoadingDialog from '../../../dialogs/loadingDialog';

export default function BottomSheetChangeName() {
  const bottomSheet = useBottomSheet();
  const dispatch = useDispatch();
  const [newName, setNewName] = useState('');
  const [newNameError, setNewNameError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'name':
        if (!value) {
          error = 'Tên không được để trống';
        } else if (value.length > 40) {
          error = 'Độ dài tên vượt quá số lượng ký tự cho phép';
        }
        setNewNameError(error);
        return error;
      default:
        return '';
    }
  };

  const handleConfirm = () => {
    const error = validateField('name', newName);
    if (error) {
      console.log('Tên người dùng không hợp lệ');
      return;
    }

    Alert.alert(
      'Xác nhận đổi tên',
      `Bạn có chắc chắn muốn đổi tên thành "${newName}"?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            onConfirm(newName);
            onClose();
          },
        },
      ],
      {cancelable: true},
    );
  };

  const onClose = () => {
    bottomSheet.close();
  };

  const onConfirm = async name => {
    await update(name);
  };

  const update = async name => {
    try {
      setLoading(true);
      await dispatch(updateUser({name})).unwrap();
      await dispatch(fetchInformation()).unwrap();
      setLoading(false);
    } catch (err) {
      console.log('Lỗi đổi tên:', err);
    }
  };

  return (
    <View style={styles.bottomSheetContainer}>
      <LoadingDialog loading={loading} />
      <Text style={styles.headerText}>Cập nhật tên người dùng</Text>
      <TextField
        placeholder="Nhập tên mới"
        onChangeText={setNewName}
        customStyle={{width: ScreenSize.width - 40, marginTop: 10}}
      />
      {newNameError && (
        <View style={styles.errorContainer}>
          <Image
            source={require('../../../assets/icons/ic_warningValidate.png')}
            resizeMode="contain"
            style={{width: 16, height: 16}}
          />
          <Text style={styles.errorLabel} numberOfLines={0}>
            {newNameError}
          </Text>
        </View>
      )}
      <FilledButton
        onPress={handleConfirm}
        title="Xác nhận"
        customStyle={{
          backgroundColor: 'black',
          width: ScreenSize.width - 40,
          marginTop: 20,
        }}
      />
      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelText}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheetContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelText: {
    color: '#333',
    fontSize: 16,
  },
  errorContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  errorLabel: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: '#F91616',
    flex: 1,
  },
});
