import React,{useContext,useState,useEffect} from 'react';
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../../../contexts/auth'

  //Teste de Estimativa
export default function Teste1_1({route}) {
  //Vetor estático
  const [questao, setQuestao] = useState([130,160,210,300,175,30,50,80,240,35]);

  //Variavel que aponta para um index do vetor "questao"
  const [x, setX] = useState(questao[Math.floor(Math.random() * (9 - 1 + 1)) + 1]);

  //Vetor que recebe  "x" somado com outros valores
  const [num, setNum] = useState([x + 50, x + 100, x + 35, x + 30, x +155, x + 150, x + 200, x + 110, x - 30, x -25]);

  const { teste,setEstimativaTeste1} = useContext(AuthContext);

  const navigation = useNavigation();
  var aproximarNum = num.reduce(function(prev, curr) {//descobrir numero mais proximo de "x" dentro do vetor num[]
    return (Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev);
  });

  useEffect(() => {
    
    if(num.length > 0){
      desordenar(num);
    }
     
  })

  function desordenar(inputArray){
     inputArray.sort(() => Math.random() - 0.5);
     let pos = num.indexOf(aproximarNum);
     num.splice(pos,1);
  }


  function opcao(resposta){//Avalia o teste e chama a proxima variação do mesmo teste
    //função chama o próximo teste, envia a variavel 'x' para que o proximo numero de comparação nao seja igual
    //ao anterior e envia a responta para o banco de dados "Firebase".
  
   /*
    usando a referencia "nomeGrupo e aluno" incluir o resultado do teste para cada aluno.

    se for igual a num[9] manda pro banco o valor de num[9] e avisa que esta correto "true", caso nao, "false"
   */
   if(resposta == aproximarNum){
     teste();
   }

   navigation.navigate('Teste1_2')
   setEstimativaTeste1(resposta);
  }

 return (
   <View style={styles.container}>

    <Animatable.View  animation="zoomIn" style={styles.numero}>
      <Text style={styles.valor}>{x}</Text>
    </Animatable.View>

     <Animatable.View animation="fadeInLeft" style={styles.pergunta}>
       <Text style={styles.txt}>Qual número abaixo está mais proximo de {x}?</Text>
     </Animatable.View>
      
      <Animatable.View animation="zoomIn" style={styles.viewBtn}>
          <View style={styles.viewBtn1e2}>
            <TouchableOpacity style={styles.btn} onPress={() => opcao(aproximarNum)}>
              <Text style={styles.btnNum}>{aproximarNum}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => opcao(num[1])}>
              <Text style={styles.btnNum}>{num[1]}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewBtn3e4}>
            <TouchableOpacity style={styles.btn}onPress={() => opcao(num[4])}>
              <Text style={styles.btnNum}>{num[4]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}onPress={() => opcao(num[3])}>
              <Text style={styles.btnNum}>{num[3]}</Text>
            </TouchableOpacity>
          </View>
      </Animatable.View>

   </View>
  );
}
//Estilização da pagina
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
      fontSize:75,
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
      marginRight:'5%'
    },
    btnNum:{
      fontSize:25,
      fontWeight:'bold'
    }
})