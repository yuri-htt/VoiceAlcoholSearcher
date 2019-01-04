import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';


const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 46 + 32,
  },
  modal: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismiss: {
    padding:16,
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  candidateCard: {
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 4,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    backgroundColor: '#FFF',
    padding: 16,
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 16,
  },
  primaryBtn: {
    marginVertical: 8,
    width: 280,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seondaryBtn: {
    marginVertical: 8,
    width: 280,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnTxt: {
    fontSize: 16,
    color: 'white', 
    fontWeight: '600',
  },
  seondaryBtnTxt: {
    fontSize: 16,
    color: 'black', 
    fontWeight: '600',
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default styles;