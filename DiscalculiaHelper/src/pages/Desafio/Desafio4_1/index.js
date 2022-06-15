import React,{useContext} from 'react';
import { View , Text, TouchableOpacity, StyleSheet,Image} from 'react-native';
import {AuthContext} from '../../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

export default function Desafio4_1() {
    const navigation = useNavigation();
    const {vencedor, setVencedor} = useContext(AuthContext);

    function novaRodada(){
       
        setVencedor('');

        navigation.reset({
            index:0,
            routes:[{name: 'Desafio4'}]
        })
    }
 return (
 <View style={{flex:1, paddingTop:'30%',backgroundColor:'#50c3d6'}}>
     <Image
      source={require('../../../assets/trains/backTremFinal.jpeg')}
      style={{width:'100%', height:'100%'}}
     />
   <View style={{alignItems:'center', justifyContent:'center',flex:1,marginTop:'-170%'}}>
       <View style={{flex:1, marginTop:'10%'}}>
         <Text style={{fontSize:40,fontWeight:'bold'}}>Fim de jogo!</Text>
       </View>
       
        <View style={{flex:1,width:'100%',paddingTop:106}}>
            <Image
             source={require('../../../assets/trains/tremfinal.png')}
             style={{width:320, height:100,marginLeft:20}}
            />
           
         <Text style={{fontSize:28,fontWeight:'bold',color:'#fff',marginTop:'-27%',marginLeft:'17%',paddingTop:7}}>{vencedor}</Text>
        </View>

        <View style={{flex:2,marginTop:-40, paddingBottom:-5,width:'100%', alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity style={{width:200, height:60, alignItems:'center',justifyContent:'center',borderWidth:1,marginBottom:20, backgroundColor:'#9acc77',borderRadius:10}}
             onPress={() => novaRodada()}
            >
                <Text style={{color:'#fff', fontSize:25, fontWeight:'bold'}}>Nova Rodada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width:200, height:60, alignItems:'center',justifyContent:'center',borderWidth:1, backgroundColor:'#9acc77',borderRadius:10}}
             onPress={() => navigation.reset({
                 index:0,
                 routes:[{name:'Desafios'}]
             })}
            >
                <Text style={{color:'#fff', fontSize:25, fontWeight:'bold'}}>Inicio</Text>
            </TouchableOpacity>
        </View>
       
   </View>
   </View>
  );
}