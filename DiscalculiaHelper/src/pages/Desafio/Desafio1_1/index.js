import React,{useState, useEffect} from 'react';
import { View,Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

//Tela que recebe os dados para mostrar quem venceu e suas respectivas pontuações
export default function Desafio1_1({route}) {  
    const navigation = useNavigation();
    
 let vencedor = route.params.vence;
 let pontos1 = route.params.pt1;
 let pontos2 = route.params.pt2;
 return (
    <View style={(vencedor == 'Jogador 1 Venceu!!!')? styles.viewModalfim1 : ((vencedor == 'Jogador 2 Venceu!!!')? styles.viewModalfim2 : styles.viewModalfimEmpate ) }>
           <Text style={styles.fimJogo}>fim de jogo!</Text>
           <Text style={styles.vencedor}>{vencedor}</Text>
           <Text style={styles.pontos}>Jogador 1: {pontos1} pontos</Text>
           <Text style={styles.pontos}>Jogador 2: {pontos2} pontos</Text>
           
           <TouchableOpacity style={(vencedor == 'Empate!')? styles.btnEmpate : styles.btn}
            onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Desafio1' }],  
              })}
           >
             <Text style={{fontSize:20, fontWeight:'bold'}}>Recomeçar Jogo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={(vencedor == 'Empate!')? styles.btnEmpate1 : styles.btn1}
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
      backgroundColor:'#5b88a5',
      paddingTop:'15%'
      
    },
    viewModalfim2:{
      flex: 1,
      alignItems:'center',
      backgroundColor:'#f23460',
      paddingTop:'15%'
    },
    viewModalfimEmpate:{
      flex: 1,
      alignItems:'center',
      backgroundColor:'#fff',
      paddingTop:'15%'
    },
    fimJogo:{
      fontSize:40,
       marginTop:'10%',
       fontWeight:'bold'
    },
    vencedor:{
      fontSize:28,
      fontWeight:'bold',
      marginTop:'5%',
      marginBottom:'10%'
    },
    pontos:{
      
      fontSize:20,
      fontWeight:'bold'
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
    btnEmpate:{
        width:200, 
        height:200,
        borderRadius:100, 
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center', 
        marginTop:'20%',
        borderWidth:1
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
    btnEmpate1:{
      width:200, 
      height:100,
      borderRadius:20, 
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center', 
      marginTop:'5%',
      borderWidth:1
      }
  });