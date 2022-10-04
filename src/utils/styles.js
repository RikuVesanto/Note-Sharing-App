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
    fontSize: 24,
    marginTop: 5,
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
    marginLeft: 30,
    marginRight:5,
    marginBottom:10,
    height: 50,
    width: 50,
  },
  rowLayout: {
    flexDirection: 'row',    
    marginTop:10,
  },
  addnoteButton: {
    height: 50,
    width: 50,
    marginLeft:40,
    marginTop:30,
    marginBottom: 10
  },
  //search
  resultsText: {
    textAlign:'center',
    marginTop:30,
    marginBottom:30,
    fontSize: 18
  },
  //search result card
  groupCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#d1c9c9',
    margin:30
  },
  joinGroupButton: {
    marginTop:5,
    backgroundColor: "#8eddfa",
    marginBottom: 30,
    marginLeft:20,
    width: '40%',
    height: 60,
    borderRadius:5,
  },
  joinGroupButtonTitle: {
    textAlign:'center',
    marginTop:15,
    fontWeight: 'bold',
    fontSize: 24,
  },
  groupCardTitle: {
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 16,
  }, 
  groupCardDescription: {
    textAlign:'center',
    marginTop:10,
    fontSize: 16,
    flex: 1, 
  },
  columnLayout: {
    flexDirection: 'column',
    alignItems:'center',
  },
  //modal
  modal: {
    borderColor:'#bfbfbf',
    borderWidth:2,
    borderRadius:5,
    backgroundColor:"white",
    marginLeft:'10%',
    width:'80%',
    marginTop:'20%',
    height:'50%'
  },
  //topic page title view
  titleCardLayout: {
    width:"80%",
    height:150,
    backgroundColor:'#8eddfa',
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 5,
  },
  noteCard: {
    padding: 5,
    marginTop: 20,
    marginBottom:20,
    marginLeft:"10%",
    width:"80%",
    textAlign:'center',
    backgroundColor:'#b3e0ff',
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 5,
  },
  //info messages
  successInfoMessage: {
    backgroundColor: "#4dff88",
  },
  failureInfoMessage: {
    backgroundColor: "#ff4d4d",
  },
  neutralInfoMessage: {
    backgroundColor: "#b3ffff",
    color:"black"
  },
  infoMessageTitle: {
    fontWeight: 'bold', 
    fontSize: 16,
  },
  infoMessageFontColorNeutral: {
    color:"#000000"
  },
})
