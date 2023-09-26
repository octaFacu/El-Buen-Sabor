import {  StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    pagina: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      padding: 20,
    
    },
    seccion: {
      margin: 10,
      padding: 10,
      borderBottom: 1,
      borderColor: 'white',
    },
    cabecera: {
      fontSize: 20,
      marginBottom: 10,
      flexDirection: 'row',
      textAlign: 'center'
  
    },
    logoContainer: {
      position: 'relative'
    },
    logo: {
      width: 500,
      height: 200,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: 17,
      fontWeight: 'bold',
    },
    datos: {
      fontSize: 15,
    },
    total: {
      marginTop: 10,
      fontSize: 16,
    },
  });