import React,{useContext,useState,useEffect} from 'react';
import { View,Text,StyleSheet, TouchableOpacity, Modal ,Image} from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import AppIntroSlider from 'react-native-app-intro-slider';

import { AuthContext } from '../../../../contexts/auth'


export default function Teste3_3_3() {

  const { teste, enviaResultadoBancoT3} = useContext(AuthContext);

    const navigation = useNavigation();

    const [visivel, setVisivel] = useState(false);

    const slider = [ //lista com dados do tutorial do proximo teste
      {
        key:'1',
        title:'Teste de visão espacial',
        text:'',
        image: <View
        style={{
            width:'90%',height:'70%'
        }}
       > 
        <Text style={{fontSize:20, fontWeight:'bold',color:'#fff',marginBottom:30, marginTop:-20}}> Este  teste  inicia mostrando  uma sequência  incompleta de números ,
           o  aluno indica  dentre as 4 opções disponíveis o número que falta  na sequência.</Text>

        <Text style={{fontSize:24, fontStyle:'italic', fontWeight:'bold',color:'#fff'}}>              Visão espacial</Text>
        <Text style={{fontSize:18,fontWeight:'bold',margin:'2%',color:'#fff'}}> A  consciência pode  ser  considerada como  estando  intimamente  ligada às
          dificuldades   visuais.   A   consciência    espacial   é   também  necessária  para trabalhos      como  
                geometria,       valor posicional,     álgebra.     Além     disso,  existem  muitas   razões   pelas   quais uma  criança  ou  um  adulto  pode
          não conseguir      adquirir    conhecimentos e    habilidades    matemáticas.   Por exemplo,    uma    criança    que     julga os  símbolos  confusos  pode   ter  tido sucesso  com   a   aritmética     mental,
             mas   acha   a   aritmética   escrita   um grande desafio.</Text>
       </View>
      },
      {
          key:'2',
          title:'Exemplo de exercício',
          text:'Basta pressionar o número que está faltando na sequência, sinalizado com "?" . ',
          image: <Image
          source={require('../../../../assets/tuto4_2.png')}
          style={{
              resizeMode:'center',
              height:'70%',
              width:'80%',
              borderWidth:1,
              borderColor:'#fff',
              marginTop:-30
          }}
         /> 
        },
     
          {
              key:'3',
              title1:'Entendido? Vamos começar!',
              text2:'Basta pressionar o número que corresponde a quantidade de bolinhas da tela anterior',
              butto: <View style={{flex:1,justifyContent:'center', marginBottom:'20%'}}>
                  <TouchableOpacity onPress={() => chamaTeste2()} style={{borderRadius:150,backgroundColor:'#fff',width:250,height:250, justifyContent:'center'}}>
                  <Text style={{fontSize:50,fontWeight:'bold',textAlign:'center',color:'#04abd8'}}>Iniciar</Text>
              </TouchableOpacity></View>
              
            }
  ]

  function chamaModal(resposta){//chama tutorial, avalia resposta e enviar pro firebase
    setVisivel(true);

    if(resposta == 4){
      teste();
    }

    enviaResultadoBancoT3();
}

  function chamaTeste2(){//fecha tutorial e navega para o proximo teste
    setVisivel(false)
    navigation.reset({
      index:0,
      routes: [{ name: 'Teste4_1'}],
    })
}

  function renderSliders({item}){//organiza os dados da lista "slider" para ser renderizado
    return(
 <View style={{flex:1,alignItems:'center'}}>
    <Text style={{fontSize:28, color:'#fff', textAlign:'center',marginTop:10, fontWeight:'bold'}}>{item.title}</Text>
    <Text style={{fontSize:25, color:'#fff', textAlign:'center',marginTop:15, fontWeight:'bold'}}>{item.title1}</Text>

   {item.image} 
   {item.butto}
   <Text style={{fontSize:20, color:'#fff', textAlign:'center', marginTop:5,marginLeft:'3%',marginRight:'3%'}}>{item.text}</Text>
   <Text style={{fontSize:20, color:'#fff', textAlign:'center', marginTop:-30,marginLeft:'3%',marginRight:'3%'}}>{item.text1}</Text>
 </View>
    )
}
  
   return (
    <View style={styles.container}>
  
    <Animatable.View  animation="zoomIn" style={styles.numero}>
      <Text style={styles.valor}>Quantas bolinhas   você viu?</Text>
      
    </Animatable.View>
  
      <Animatable.View animation="zoomIn" style={styles.viewBtn}>
          <View style={styles.viewBtn1e2}>
            <TouchableOpacity style={styles.btn} onPress={() => chamaModal(2)}>
              <Text style={styles.btnNum}>2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => chamaModal(3)}>
              <Text style={styles.btnNum}>3</Text>
            </TouchableOpacity>
            
          </View>

          <View style={styles.viewBtn3e4}>
            <TouchableOpacity style={styles.btn} onPress={() => chamaModal(4)}>
              <Text style={styles.btnNum}>4</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => chamaModal(5)}>
              <Text style={styles.btnNum}>5</Text>
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
      fontSize:55,
      fontWeight:'bold',
      textAlign:'center'
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
    }
})