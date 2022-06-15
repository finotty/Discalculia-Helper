import React,{useContext,useState,useEffect} from 'react';
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../../../contexts/auth'


export default function Teste3_1_1() {

  const { teste} = useContext(AuthContext);
  const navigation = useNavigation();
  
  function opcao(resposta){//verifica se "resposta esta correta"
    if(resposta == 5){
      teste();
    }
    navigation.navigate('Teste3_2');
  }
    
   return (
    <View style={styles.container}>
  
    <Animatable.View  animation="zoomIn" style={styles.numero}>
      <Text style={styles.valor}>Quantas bolinhas   você viu?</Text>
      
    </Animatable.View>
  
      <Animatable.View animation="zoomIn" style={styles.viewBtn}>
          <View style={styles.viewBtn1e2}>
            <TouchableOpacity style={styles.btn} onPress={() => opcao(2)}>
              <Text style={styles.btnNum}>2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => opcao(3)}>
              <Text style={styles.btnNum}>3</Text>
            </TouchableOpacity>    
          </View>

          <View style={styles.viewBtn3e4}>
            <TouchableOpacity style={styles.btn} onPress={() => opcao(7)}>
              <Text style={styles.btnNum}>7</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => opcao(5)}>
              <Text style={styles.btnNum}>5</Text>
            </TouchableOpacity>
          </View>
      </Animatable.View>

   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#04abd8'
    },
    numero:{
      flex:2,
      backgroundColor:'#fff',
      borderRadius:20,
      margin:'5%',
      alignItems:'center',
      justifyContent:'center'
    },
    valor:{
      fontSize:55,
      fontWeight:'bold',
      textAlign:'center'
    },
    pergunta:{
      flex:1
    },
    viewBtn:{
      flex:1,
      marginTop:'20%'
      
    },
    viewBtn1e2:{
     flexDirection:'row',
     justifyContent:'space-between',
     marginLeft:'5%',
     marginRight:'5%'
    },
    viewBtn3e4:{
     flexDirection:'row',
     marginTop:50,
     justifyContent:'space-between',
     marginLeft:'5%',
     marginRight:'5%'
    },
    btn:{
     backgroundColor:'#fff',
     width:'44%',
     height:50,
     borderRadius:10,
     marginTop:-25,
     alignItems:'center',
     justifyContent:'center'
     
    },
    txt:{
      fontSize:28,
      fontWeight:'bold',
      color:'#fff',
      marginLeft:'5%',
      marginRight:'5%',
      textAlign:'center'
    },
    btnNum:{
      fontSize:25,
      fontWeight:'bold'
    }
})