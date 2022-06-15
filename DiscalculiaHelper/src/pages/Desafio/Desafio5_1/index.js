import React,{useState,useEffect,useContext,useRef} from 'react';
import { View, Text , StyleSheet, TouchableOpacity, Image, ScrollView, Modal} from 'react-native';
import {AuthContext} from '../../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { LogBox } from 'react-native'

export default function Desafio5_1() {
    LogBox.ignoreLogs([
        'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
        'NativeBase: The contrast ratio of',
        "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    ])
    
    const navigation = useNavigation();
    

    const {vencedor, setVencedor,pontos1,pontos2,setPontos1, setPontos2} = useContext(AuthContext);

 function novaRodada(){
   setPontos1(0);
   setPontos2(0);
   setVencedor('');
   navigation.reset({
    index:0,
    routes:[{name:'Desafio5'}]
  })
 }

 function inicio(){
    setPontos1(0);
    setPontos2(0);
    setVencedor('');
    navigation.reset({
     index:0,
     routes:[{name:'Desafios'}]
   })
  }

   
   
 return (
   <View style={styles.container}>
       <View style={styles.cabecalho}>
           <Text style={{fontSize:35, fontWeight:'bold'}}>{vencedor}</Text>

       </View>

       <View style={styles.principal}>
         <Text style={styles.txtPontos}>Pontos</Text>
           <View style={styles.viewJogador1}>
            <Text style={styles.txtJogador}>Jogador 1 : {pontos1}</Text>
           </View>

           <View style={styles.viewJogador2}>
            <Text style={styles.txtJogador}>Jogador 2 : {pontos2}</Text>
           </View>
         
         
       </View>

       <View style={styles.rodape}>
         <TouchableOpacity style={styles.btn}
          onPress={() => novaRodada()}
         >
           <Text style={styles.txtBtn}>Novo jogo</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.btn}
          onPress={() => inicio()}
         >
           <Text style={styles.txtBtn}>Inicio</Text>
         </TouchableOpacity>
       </View>


   </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#aeced2',

    },
    cabecalho:{
      flex: 1,
      alignItems:'center',
      justifyContent:'center'
    },
    principal:{
      flex: 2,
      alignItems:'center',
      borderWidth:1
    },
    rodape:{
      flex: 1,
      alignItems:'center',
      marginBottom:20
    },
    txtPontos:{
      fontSize:40,
      fontWeight:'bold'
    },
    viewJogador1:{
      width: '70%',
      height: 90,
      borderRadius:10,
      backgroundColor:'blue',
      justifyContent:'center',
      marginTop:'5%',
      alignItems:'center'
    },
    viewJogador2:{
      width: '70%',
      height: 90,
      borderRadius:10,
      backgroundColor:'black',
      justifyContent:'center',
      marginTop:'1%',
      alignItems:'center'
    },
    txtJogador:{
      fontSize:28,
      fontWeight:'bold',
      color: '#fff'
    },
    btn:{
      width: '70%',
      height: 70,
      borderRadius:10,
      backgroundColor:'red',
      alignItems:'center',
      justifyContent:'center',
      marginTop:10
    },
    txtBtn:{
      fontSize:28,
      fontWeight:'bold',
      color: "#fff"
    }

  
  });
  