import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingLeft: 32,
    paddingVertical: 32,
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    // justifyContent: 'center',
  },
  filter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
  },
  commingSoon: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  headLine: {
    fontSize: 30,
    color: styleConstants.primaryTxt,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  badgeContainer: {
    alignItems: 'center',
    paddingRight: 16,
  },
  badge: {
    backgroundColor: 'gray',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    // marginBottom: 16,
  },
});

export default styles;