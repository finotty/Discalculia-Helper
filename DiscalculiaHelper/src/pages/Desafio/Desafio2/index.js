import React,{useState, useEffect} from 'react';
import { View,Text, TouchableOpacity, StyleSheet,Modal,Image } from 'react-native';
import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function Desafio2({route}) {
  
  const navigation = useNavigation();
  const imgChoco = require('../../../assets/choco.png');
  const imgpimenta = require('../../../assets/pimenta.png');
 
  const [contador, setContador] = useState(1);
  const [jogadas, setJogadas] = useState(0);
  
  //variaveis que ajudam com a validação dos estilos
  const [sty, setSty] = useState(false);
  const [sty1, setSty1] = useState(false);
  const [sty2, setSty2] = useState(false);
  const [sty3, setSty3] = useState(false);
  const [sty4, setSty4] = useState(false);
  const [sty5, setSty5] = useState(false);
  const [sty6, setSty6] = useState(false);
  const [sty7, setSty7] = useState(false);
  const [sty8, setSty8] = useState(false);
  const [sty9, setSty9] = useState(false);
  const [sty10, setSty10] = useState(false);
  const [sty11, setSty11] = useState(false);
  const [sty12, setSty12] = useState(false);

  //jogadores
  const [jogador1, setJogador1] = useState(true);
  const [jogador2, setJogador2] = useState(false);

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
  const [visivel10, setVisivel10] = useState(false);
  const [visivel11, setVisivel11] = useState(false);
  const [visivel12, setVisivel12] = useState(false);

function start(n){//para evitar mais uma paginação, foi aplicado um Modal para iniciar o jogo
    setJogadas(n);
    setChamaModalinicio(false);   
}

function executa (n){//controla a mudança de cor nos botoes

 switch (n) { //ambos switch servem para controlar as cores dos numeros
    case 1: setVisivel(true) ;   
        break;  
    case 2: setVisivel1(true);   
        break; 
    case 3: setVisivel2(true) ;   
        break; 
    case 4: setVisivel3(true) ;   
        break; 
    case 5: setVisivel4(true) ;   
        break; 
    case 6: setVisivel5(true) ;   
        break; 
    case 7: setVisivel6(true) ;   
        break; 
    case 8: setVisivel7(true) ;   
        break; 
    case 9: setVisivel8(true) ;   
        break;
    case 10: setVisivel9(true) ;   
        break; 
    case 11: setVisivel10(true) ;   
        break; 
    case 12: setVisivel11(true) ;   
        break; 
     
}
  
  if(jogador1 == true){

    switch (n) {
        case 1: setSty(true);   
            break; 
        case 2: setSty1(true);   
            break; 
        case 3: setSty2(true);   
            break; 
        case 4: setSty3(true);   
            break; 
        case 5: setSty4(true);   
            break; 
        case 6: setSty5(true);   
            break; 
        case 7: setSty6(true);   
            break; 
        case 8: setSty7(true);   
            break; 
        case 9: setSty8(true);   
            break; 
        case 10: setSty9(true);   
            break; 
        case 11: setSty10(true);   
            break; 
        case 12: setSty11(true);   
            break; 
        
      
    }

  }

  setContador(contador + 1);

  if((contador == jogadas)&&(jogador1 == true) ){
     setJogador1(false);
     setJogador2(true);
     setContador(1);
  }else if ((contador == jogadas) && (jogador2 == true)){
    setJogador2(false);
    setJogador1(true);
    setContador(1);
  }

}

function completarJogada(){//Define o jogador atual e aplica regra do jogo
   if((jogador1 == true)&&(contador > 1)){
     setJogador1(false);
     setJogador2(true);
     setContador(1);
     
   }else if((jogador2 == true)&&(contador > 1)){
    setJogador1(true);
    setJogador2(false);
    setContador(1);
   }
}

function pimenta(){ //navega para tela "Desafio2_1" levando resultado do jogo
 
  setVisivel12(true);

  if(jogador1 == true){
    
    setSty12(true);
   
    let venc = 'Jogador 2 Venceu!!!';
    navigation.navigate('Desafio2_1', {venc});
  }else{
  
    let venc = 'Jogador 1 Venceu!!!';
    navigation.navigate('Desafio2_1', {venc});
  }
  
}

 return (
   
   <View style={styles.container}>
     <StatusBar backgroundColor="#fff" barStyle='light-content'/>
   
    <View style={styles.viewTitle}>
        <View style={(jogador1 ==true)?styles.viewJogador1 : styles.viewJogador2}>
          <Text style={styles.cabecalho}>Vez do jogador {(jogador1 == true)? '1' : '2'}</Text> 
        </View>
    </View>

   <View style={styles.viewPrincipal}>
      <View style={styles.viewBtns}>

            <View style={styles.viewBtn }>
                  <TouchableOpacity style={(visivel == false) ? styles.btnNumero : ((sty == true) ? styles.btnNumero1 : styles.btnNumero2)}
                  onPress={() => executa(1)}>
                    <Image
                    source={imgChoco}
                    style={styles.img}
                    />
                  </TouchableOpacity>
            </View>
      
            <View style={styles.viewBtn}>
                  <TouchableOpacity style={(visivel1 == false) ? styles.btnNumero : ((sty1 == true) ? styles.btnNumero1 : styles.btnNumero2)} 
                    onPress={() => executa(2)}>
                    <Image
                    source={imgChoco}
                    style={styles.img}
                    />
                  </TouchableOpacity> 
            </View>
   
      </View>

      <View style={styles.viewBtns}>

            <View style={styles.viewBtn}>
                    <TouchableOpacity style={(visivel2 == false) ? styles.btnNumero : ((sty2 == true) ? styles.btnNumero1 : styles.btnNumero2)}
                      onPress={() => executa(3)}>
                      <Image
                      source={imgChoco}
                      style={styles.img}
                      />
                    </TouchableOpacity>
            </View>

            <View style={styles.viewBtn}>
                  <TouchableOpacity style={(visivel3 == false) ? styles.btnNumero : ((sty3 == true) ? styles.btnNumero1 : styles.btnNumero2)}
                     onPress={() => executa(4)}>
                    <Image
                     source={imgChoco}
                     style={styles.img}
                    />
                  </TouchableOpacity>
            </View>

            <View style={styles.viewBtn}>
                  <TouchableOpacity style={(visivel4 == false) ? styles.btnNumero : ((sty4 == true) ? styles.btnNumero1 : styles.btnNumero2)}
                     onPress={() => executa(5)}>
                    <Image
                     source={imgChoco}
                     style={styles.img}
                    />
                  </TouchableOpacity>
            </View>
      </View>

      <View style={styles.viewBtns}>

            <View style={styles.viewBtn}>
                  <TouchableOpacity style={(visivel5 == false) ? styles.btnNumero : ((sty5 == true) ? styles.btnNumero1 : styles.btnNumero2)}
                    onPress={() => executa(6)}>
                    <Image
                    source={imgChoco}
                    style={styles.img}
                    />
                  </TouchableOpacity>
            </View>

            <View style={styles.viewBtn}>
                  <TouchableOpacity style={(visivel6 == false) ? styles.btnNumero : ((sty6 == true) ? styles.btnNumero1 : styles.btnNumero2)}
                   onPress={() => executa(7)}>
                    <Image
                     source={imgChoco}
                     style={styles.img}
                    />
                  </TouchableOpacity>
            </View>

            <View style={styles.viewBtn}>
                  <TouchableOpacity style={(visivel7 == false) ? styles.btnNumero : ((sty7 == true) ? styles.btnNumero1 : styles.btnNumero2)}
                    onPress={() => executa(8)}>
                    <Image
                    source={imgChoco}
                    style={styles.img}
                    />
                  </TouchableOpacity>
            </View>

            <View style={styles.viewBtn}>
                  <TouchableOpacity style={(visivel8 == false) ? styles.btnNumero : ((sty8 == true) ? styles.btnNumero1 : styles.btnNumero2)}
                    onPress={() => executa(9)}>
                  <Image
                    source={imgChoco}
                    style={styles.img}
                    />
                  </TouchableOpacity>
            </View>
      </View>

      <View style={styles.viewBtns}>
            <View style={styles.viewBtn}>
                  <TouchableOpacity style={(visivel9 == false) ? styles.btnNumero : ((sty9 == true) ? styles.btnNumero1 : styles.btnNumero2)}
                  onPress={() => executa(10)}>
                    <Image
                    source={imgChoco}
                    style={styles.img}
                    />
                  </TouchableOpacity>
            </View>

            <View style={styles.viewBtn}>
                  <TouchableOpacity style={(visivel10 == false) ? styles.btnNumero : ((sty10 == true) ? styles.btnNumero1 : styles.btnNumero2)}
                    onPress={() => executa(11)}>
                  <Image
                    source={imgChoco}
                    style={styles.img}
                    />
                  </TouchableOpacity>
            </View>

            <View style={styles.viewBtn}>
                  <TouchableOpacity style={(visivel11 == false) ? styles.btnNumero :((sty11 == true) ? styles.btnNumero1 : styles.btnNumero2)}
                    onPress={() => executa(12)}>
                    <Image
                    source={imgChoco}
                    style={styles.img}
                    />
                  </TouchableOpacity>
            </View>
      </View>
      <View style={styles.viewBtns}>
            <View style={styles.viewBtn}>
                  <TouchableOpacity style={(visivel12 == false) ? styles.btnNumero :((sty12 == true) ? styles.btnNumero1 : styles.btnNumero2)}
                    onPress={() => pimenta()}>
                    <Image
                    source={imgpimenta}
                    style={styles.img}
                    />
                  </TouchableOpacity>
            </View>
      </View>

      </View>
      <View style={styles.viewBtns}>
            <View style={styles.viewBtn}>
                  <TouchableOpacity style={styles.btnVai}
                   onPress={() => completarJogada()}>
                   <Text style={styles.txtVai}>Vai</Text>
                  </TouchableOpacity>
            </View>
      </View>
       
      
      <Modal animationType='fade' visible={chamaModalinicio}>
        <View style={{flex:1, alignItems:'center',backgroundColor:'#e0eff1'}}>
        <StatusBar backgroundColor="#e0eff1" barStyle='light-content'/>
              <View style={{marginTop:10 }}>
                <Text style={{fontSize:25, fontWeight:'bold',margin:'5%'}}>Quantas cartas podem ser coletadas por vez?</Text>
              </View>

              <Text style={{marginTop:'30%',marginBottom:'15%',fontSize:20, fontWeight:'bold', margin:'5%'}}>Basta escolher um numero para iniciar o jogo!</Text>
            
                <TouchableOpacity style={{borderWidth:1, backgroundColor:'blue', alignItems:'center',width:120,height:120,borderRadius:60,justifyContent:'center',marginBottom:15}}
                   onPress={() => start(2)}>
                  <Text style={{fontSize:28, fontWeight:'bold', color:'#fff'}}>2</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth:1, backgroundColor:'red', alignItems:'center',width:120,height:120,borderRadius:60,justifyContent:'center',marginTop:15}}
                  onPress={() => start(3)}>
                  <Text style={{fontSize:28, fontWeight:'bold', color:'#fff'}}>3</Text>
                </TouchableOpacity>
        </View>
      </Modal>

     
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
     
  },
  viewPrincipal:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
    marginBottom:'5%',
    marginTop:'15%'
  },
  viewTitle:{
    marginTop:'2%',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  cabecalho:{
    fontSize:25,
    fontWeight:'bold',
    color:'#fff',

   
  },
  viewBtn:{ 
    marginLeft:'4%',
    marginTop:15,
    
  },
  btnNumero:{
    backgroundColor:'#e0eff1',
    width: 70,
    height: 80,
    borderRadius:10,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center'
  },
  btnNumero1:{
    
    backgroundColor:'blue',
    width: 70,
    height: 80,
    borderRadius:10,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center'
  },
  btnNumero2:{
    backgroundColor:'#f23',
    width: 70,
    height: 80,
    borderRadius:10,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center'
  },
  numero:{
    fontSize:70,
    fontWeight:'bold'
  },
  viewBtns:{
    
    flexDirection:'row',
    justifyContent:'center'
   
  },
  box:{
    width: 90,
    height: 60,
    borderWidth:1,
    borderRadius:15,
    marginTop:10,
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    marginLeft:'18%',
    color:'#fff'

  },

  viewJogador1:{
    backgroundColor:'blue',
    width: 240,
    height: 60,
    //marginLeft:'5%',
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center'
    
  },
  viewJogador2:{
    backgroundColor:'#f23',
    width: 240,
    height: 60,
   // marginRight:'5%',
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center'
  },
  img:{
    width: 70,
    height: 80
  },
  btnVai:{
    width: 200,
    height: 60,
    borderRadius:15,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:'10%',
    marginTop:20
  },
  txtVai:{
    fontSize:28,
    color: "#fff",
    fontWeight:'bold'
  }


});