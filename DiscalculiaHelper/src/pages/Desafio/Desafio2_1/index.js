import React,{useState, useEffect} from 'react';
import { View,Text, TouchableOpacity, StyleSheet, } from 'react-native';
//import { ProgressBar, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

//Tela que recebe os dados para mostrar quem venceu e suas respectivas pontuações
export default function Desafio2_1({route}) {  
    const navigation = useNavigation();
    
 let vencedor = route.params.venc;
 
 return (
    <View style={(vencedor == 'Jogador 1 Venceu!!!')? styles.viewModalfim1 : styles.viewModalfim2 }>
           <Text style={styles.fimJogo}>Fim de jogo!</Text>
           <Text style={styles.vencedor}>{vencedor}</Text>
           {console.log(vencedor)}
           
           
           <TouchableOpacity style={(vencedor == 'Empate!')? styles.btnEmpate : styles.btn}
            onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Desafio2' }],  
              })}
           >
             <Text style={{fontSize:20, fontWeight:'bold'}}>Recomeçar Jogo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={(vencedor == 'Empate!')? styles.btnEmpate : styles.btn1}
             onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Desafios' }],  
              })}
           >
             <Text style={{fontSize:20, fontWeight:'bold'}}>Inicio</Text>
            </TouchableOpacity>
         
         </View>
  );
}

const styles = StyleSheet.create({

    viewModalfim1:{
      flex: 1,
      alignItems:'center',
      backgroundColor:'blue',
      paddingTop:'15%'
      
    },
    viewModalfim2:{
      flex: 1,
      alignItems:'center',
      backgroundColor:'#f23',
      paddingTop:'15%'
    },
    fimJogo:{
      fontSize:40,
       marginTop:'10%',
       fontWeight:'bold',
       color: '#fff'
    },
    vencedor:{
      fontSize:28,
      fontWeight:'bold',
      marginTop:'5%',
      marginBottom:'10%',
      color: '#fff'
    },
   
    btn:{  
      width:200, 
      height:100,
      borderRadius:20, 
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center', 
      marginTop:'20%'
    },
    btn1:{  
        width:200, 
        height:100,
        borderRadius:20, 
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center', 
        marginTop:'5%'
      },
  
  });