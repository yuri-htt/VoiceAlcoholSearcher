import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';


const styles = StyleSheet.create({
  guideTxt: {
    fontSize: 16,
  },
  voiceContainer: {
    // backgroundColor: 'green',
    marginTop: 32,
  },
  voice: {
    width: 300 * 0.6,
    height: 180 * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animateContainer: {
    width: 110, 
    height: 110,
    position: 'absolute',
  },
  mikeContainer: {
    // position: 'absolute',
    marginTop: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 40,
  },
  circle: {
    position: 'absolute',
    width: 110, 
    height: 110,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 32,
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
    padding: 16,
    alignItems: 'center',
    elevation: 1,
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
    color: '#212121',
    marginBottom: 16,
  },
});

export default styles;