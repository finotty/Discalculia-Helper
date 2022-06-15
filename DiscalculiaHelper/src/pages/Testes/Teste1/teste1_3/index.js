import React,{useContext,useState,useEffect} from 'react';
import { View,Text,StyleSheet, TouchableOpacity,Modal,Image } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import AppIntroSlider from 'react-native-app-intro-slider';

import { AuthContext } from '../../../../contexts/auth'



export default function Teste1_3({route}) {

  const { teste, enviaResultadoBancoT1,estimativaTeste1,estimativaTeste2} = useContext(AuthContext);

  const slider = [ //Lista que contém a estilização do tutorial que será exibido antes que o proximo
                  //teste começe
    {
      key:'1',
      title:'',
      text:'',
      image: <Image
      source={require('../../../../assets/tuto2_1.png')}
      style={styles.styleImg1}
     />
    },
    {
        key:'2',
        title:'Exemplo de exercício',
        text:'Basta pressionar o número que corresponde ao resultado da soma',
        image: <Image
        source={require('../../../../assets/tuto2_2.png')}
        style={styles.styleImg2}
       />  
      },
      {
        key:'3',
        title1:'Entendido? Vamos começar!',
        text2:'Basta pressionar o número que corresponde a quantidade de bolinhas da tela anterior',
        butto: <View style={styles.buttoStyleView}>
            <TouchableOpacity onPress={() => chamaTeste2()} style={styles.buttoStyle}>
            <Text style={styles.buttoStyleTxt}>Iniciar</Text>
        </TouchableOpacity></View>
        
      }
]
  //Vetor estático
  const [questao, setQuestao] = useState([130,160,210,300,175,30,50,80,240,35]);

  //Variavel que aponta para um index do vetor "questao"
  const [x, setX] = useState(questao[Math.floor(Math.random() * (9 - 1 + 1)) + 1]);

  //Vetor que recebe  "x" somado com outros valores
  const [num, setNum] = useState([x + 50, x + 100, x + 35, x + 30, x +150, x + 160, x + 200, x + 110, x - 35, x -25]);
  
  // "x" anterior das duas telas anteriores
  const [xResp1, setxResp1] = useState(estimativaTeste1);
  const [xResp2, setxResp2] = useState(estimativaTeste2);
  
  //variavel booleana que ajuda na chamada do "Modal"
  const [visivel, setVisivel] = useState(false);

  const navigation = useNavigation();

  var aproximarNum = num.reduce(function(prev, curr) {//descobrir numero mais proximo de "x" dentro do vetor num[]
    return (Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev);
  });


  useEffect(() => {
    //verificando se o "x" das duas perguntas anteriores são iguais a esta, se for, gera outro numero pseudo aleatorio
     if((x === xResp1) || (x===xResp2) ){
         setX(questao[Math.floor(Math.random() * (9 - 1 + 1)) + 1])
     }
     if(num.length > 0){
      desordenar(num);
    }
    
  },[]);

  function desordenar(inputArray){
    inputArray.sort(() => Math.random() - 0.5);
    let pos = num.indexOf(aproximarNum);
    num.splice(pos,1);
 }

 function chamaModal(resposta){//função que muda o estado de "Modal" 
    setVisivel(true);
    if(resposta == aproximarNum){
      teste();
    }

    enviaResultadoBancoT1();
  }

  function chamaTeste2(){ //enviar dados pro Firebase e chamar proximo teste
      setVisivel(false)
      navigation.navigate('Teste2_1')
  }

  function renderSliders({item}){//função que renderiza os elementos da lista "slider"
      return(
  <View style={{flex:1,alignItems:'center'}}>
      <Text style={{fontSize:28, color:'#fff', textAlign:'center',marginTop:15, fontWeight:'bold'}}>{item.title}</Text>
      <Text style={{fontSize:26, color:'#fff', textAlign:'center',marginTop:15, fontWeight:'bold'}}>{item.title1}</Text>

      {item.image}
      {item.butto}
      <Text style={{fontSize:20, color:'#fff', textAlign:'center', marginTop:5}}>{item.text}</Text>
  </View>
      )
  }
  
 return (
   <View style={styles.container}>

    <Animatable.View  animation="zoomIn" style={styles.numero}>
      <Text style={styles.valor}>{x}</Text>
    </Animatable.View>

     <Animatable.View animation="fadeInLeft" style={styles.pergunta}>
       <Text style={styles.txt}>Qual número abaixo está mais próximo de {x}?</Text>
     </Animatable.View>
      
      <Animatable.View animation="zoomIn" style={styles.viewBtn}>
          <View style={styles.viewBtn1e2}>
            <TouchableOpacity style={styles.btn} onPress={() => chamaModal(aproximarNum)}>
              <Text style={styles.btnNum}>{aproximarNum}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => chamaModal(num[1])}>
              <Text style={styles.btnNum}>{num[1]}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewBtn3e4}>
            <TouchableOpacity style={styles.btn} onPress={() => chamaModal(num[4])}>
              <Text style={styles.btnNum}>{num[4]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => chamaModal(num[3])}>
              <Text style={styles.btnNum}>{num[3]}</Text>
            </TouchableOpacity>
          </View>
      </Animatable.View>

             {/*Modal que exibe um tutorial simples do teste a seguir*/}
             <Modal animationType='fadeIn' visible={visivel}>
           <View style={styles.container}>
              <AppIntroSlider
               renderItem={renderSliders}
               data={slider}
               activeDotStyle={{
                   backgroundColor:'#fff',
                   width:30
               }}
               renderNextButton={() => {}}
               renderDoneButton={() => {}}
               
              />

              
           </View>
       </Modal>

   </View>
  );
}

//estilização da pagina
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
    },
    buttoStyleView:{
      flex:1,
      justifyContent:'center',
       marginBottom:'20%'
    },
    buttoStyle:{
      borderRadius:150,
      backgroundColor:'#fff',
      width:250,
      height:250,
      justifyContent:'center'
    },
    buttoStyleTxt:{
      fontSize:50,
      fontWeight:'bold',
      textAlign:'center',
      color:'#04abd8'
    },
    styleImg1:{
       resizeMode:'center',
       height:'75%',
       width:'85%',
       borderWidth:1,
       borderColor:'#fff',
       marginTop:-2
    },
    styleImg2:{
      resizeMode:'center',
      height:'70%',
      width:'80%',
      borderWidth:1,
      borderColor:'#fff',
      marginTop:-20
    }
})