import React,{useContext,useState,useEffect} from 'react';
import { View,Text,StyleSheet, TouchableOpacity, Modal,Image } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import AppIntroSlider from 'react-native-app-intro-slider';

import { AuthContext } from '../../../../contexts/auth';

export default function Teste2_3({route}) {
    let respq=0;
    const { teste, enviaResultadoBancoT2} = useContext(AuthContext);

    const slider = [ //Lista que contém a estilização do tutorial que será exibido antes que o proximo
                     //teste começe
        {
          key:'1',
          title:'',
          text:'',
          image: <Image
          source={require('../../../../assets/tuto3_1.png')}
          style={styles.styleImg1}
         /> 
        },
        {
            key:'2',
            title:'Exemplo de exercício',
            text:'Esta tela será exibida por 2 segundos com um número aleatório de bolinhas',
            image: <Image
            source={require('../../../../assets/tuto3_2.png')}
            style={styles.styleImg2}
           /> 
          },
          {
              key:'3',
              title:'Exemplo de exercício',
              text1:'Basta pressionar o número que corresponde a quantidade de bolinhas da tela anterior',
              image: <Image
              source={require('../../../../assets/tuto3_3.png')}
              style={styles.styleImg3}
             /> 
               
            },
            {
                key:'4',
                title1:'Entendido? Vamos começar!',
                text2:'Basta pressionar o número que corresponde a quantidade de bolinhas da tela anterior',
                butto: <View style={styles.buttoView}>
                    <TouchableOpacity onPress={() => chamaTeste2()} style={styles.btnButto}>
                    <Text style={styles.btnButtoTxt}>Iniciar</Text>
                </TouchableOpacity></View>
                
              }
    ]
    //variavel que recebe um numero pseudo aleatório de 1 a 9
    const [questao, setQuestao] = useState((Math.floor(Math.random() * (9 - 1 + 1) + 1)));
    
    //variaveis que recebem os valores das questoes anteriores
    const [numQuesta1, setnumQuesta1] = useState(route.params?.numQuestao1);
    const [numQuesta2, setnumQuesta2] = useState(route.params?.numQuestao2);

    //booleana que auxilia na chamada do Tutorial(Modal) do proximo teste
    const [visivel, setVisivel] = useState(false);
  
    const navigation = useNavigation();
  
    useEffect(() => {//verifica se "questao" atual é igual as anteriores, se for, gera outro numero
        if((questao === numQuesta1) || (questao === numQuesta2)){
           let min = Math.ceil(1);
           let max = Math.floor(9);
           setQuestao(Math.floor(Math.random() * (max - min + 1)) + min);
          }
    },[]);
  
    function chamaModal(resposta){ //torna o modal que exibe o tutorial "visivel" 
      console.log('resposta3: '+resposta);
        setVisivel(true);

        if(resposta == ((questao * 10)*2)){
          teste();
        }
    
        enviaResultadoBancoT2();
    }
    function chamaTeste2(){//recebe a resposta escolhida pelo usuario e envia pro Firebase
                           //e chama o proximo teste
        setVisivel(false)
        navigation.reset({
          index:0,
          routes:[{ name: 'Teste3_1'}],
        })
    }
    
    function renderSliders({item}){ //Renderiza o conteúdo do vetor slider quando visivel = 'true'
        return(
     <View style={{flex:1,alignItems:'center'}}>
        <Text style={styles.titleTxt}>{item.title}</Text>
        <Text style={styles.titleTxt2}>{item.title1}</Text>
    
       {item.image} 
       {item.butto}
       <Text style={styles.textTxt}>{item.text}</Text>
       <Text style={styles.textTxt2}>{item.text1}</Text>
     </View>
        )
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
              <TouchableOpacity style={styles.btn} onPress={() => chamaModal(((questao * 10)*2))}>
              <Text style={styles.btnNum}>{((questao * 10)*2)}</Text>
               
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.btn} onPress={() => chamaModal((questao * 10))}>
                <Text style={styles.btnNum}>{(questao * 10)}</Text>
              </TouchableOpacity>
            </View>
  
            <View style={styles.viewBtn3e4}>
              <TouchableOpacity style={styles.btn} onPress={() => chamaModal((questao * 3))}>
                   <Text style={styles.btnNum}>{(questao * 3)}</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.btn} onPress={() => chamaModal((questao * 6) * 2)}>
                <Text style={styles.btnNum}>{((questao * 6) * 2)}</Text>
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
      },
      styleImg1:{
        resizeMode:'center',
        height:'70%',
        width:'80%',
        borderWidth:1,
        borderColor:'#fff',
        marginTop:-10
      },
      styleImg2:{
        resizeMode:'center',
        height:'70%',
        width:'80%',
        borderWidth:1,
        borderColor:'#fff',
        marginTop:-10
      },
      styleImg3:{
        resizeMode:'center',
        height:'70%',
        width:'80%',
        borderWidth:1,
        borderColor:'#fff',
        marginTop:-30
      },
      buttoView:{
        flex:1,
        justifyContent:'center', 
        marginBottom:'20%'
      },
      btnButto:{
        borderRadius:150,
        backgroundColor:'#fff',
        width:250,
        height:250, 
        justifyContent:'center'
      },
      btnButtoTxt:{
        fontSize:50,
        fontWeight:'bold',
        textAlign:'center',
        color:'#04abd8'
      },
      titleTxt:{
        fontSize:28,
        color:'#fff',
        textAlign:'center',
        marginTop:10,
        fontWeight:'bold'
      },
      titleTxt2:{
        fontSize:25, 
        color:'#fff', 
        textAlign:'center',
        marginTop:15, 
        fontWeight:'bold'
      },
      textTxt:{
        fontSize:20, 
        color:'#fff', 
        textAlign:'center', 
        marginTop:5,
        marginLeft:'3%',
        marginRight:'3%'
      },
      textTxt2:{
        fontSize:20, 
        color:'#fff', 
        textAlign:'center', 
        marginTop:-30,
        marginLeft:'3%',
        marginRight:'3%'
      }
})