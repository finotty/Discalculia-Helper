import React,{useState} from 'react';
import { View,Text, TouchableOpacity, StyleSheet ,Image} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

export default function Desafios() {
   
    const navigation = useNavigation();

    function chamaJogo(){
        navigation.navigate("Desafio1");
        
    }

    function chocolateCh(){
        navigation.navigate("Desafio2");
       
    }

    function tenFrame(){
        navigation.navigate("Desafio3");
        
    }

    function trains(){
        navigation.navigate("Desafio4");
        
    }
    function escadas(){
        navigation.navigate("Desafio5");
        
    }
 return (
     <View style={{flex:1}}>
         <Image
          source={require('../../../assets/backGroundPuro/backpuro.jpg')}
          style={{width:'100%', height:'100%'}}
         />
   <View style={styles.container}>
      < Animatable.View animation="fadeInLeft"  style={styles.viewTitle}>
           <Text style={styles.title}>Desafios</Text>
       </Animatable.View>

       <View style={styles.viewModal}>
               <Text style={styles.titleTxtModal}>Escolha um desafio</Text>

               <TouchableOpacity style={styles.btnDesafioModal}
                onPress={() => chamaJogo()}
               >
                   <Text style={styles.btnTxtModal}>Clear the Deck</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.btnDesafioModal} 
                onPress={() => chocolateCh()}>
                   <Text style={styles.btnTxtModal}>Chocolate Chili Chellenge</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.btnDesafioModal}
                onPress={() => tenFrame()}
               >
                   <Text style={styles.btnTxtModal}>Ten Frame</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.btnDesafioModal}
                 onPress={() => trains()}
               >
                   <Text style={styles.btnTxtModal}>Trains</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.btnDesafioModal}
                onPress={() => escadas()}
               >
                   <Text style={styles.btnTxtModal}>Ladder Game</Text>
               </TouchableOpacity>

           </View>
      

       <Animatable.View animation="zoomIn" style={styles.viewBtn}>
           <TouchableOpacity style={styles.btnIniciar}onPress={() => navigation.reset({
               index:0,
               routes:[{name:'PainelControle'}]
           })}>
             <Text style={styles.btnIniciarTxt}>Inicio</Text>
           </TouchableOpacity>
       </Animatable.View>

      
      

   </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:'-180%'
       },
    viewTitle:{
        flex:1,
        marginTop:'10%',
        alignItems:'center'
       
    },
    title:{
        fontSize:40,
        fontWeight:'bold',
        color:'#fff'
    },
    viewFlatList:{
        flex:4,
        margin:'5%',
        backgroundColor:'#fff',
        borderRadius:10
    },
    viewBtn:{
        flex:1,
        alignItems:'center',
        marginBottom:-25
    },
    viewBtn2:{
        flex:1,
        alignItems:'center',
        
    },
    btnIniciar:{
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        height:40,
        borderRadius:10
    },
    btnIniciarTxt:{
        fontSize:22,
        fontWeight:'bold',
        color:'#04abd8'
    },
    txtEscolha:{
        textAlign:'center',
        fontSize:14,
        fontWeight:'bold',
        color:'#fff',
        marginBottom:-10
    },
    viewModal:{
        flex: 3,
        alignItems:'center',
        
        
    },
    titleTxtModal:{
        marginBottom:15,
        fontSize:25,
        fontWeight:'bold',
        color: "#fff"
    },
    btnDesafioModal:{
        width: 250,
        height: 50,
        backgroundColor:'#04abd8',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    btnTxtModal:{
        color: '#fff',
        fontSize:20,
        fontWeight:'bold'
    }
})