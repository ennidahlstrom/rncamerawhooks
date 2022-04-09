import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    body: {
      flex: 1,
      padding: 5
    },
    container: {
        flex:1,
        padding: 8,
        alignItems: 'center'
    },
    preview: {
      flex: 1,
      alignItems:'center',
      justifyContent:'flex-end',
      paddingBottom: 20,
    },
    button: {
      height: 70,
      fontSize: 30,
      flex: 0,
      backgroundColor: 'white',
      borderRadius: 50,
      borderWidth: 5,
      borderColor: '#d1d1d1',
      padding: 15,
      alignSelf: 'center',
      margin: 20,
    },
    scanStatus: {
      fontSize: 17,
      fontStyle: 'italic',
      color: '#e8e8e8',
      margin: 20
    },
    buttonText: {
      marginVertical: 5,
      color: 'gray',
      fontWeight: 'bold'
    },
    headingText: {
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center'
    },
    helpText: {
        fontSize: 20,
        alignSelf: 'center'
    }
  })

  export default styles;