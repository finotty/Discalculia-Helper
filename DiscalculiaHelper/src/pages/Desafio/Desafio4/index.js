import React,{useState,useEffect,useContext} from 'react';
import { View, Text , StyleSheet, TouchableOpacity, Image, ScrollView, Modal} from 'react-native';
import {AuthContext} from '../../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

export default function Desafio4() {
    
    const navigation = useNavigation();//responsavel pela navegação entre telas
    const [jogador1, setJogador1]= useState(true);
    const [jogador2, setJogador2]= useState(false);

    const {setVencedor,valor,setValor} = useContext(AuthContext);

    const [marcaValor1, setMarcaValor1]= useState(0);//------------------------------------------------------------------------------------
    const [marcaValor2, setMarcaValor2]= useState(0);
    const [marcaValor3, setMarcaValor3]= useState(0);
    const [marcaValor4, setMarcaValor4]= useState(0);
    const [marcaValor5, setMarcaValor5]= useState(0);//variaveis utilizadas para renderizar as hastes e por em evidencia se ja foi clicada 
    const [marcaValor6, setMarcaValor6]= useState(0);
    const [marcaValor7, setMarcaValor7]= useState(0);
    const [marcaValor8, setMarcaValor8]= useState(0);
    const [marcaValor9, setMarcaValor9]= useState(0);
    const [marcaValor10, setMarcaValor10]= useState(0);//-----------------------------------------------------------------------------------

    const [contador, setContador]= useState(0);

    const imgTrem1 = require('../../../assets/trains/trem1.png');//-------------------------------------
    const imgTrem2 = require('../../../assets/trains/trem2.png');
    const imgTrem3 = require('../../../assets/trains/trem3.png');
    const imgTrem4 = require('../../../assets/trains/trem4.png');
    const imgTrem5 = require('../../../assets/trains/trem5.png');
    const imgTrem6 = require('../../../assets/trains/trem6.png');//imagens utilizadas
    const imgTrem7 = require('../../../assets/trains/trem7.png');
    const imgTrem8 = require('../../../assets/trains/trem8.png');
    const imgTrem9 = require('../../../assets/trains/trem9.png');
    const imgTrem10 = require('../../../assets/trains/trem10.png');
    const imgLocomotiva = require('../../../assets/trains/comitiva.png');
    const backGroundTrem = require('../../../assets/trains/backTrem.jpeg');
    const imgLinha = require('../../../assets/trains/linha.png');//-------------------------------------
    
    useEffect(() => {//verifica se  a variavel "Valor" ja foi preenchida, se não, atribui um valor pseudo aleatorio a ela.
        if(valor ==0){
        setValor(getRandomIntInclusive(30,50))
        }
       
    },[valor,contador])

    function getRandomIntInclusive(min, max) {//função que gera numero pseudo aleatório
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function turno(){//verifica de quem é a vez

        if(jogador1 == true ){
            setJogador1(false);
            setJogador2(true);
        }else{
            setJogador1(true);
            setJogador2(false);
        }  
    }

    function addVagao(vagao){//adiciona um vagão ao trem
      let contadorIntermed = contador + vagao; //contadorIntermed recebe o valor ja incluido no trem + valor atual

       if(contadorIntermed < valor ){//se contadorIntermed for menor que "valor"(tamanho maximo do trem), entra troca a vez e contador recebe o valor de "contadorIntermed"
        turno();
        switch (vagao) {
            case 1: setMarcaValor1(1); 
                break;
            case 2: setMarcaValor2(2);
                break;
            case 3: setMarcaValor3(3);
                break;
            case 4: setMarcaValor4(4);
                break;
            case 5: setMarcaValor5(5);
                break;
            case 6: setMarcaValor6(6);
                break;
            case 7: setMarcaValor7(7);
                break;
            case 8: setMarcaValor8(8);
                break;
            case 9: setMarcaValor9(9);
                break;
            case 10: setMarcaValor10(10);
                break;
               
          }

          setContador(contadorIntermed);

       }else if (contadorIntermed == valor){//se "contadorIntermed" for igual a "valor", o trem esta completo, exibe este ultimo vagao e indica quem venceu
        switch (vagao) {
            case 1: setMarcaValor1(1); 
                break;
            case 2: setMarcaValor2(2);
                break;
            case 3: setMarcaValor3(3);
                break;
            case 4: setMarcaValor4(4);
                break;
            case 5: setMarcaValor5(5);
                break;
            case 6: setMarcaValor6(6);
                break;
            case 7: setMarcaValor7(7);
                break;
            case 8: setMarcaValor8(8);
                break;
            case 9: setMarcaValor9(9);
                break;
            case 10: setMarcaValor10(10);
                break;
               
          }

          if(jogador1 == true){
             setVencedor('Jogador 1 Venceu!!');
          }else if (jogador2 == true){
              setVencedor('Jogador 2 Venceu!!');
          }
          
            setMarcaValor1(0);
            setMarcaValor2(0);
            setMarcaValor3(0);
            setMarcaValor4(0);
            setMarcaValor5(0);
            setMarcaValor6(0);
            setMarcaValor7(0);
            setMarcaValor8(0);
            setMarcaValor9(0);
            setMarcaValor10(0);
            setValor(0);
            setContador(0);
            setJogador1(true);
            setJogador2(false);

          navigation.reset({
              index:0,
              routes:[{name: 'Desafio4_1'}]
          })

          
       }else if (contadorIntermed > valor ){//se "contadorIntermed" maior que "valor", jogador corrente perde e a tela final é chamada
         if(jogador1 == true){
             setVencedor('Jogador 2 Venceu!!');
         }else{
            setVencedor('Jogador 1 Venceu!!');
         }

         setValor(0);

         navigation.reset({
            index:0,
            routes:[{name: 'Desafio4_1'}]
        })
       }
       

    }

  
 return (
<View style={{flex:1, paddingTop:'40%', backgroundColor:'#50c3d6'}}>
    <Image
     source={backGroundTrem}
     style={{width:'100%', height:'100%'}}
    />

   <View style={styles.container}>
       <View style={styles.cabecalho}>
           <Text style={{fontSize:28, fontWeight:'bold'}}>Vez do Jogador {(jogador1 == true)?'1':'2'}</Text>

       </View>

            <View style={styles.astes}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>

                   { (marcaValor1 != 1)? <TouchableOpacity style={{width:20,height:30, backgroundColor:'black', marginTop:'55.4%'}}
                    onPress={() => addVagao(1)}></TouchableOpacity> :
                     <Text style={{width:20,height:30, marginTop:'55.4%'}}></Text>
                    }

                        { (marcaValor2 != 2)? <TouchableOpacity style={{width:20,height:50, backgroundColor:'#ff8830',marginTop:'49.2%'}}
                        onPress={() => addVagao(2)}></TouchableOpacity> :
                         <Text style={{width:20,height:50,marginTop:'49.2%'}}></Text>
                        }

                            { (marcaValor3 != 3)? <TouchableOpacity style={{width:20,height:70, backgroundColor:'#9e0c39',marginTop:'42.9%'}}
                            onPress={() => addVagao(3)}></TouchableOpacity> :
                             <Text style={{width:20,height:70,marginTop:'42.9%'}}></Text>
                            }

                                { (marcaValor4 != 4)? <TouchableOpacity style={{width:20,height:90, backgroundColor:'#83a300',marginTop:'36.8%'}}
                                onPress={() => addVagao(4)}></TouchableOpacity> :
                                 <Text style={{width:20,height:90,marginTop:'36.8%'}}></Text>
                                }

                                    { (marcaValor5 != 5)? <TouchableOpacity style={{width:20,height:110, backgroundColor:'#483078',marginTop:'30.8%'}}
                                    onPress={() => addVagao(5)}></TouchableOpacity> :
                                     <Text style={{width:20,height:110,marginTop:'30.8%'}}></Text>
                                    }

                    { (marcaValor6 != 6)? <TouchableOpacity style={{width:20,height:130, backgroundColor:'#e6ae00',marginTop:'24.5%'}}
                    onPress={() => addVagao(6)}></TouchableOpacity> :
                     <Text style={{width:20,height:130,marginTop:'24.5%'}}></Text>
                    }

                            { (marcaValor7 != 7)? <TouchableOpacity style={{width:20,height:150, backgroundColor:'#0ccaba',marginTop:'18.2%'}}
                            onPress={() => addVagao(7)}></TouchableOpacity> :
                             <Text style={{width:20,height:150,marginTop:'18.2%'}}></Text>
                            }

                                { (marcaValor8 != 8)? <TouchableOpacity style={{width:20,height:170, backgroundColor:'#4e5c69',marginTop:'12.2%'}}
                                onPress={() => addVagao(8)}></TouchableOpacity> :
                                 <Text style={{width:20,height:170, marginTop:'12.2%'}}></Text>
                                }

                                   { (marcaValor9 != 9)?<TouchableOpacity style={{width:20,height:190, backgroundColor:'#9e3f00',marginTop:'6%'}}
                                    onPress={() => addVagao(9)}></TouchableOpacity> :
                                     <Text style={{width:20,height:190,marginTop:'6%'}}></Text>
                                    }

                                        { (marcaValor10 != 10)?<TouchableOpacity style={{width:20,height:210, backgroundColor:'#204b5e',marginTop:'-0.2%'}}
                                        onPress={() => addVagao(10)}></TouchableOpacity> :
                                         <Text style={{width:20,height:210,marginTop:'-0.2%'}}></Text>
                                        }
              </View>
              
              <Text style={{fontSize:18, fontWeight:'bold'}}> 1     2     3      4      5     6     7      8     9    10</Text>
            </View>

                    <View style={styles.trens}>
                       <View style={{marginTop:'2.8%', marginLeft:'3%'}}>
                            <Text style={{fontSize:18, fontWeight:'bold'}}>            Monte um trem de tamanho {valor}.</Text>
                        </View>
                        <ScrollView horizontal={true} style={{marginTop:'7.5%'}}>


                        <View style={{width:'90%', height:'23%',flexDirection:'row',paddingTop:50}}>
                           {(marcaValor1 == 1) ? 
                             <View style={{justifyContent:'center'}}>
                                 <Image
                                  source={imgTrem1}
                                  style={{width:78,height:50,}}
                                 />
                             </View>   : null
                           }
                            { (marcaValor2 == 2) ?
                             <View style={{justifyContent:'center'}}>
                                 <Image
                                  source={imgTrem2} 
                                  style={{width:78,height:50,}}
                                 />
                             </View> : null
                            }
                            {
                             (marcaValor3 == 3) ?
                             <View style={{justifyContent:'center'}}>
                                 <Image
                                 source={imgTrem3}
                                 style={{width:78,height:50,}}
                                 />
                             </View> : null
                            }
                            {
                             (marcaValor4 == 4) ?
                             <View style={{justifyContent:'center'}}>
                                <Image
                                 source={imgTrem4}
                                 style={{width:78,height:50,}}
                                 />
                             </View> : null
                            }
                            {
                             (marcaValor5 == 5) ?
                             <View style={{justifyContent:'center'}}>
                                <Image
                                 source={imgTrem5}
                                 style={{width:78,height:50,}}
                                 />
                             </View> : null
                            }
                            {
                             (marcaValor6 == 6) ?
                             <View style={{justifyContent:'center'}}>
                                <Image
                                 source={imgTrem6}
                                 style={{width:78,height:50,}}
                                 />
                             </View> : null
                            }
                            {
                             (marcaValor7 == 7) ?
                             <View style={{justifyContent:'center'}}>
                                <Image
                                 source={imgTrem7}
                                 style={{width:78,height:50,}}
                                 />
                             </View> : null
                            }
                            {
                             (marcaValor8 == 8) ?
                             <View style={{justifyContent:'center'}}>
                                <Image
                                 source={imgTrem8}
                                 style={{width:78,height:50,}}
                                 />
                             </View> : null
                            }
                            {
                             (marcaValor9 == 9) ?
                             <View style={{justifyContent:'center'}}>
                                <Image
                                 source={imgTrem9}
                                 style={{width:78,height:50,}}
                                 />
                             </View> : null
                            }
                            {
                             (marcaValor10 == 10)?
                             <View style={{justifyContent:'center'}}>
                                <Image
                                 source={imgTrem10}
                                 style={{width:78,height:50,}}
                                 />
                             </View> : null
                            }
                            
                             <View style={{justifyContent:'center',marginTop:-72, height:125}}>
                                <Image
                                 source={imgLocomotiva}
                                 style={{width:78,height:75,}}
                                 />
                             </View> 
                            
                           
             
                        </View>
              
                        </ScrollView>
                             

                             <Text style={{fontWeight:'bold', fontSize:43,textAlign:'center',height:121,marginTop:-20,color:'#fff',paddingTop:45}}>{contador}</Text>
                       
                    </View>

                  
                    </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
     // backgroundColor:'#a7c5bd',
     marginTop:'-175%'
       
    },
    cabecalho:{
      height:'10%' ,
      borderWidth:1,
      margin: "2%",
      marginTop:'8%',
      alignItems:'center',
      justifyContent:'center'

    },
    astes:{
       flex: 1,
       borderWidth:1,
       margin: "2%",
       justifyContent:'flex-end',
       paddingLeft:10,
       //paddingBottom:15,
       paddingRight:10
    },
    trens:{
      // flex: 1,
       borderWidth:1,
     //  marginTop: "2%",
       //alignItems:'center',
       borderLeftWidth:0,
       borderRightWidth:0,
       borderBottomWidth:0,
       //backgroundColor:'blue',
       height: '40%',
       paddingTop:'4%',
       marginBottom:-10
       
    }
  
  });
  