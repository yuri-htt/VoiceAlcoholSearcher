import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 32,
  },
  header: {
    marginVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  icon: {
    marginRight: 16,
  },
  name: {
    fontSize: 16,
  },
  contentTxt: {
    marginTop: 16,
    color: '#212121',
  },
  dateTxt: {
    marginTop: 16,
    color: '#757575'
  }
});

export default styles;