import React,{useContext,useState,useEffect} from 'react';
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../../../contexts/auth';

export default function Teste4_1() {

  const navigation = useNavigation();

  const { teste} = useContext(AuthContext);

  var start = getRandomIntInclusive(1, 90);
 
  var vetor= [start,start+1,start+2,start+3,start+4,start+5,start+6,start+7] ;
  var parte1 = getRandomIntInclusive(0, 3);
  var parte2 = getRandomIntInclusive(4, 7);

  var res1 = vetor[parte1];
  var res2 = vetor[parte2];

  vetor[parte1] = '?'
  vetor[parte2] = '?'

  let possibilidadesRestantes = [];
  for(let i=0; i <= vetor.length; i++){
    if(vetor[i] != '?'){
      possibilidadesRestantes.push(vetor[i])
    }
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function opcao(resposta1, resposta2){//Avalia resposta e segue para o proximo
    if(resposta1 == res1 && resposta2 == res2){
      teste();
    }
    navigation.reset({
      index: 0,
      routes:[{ name: 'Teste4_1_1'}],
    });

  }
 return (
  <View style={styles.container}>
  
    <Animatable.View  animation="zoomIn" style={styles.numero}>
      <Text style={styles.valor}>Quais números estão faltando na sequência abaixo?</Text>

      <Text style={styles.valor1}>{vetor[0]},{vetor[1]},{vetor[2]},{vetor[3]},{vetor[4]},
                                  {vetor[5]},{vetor[6]},{vetor[7]}</Text>
      
    </Animatable.View>
  
      <Animatable.View animation="zoomIn" style={styles.viewBtn}>
          <View style={styles.viewBtn1e2}>
            <TouchableOpacity style={styles.btn}onPress={() => opcao(possibilidadesRestantes[0],possibilidadesRestantes[1])} >
              <Text style={styles.btnNum}>{possibilidadesRestantes[0]} e {possibilidadesRestantes[1]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => opcao(res1,res2)}>
              <Text style={styles.btnNum}>{res1} e {res2}</Text>
            </TouchableOpacity>
            
          </View>

          <View style={styles.viewBtn3e4}>
            <TouchableOpacity style={styles.btn} onPress={() => opcao(possibilidadesRestantes[2],possibilidadesRestantes[3])}>
              <Text style={styles.btnNum}>{possibilidadesRestantes[2]} e {possibilidadesRestantes[3]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => opcao(possibilidadesRestantes[4],possibilidadesRestantes[5])}>
              <Text style={styles.btnNum}>{possibilidadesRestantes[4]} e {possibilidadesRestantes[5]}</Text>
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
      fontSize:30,
      fontWeight:'bold',
      textAlign:'center',
      marginBottom:10
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
    },
    valor1:{
      fontSize:35,
      fontWeight:'bold',
      textAlign:'center',
      marginTop:10
    }
})