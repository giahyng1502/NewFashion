import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // Header styles
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Body styles
  bodyContainer: {
    width: '100%',
  },
  // Content styles
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#737373',
  },
  // Footer styles
  footerContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  footerWrapper: {
    marginHorizontal: 36,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1D771F',
  },
  icon: {
    position: 'absolute',
    resizeMode: 'contain',
    bottom: 20,
  },
  footerNotify: {
    marginBottom: 20,
  },
  footerNotifyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ADADAD',
    paddingBottom: 8,
  },
  footerNotifyText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#9E9E9E',
    lineHeight: 20,
  },
  // BottomSheet styles
  contentBottomSheetContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
});

export default styles;
