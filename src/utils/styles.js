import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  appContainer: {
    flex: 1,
    /*alignItems: 'center',
    justifyContent: 'center',*/
  },
  imageBackground: {
    //opacity isn't lowered
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
  },
  registerContainer: {
    paddingTop: 60,
  },
  headerStyle: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  hyperlink: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
    color: '#3464eb',
  },
  //form styling
  inputContainer: {
    width: '80%',
    height: 70,
    alignSelf: 'center',
  },
  required: {
    position: 'absolute',
    zIndex: 99,
    right: 6,
    top: 4,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    width: '100%',
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    position: 'absolute',
    top: 40,
    color: 'red',
    fontSize: 12,
    paddingLeft: 10,
  },
  buttonStyle: {
    width: '80%',
    alignSelf: 'center',
  },
  formFieldImage: {
    height: 50,
    width: 50,
  },
  reveal: {
    position: 'absolute',
    zIndex: 99,
    right: 5,
    top: -4,
  },

  //language select
  languageSelectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 135,
  },
  languageButtonContainer: {
    marginTop: 25,
    marginLeft: 125,
    flexDirection: 'row',
  },
  leftLanguageButton: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    marginRight: 30,
  },
  rightLanguageButton: {
    alignSelf: 'center',
    height: 50,
    width: 50,
  },
  //Large Button
  largeButton: {
    backgroundColor: "#8eddfa",
    padding: 10,
    marginTop:50,
    marginLeft: '15%',
    width: '70%',
    height: 125,
    borderRadius:5,
  },
  largeButtonTitle:{
    textAlign:'center',
    marginTop:35,
    fontWeight: 'bold',
    fontSize: 24,
  },
  highInput: {
    backgroundColor: '#fff',
    height: 80,
    width: '100%',
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  highInputContainer: {
    width: '80%',
    height: 110,
    alignSelf: 'center',
  },
  //topic buttons
  topicButton: {
    backgroundColor: "#8eddfa",
    marginLeft: '10%',
    marginBottom: 30,
    width: '80%',
    height: 100,
    borderRadius:5,
  },
  topicTitle: {
    textAlign:'center',
    marginTop:10,
    fontWeight: 'bold',
    fontSize: 18,
  },  
  topicDescription: {
    textAlign:'center',
    marginTop:10,
    fontSize: 14,
  },
  formTitle: {   
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 40,
  },
  newTopicTitle: {
    textAlign:'center',
    marginTop:35,
    fontWeight: 'bold',
    fontSize: 18,
  },  
  //back button
  backButton: {
    marginLeft: 50,
    height: 50,
    width: 50,
  },
  addnoteButton: {
    height: 50,
    width: 50,
    marginLeft:30
  }
})
