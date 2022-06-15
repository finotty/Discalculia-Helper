import React,{useState, useEffect,useContext} from 'react';
import { View,Text, TouchableOpacity, StyleSheet, } from 'react-native';
//import { ProgressBar, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../../../contexts/auth';

//Tela que recebe os dados para mostrar quem venceu e suas respectivas pontuações
export default function Desafio3_2({route}) {  
    const navigation = useNavigation();
    const {setStart,atualizar, veto, atualizaFrame,setAtualizaFrame,setVeto,rodada,setRodada,vetoQuadro,pontos,setPontos,contaBolinhas, setContaBolinhas} = useContext(AuthContext);
    
 function novoDesafio(){
    setStart(true);
    setPontos(0);
    setRodada(0);
    setContaBolinhas(0);
    setAtualizaFrame(false);
    navigation.reset({
       index:0,
       routes:[{name:"Desafio3"}]
    })
 }

 function inicio(){
   setStart(true);
   setPontos(0);
   setRodada(0);
   setContaBolinhas(0);
   setAtualizaFrame(false);
    navigation.reset({
       index:0,
       routes:[{name:'Desafios'}]
    })
 }
 return (
    <View style={styles.container}>
       <View style={{alignItems:'center', justifyContent:'center'}}>
      
            <View style={{marginTop:'10%'}}>
             <Text style={{fontSize:36, fontWeight:'bold'}}>Desafio completo!!</Text>
            </View>

            <View style={{flexDirection:'row', height:50, marginTop:30}}>
             <Text style={{width:50, height:50, borderRadius:25, backgroundColor:'#bf0a0d'}}></Text>
             <Text style={{fontSize:25, fontWeight:'bold',marginTop:10, elevation:1}}>Bolinhas geradas : {contaBolinhas}</Text>
             <Text style={{width:50, height:50, borderRadius:25, backgroundColor:'#bf0a0d'}}></Text>
            </View>

           <View style={{marginTop:'15%', width:250, height:240, borderWidth:1,alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
                  <View style={{marginTop:'5%', width:200, height:200, borderWidth:1, borderRadius:100,alignItems:'center',justifyContent:'center',backgroundColor:'#bf0a0d'}}>
                  <Text style={{fontSize:50, fontWeight:'bold',color:"#fff"}}>{pontos}</Text>
                  <Text style={{fontSize:25, fontWeight:'bold',color:"#fff"}}>Acertos</Text>
                  </View> 
          </View>

          <View style={{alignItems:'center',marginTop:'10%'}}>
             <TouchableOpacity style={{backgroundColor:'#fff', width:150, height:50, borderWidth:1,alignItems:'center',justifyContent:'center'}}
             onPress={() => novoDesafio()}
             >
                <Text style={{fontSize:17, fontWeight:'bold'}}>{'>'} Novo Desafio {'<'}</Text>
             </TouchableOpacity>

             <TouchableOpacity style={{marginTop:'5%',backgroundColor:'#fff', width:150, height:50, borderWidth:1,alignItems:'center',justifyContent:'center'}}
              onPress={() => inicio()}
             >
                <Text style={{fontSize:17, fontWeight:'bold'}}>{'>'} Inicio {'<'}</Text>
             </TouchableOpacity>

          </View>
           

      </View>
   </View>
  );
}

const styles = StyleSheet.create({
   container:{
     flex:1,
     backgroundColor:'#aeced2',   
   },

  
 });

