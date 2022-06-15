import React,{useContext,useState,useEffect} from 'react';
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../../../contexts/auth';
//Teste de logica
export default function Teste2_1({route}) {
    let respq=0;
    const { teste} = useContext(AuthContext);

    //variavel que recebe um numero pseudo aleatório de 1 a 9
    const [questao, setQuestao] = useState(Math.floor(Math.random() * (9 - 1 + 1)) + 1);
    const navigation = useNavigation();
  
    function opcao(resposta){ //recebe a resposta escolhida pelo usuario, envia pro Firebase e chama o proximo teste
     console.log('resposta1: '+resposta);
      if(resposta == ((questao * 10)*2)){
        teste(); //incrementa 1 ponto a cada teste feito com resposta certa
      }
     
      navigation.navigate('Teste2_2', {
       numQuestao1: questao
     })
    }

   return (
     <View style={styles.container}>
  
      <Animatable.View  animation="zoomIn" style={styles.numero}>
        <Text style={styles.valor}>{questao} + {questao} = {(questao+questao)}</Text>
        <Text style={styles.valor}>{questao * 10} + {questao * 10} = ?</Text>
      </Animatable.View>
  
       <Animatable.View animation="fadeInLeft" style={styles.pergunta}>
         <Text style={styles.txt}>Qual número abaixo é resultado da soma?</Text>
       </Animatable.View>
        
        <Animatable.View animation="zoomIn" style={styles.viewBtn}>
            <View style={styles.viewBtn1e2}>
              <TouchableOpacity style={styles.btn} onPress={() => opcao((questao * 3))}>
                <Text style={styles.btnNum}>{(questao * 3)}</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.btn} onPress={() => opcao((questao * 10))}>
                <Text style={styles.btnNum}>{(questao * 10)}</Text>
              </TouchableOpacity>
            </View>
  
            <View style={styles.viewBtn3e4}>
              <TouchableOpacity style={styles.btn} onPress={() => opcao(((questao * 10)*2))}>
                <Text style={styles.btnNum}>{((questao * 10)*2)}</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.btn}onPress={() => opcao(((questao * 6) * 2))}>
                <Text style={styles.btnNum}>{((questao * 6) * 2)}</Text>
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
        borderRadius:170,
        margin:'10%',
        alignItems:'center',
        justifyContent:'center'
      },
      valor:{
        fontSize:50,
        fontWeight:'bold',
      },
      pergunta:{
        flex:1
      },
      viewBtn:{
        flex:1,
        
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