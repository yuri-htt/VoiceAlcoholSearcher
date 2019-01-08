import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
  takeTab: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#dfdfdf',
  },
  takeTabRounded: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 2,
    marginTop: Platform.OS === 'ios' ? 0 : 0,
  },
  takeTabIcon: {
    marginLeft: Platform.OS === 'ios' ? 1 : 0,
    marginTop: Platform.OS === 'ios' ? 1 : 0,
  },
});

export default styles;
