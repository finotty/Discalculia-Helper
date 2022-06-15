import React,{useState, useEffect, useContext} from 'react';
import { View,Text, TouchableOpacity, StyleSheet,Modal,Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {AuthContext} from '../../../contexts/auth';


export default function Desafio3({route}) {
 const [s1, setS1] = useState(true);
 let x =0;
 let vet = [];
 let vet2 = [];
 const {atualizar, veto, atualizaFrame,setVeto,rodada,setRodada,vetoQuadro,contaBolinhas, setContaBolinhas,start,setStart} = useContext(AuthContext);

  const navigation = useNavigation();

  const [quadrados, setQuadrados ] = useState([]);
  

  //variavel booleana que chama um Modal para dar inicio ao jogo
  const [chamaModalinicio, setChamaModalinicio] = useState(true);

  //variaveis que ajudam com o controle da estilização
  const [visivel, setVisivel] = useState(false);
  const [visivel1, setVisivel1] = useState(false);
  const [visivel2, setVisivel2] = useState(false);
  const [visivel3, setVisivel3] = useState(false);
  const [visivel4, setVisivel4] = useState(false);
  const [visivel5, setVisivel5] = useState(false);
  const [visivel6, setVisivel6] = useState(false);
  const [visivel7, setVisivel7] = useState(false);
  const [visivel8, setVisivel8] = useState(false);
  const [visivel9, setVisivel9] = useState(false);

  const [numero, setNumero] = useState(0);

  
    
  useEffect(()=> {
     if(start == false){
    if(atualizaFrame == true) {

      if(rodada == 5 ){//condição para termminar o jogo
        navigation.reset({
          index:0,
          routes:[{ name: 'Desafio3_2'}]
        })
      }
            x = (Math.floor(Math.random() * (9 - 4 + 1)) + 1);

                                     //laço que popula o vetor com numeros aleatorios
            for(let a=0; a<=x; a++){ //para exibir as bolinhas em "quadrados" aleatorios.
                                     
              if(x >=3){

                    let k = (Math.floor(Math.random() * (9 - 1 + 1)) + 1);
                    vet[a] = k;

              }else{
                    x=3;
                    a=0;
                    vet[0] = (Math.floor(Math.random() * (9 - 4 + 1)) + 1);
              }      
            }
          
             for(let i=0; i<=x; i++){ //laço que controla a exibição das "bolinhas"
     
              switch (vet[i]) {
                  case 1: setVisivel(true);
                    break;
                  case 2: setVisivel1(true);
                    break;
                  case 3: setVisivel2(true);
                    break;
                  case 4: setVisivel3(true);
                    break;
                  case 5: setVisivel4(true);
                    break;
                  case 6: setVisivel5(true);
                    break;
                  case 7: setVisivel6(true);
                    break;
                  case 8: setVisivel7(true);
                    break;
                  case 9: setVisivel8(true);
                    break;
                  case 10: setVisivel9(true);
                    break; 
              } 
               vet2[i] = vet[i];
               
            }

            let vetSeparado = [...new Set(vet2)];//retira do vetor numeros repetidos
            setRodada(rodada +1);
            setVeto(vetSeparado);
            if(rodada != 5){
              setContaBolinhas(contaBolinhas + vetSeparado.length);
            } 
            atualizar();
      
      }

      if(numero <= 1){//controla o tempo de exibição das bolinhas
        const timer= setInterval( () => {
        setNumero(numero + 0.08);
      },50);
            
      return () => clearInterval(timer);
      }else{          //quando "numero" atinge o valor de 1, a navegação segue para proxima tela
          setNumero(0);
          
          navigation.reset({
              index: 0,
              routes: [{ name: 'Desafio3_1' }],
            });
      }  
    }
   },[numero,start]);

   function Start(){
     setStart(false);
     atualizar();
   }


 return (
   
   <View style={styles.container}>
      <View style={styles.viewGrupoQuadrados}>
          <View style={styles.viewQuadrado}>
              <View style={styles.btnQuadrado}>
                <Text style={(visivel == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
              </View>

              <View style={styles.btnQuadrado}>
               <Text style={(visivel1 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
              </View>

              <View style={styles.btnQuadrado}>
               <Text style={(visivel2 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
              </View>

              <View style={styles.btnQuadrado}>
               <Text style={(visivel3 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
              </View>

              <View style={styles.btnQuadrado}>
               <Text style={(visivel4 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
              </View>
          </View>

          <View style={styles.viewQuadrado}>
              <View style={styles.btnQuadrado}>
               <Text style={(visivel5 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
              </View>

              <View style={styles.btnQuadrado}>
               <Text style={(visivel6 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
              </View>

              <View style={styles.btnQuadrado}>
               <Text style={(visivel7 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
              </View>

              <View style={styles.btnQuadrado}>
               <Text style={(visivel8 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
              </View>

              <View style={styles.btnQuadrado}>   
               <Text style={(visivel9 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
              </View>
          </View>
      </View>

      <Modal visible={start}>
        <View style={{backgroundColor:"#fff", flex:1, alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{width:100, height:100, borderRadius:50,backgroundColor:'red',alignItems:'center', justifyContent:'center'}} onPress={() => Start()}>
            <Text style={{color:'#fff', fontSize:20, fontWeight:'bold'}}>Iniciar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      

   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#aeced2',   
  },
  viewQuadrado:{
    alignItems:'center',
    justifyContent:'center',
    
  },
  btnQuadrado:{
   width: 100,
   height: 100,
   borderWidth:1,
   alignItems:'center',
   justifyContent:'center',
   backgroundColor:'#fff'
  },
  txtQuadradosVermelhos:{
    backgroundColor:'#bf0a0d',
    width: 50,
    height: 50,
    borderRadius:25
  },
  txtQuadradosAzuis:{
    backgroundColor:'#027fe9',
    width: 50,
    height: 50,
    borderRadius:25
  },
  txtQuadradosBranco:{
    backgroundColor:'#fff',
    width: 50,
    height: 50,
    borderRadius:25
  },
  viewGrupoQuadrados:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'20%'
  }
 
});