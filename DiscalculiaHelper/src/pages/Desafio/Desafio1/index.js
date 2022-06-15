import React,{useState, useEffect} from 'react';
import { View,Text, TouchableOpacity, StyleSheet,Modal } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';

//Clear the Deck
export default function Desafio1({route}) {
  
  
  const navigation = useNavigation();

  const [segundos, setSegundos] = useState(30);
  
  //vetor que é preenchido com as variaveis pseudo aleatórias
  const [grade, setGrade] = useState([]);
  
  const [atualiza, setAtualiza] = useState(false);

 //Variaveis que recebem os numeros pseudo aleatórios
  const [x, setX] = useState(0);
  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(0);
  const [x3, setX3] = useState(0);
  const [x4, setX4] = useState(0);
  const [x5, setX5] = useState(0);
  const [x6, setX6] = useState(0);
  const [x7, setX7] = useState(0);
  const [x8, setX8] = useState(0);
  const [x9, setX9] = useState(0);
  const [x10, setX10] = useState(0);
  const [x11, setX11] = useState(0);

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

  //jogadores
  const [jogador1, setJogador1] = useState(true);
  const [jogador2, setJogador2] = useState(false);

  //contadores de puntuação
  const [pontos1, setPontos1] = useState(0);
  const [pontos2, setPontos2] = useState(0);

  //variaveis que recebem o valor do "click" para somar
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);

  //variavel que marca o "tempo de jogo", varia de 0 a 1, incrementando 0.001 a cada 100 ms
  const [numero, setNumero] = useState(0);
  
  //variavel booleana que chama um Modal para dar inicio ao jogo
  const [chamaModalinicio, setChamaModalinicio] = useState(true);

  //String que recebe o  vencedor e é enviada para proxima tela(Final) indicando quem ganhou
  const [vencedor, setVencedor] = useState('');

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

    
useEffect(() => {  //Esse Effect 1 cuida do tempo que os jogadores tem para escolher os pares,
                     //a variavel "numero" incrementa 0.005 a cada 100ms até valer 1 utilizando a função 'setInterval' do javascript
                     //alem de incrementar os pontos de cada jogador a cada par escolhido.
                     //quando o "numero" chega a 1, ele retorna o "vencedor" e enviar pra proxima tela(Final)
   if(chamaModalinicio == false){
    if(n1 > 0 && n2 > 0){
    incrementePonto();
    }
    if(numero <= 0.9){
     const timer= setInterval( () => {
     setNumero(numero + 0.030);
     setSegundos(segundos - 1);
    },900);
    
    return () => clearInterval(timer);
    }else{
        ganhador();
       let vence = vencedor;
       let pt1 = pontos1;
       let pt2 = pontos2;
       navigation.navigate("Desafio1_1", {vence , pt1, pt2});
       
    }

   }
   
}),[chamaModalinicio];
useEffect(() => { //Este Effect 2 garante que os valores da grade estarão corretos, comparando o primeiro valor
                  //do vetor(grade) com o primeiro valor da matriz que é exibida para os jogadores, 
                  //se não for o mesmo valor, ele zera o vetor e preenche novamente.
  if (grade[0] != x){
    grade.splice(0,grade.length);
    Grades();
  }
  if(grade.length == 0){ //esta condição é para casos em que a Thread falha ao preencher a grade.
    Grades(); 
  } 
},[x]);
useEffect(() => { //Effect 3 usado para atualizar a grade(vetor com os numeros do jogo), 
  //quando a grade não tem mais combinações que somam 10 a variavel "atualiza" se torna 'true',
  //gera novos numeros, volta as cores pro padrao, acaba de zerar a grade caso ainda tenha numeros
  //e preenche novamente com novos numeros aleatórios.
if(atualiza == true){
getRandomIntInclusive(); 

grade.splice(0,grade.length);

if(grade.length == 0){ //zerar array antes de colocar novos valores
zeraCores();
Grades(); 
}

setAtualiza(false);
}

},[grade.length]);  
function start(){//para evitar mais uma paginação, foi aplicado um Modal para iniciar o jogo
  setNumero(0);
  setChamaModalinicio(false);
   
}
function getRandomIntInclusive(min, max) { //função que gera os numeros pseudo aleatorios
  min = Math.ceil(1);
  max = Math.floor(9);
  return (setX(Math.floor(Math.random() * (max - min + 1)) + min),
          setX1(Math.floor(Math.random() * (max - min + 1)) + min),
          setX2(Math.floor(Math.random() * (max - min + 1)) + min),
          setX3(Math.floor(Math.random() * (max - min + 1)) + min),
          setX4(Math.floor(Math.random() * (max - min + 1)) + min),
          setX5(Math.floor(Math.random() * (max - min + 1)) + min),
          setX6(Math.floor(Math.random() * (max - min + 1)) + min),
          setX7(Math.floor(Math.random() * (max - min + 1)) + min),
          setX8(Math.floor(Math.random() * (max - min + 1)) + min),
          setX9(Math.floor(Math.random() * (max - min + 1)) + min),
          setX10(Math.floor(Math.random() * (max - min + 1)) + min),
          setX11(Math.floor(Math.random() * (max - min + 1)) + min)
         
         );
}
function Grades(){ //função que popula o vetor(grade)
  setGrade(grade.concat(x).concat(x1).concat(x2).concat(x3).concat(x4).concat(x5).concat(x6).concat(x7).concat(x8).concat(x9).concat(x10).concat(x11)); 

} 
function executa (n){//função que recebe o valor clicado pelo jogador, retira do vetor(grade), muda a cor do
  //botão para a cor do jogadore chama a função incrementa ponto caso seja o segundo numero clicado

if(grade.length == 0){
Grades();
}

let pos = grade.indexOf(n); //identifica a posição do numero no vetor(grade)
grade.splice(pos,1); //retira o numero do vetor(grade)

if(grade.length <= 6 ){ 
iteraArray(); //função que verifica as combinações, só chamada quando o vetor esta pela metade.
}

switch (n) { //ambos switch servem para controlar as cores dos numeros
case x: setVisivel(true) ;   
break;  
case x1: setVisivel1(true);   
break; 
case x2: setVisivel2(true) ;   
break; 
case x3: setVisivel3(true) ;   
break; 
case x4: setVisivel4(true) ;   
break; 
case x5: setVisivel5(true) ;   
break; 
case x6: setVisivel6(true) ;   
break; 
case x7: setVisivel7(true) ;   
break; 

}

if(jogador1 == true){

switch (n) {
case x: setSty(true);   
break; 
case x1: setSty1(true);   
break; 
case x2: setSty2(true);   
break; 
case x3: setSty3(true);   
break; 
case x4: setSty4(true);   
break; 
case x5: setSty5(true);   
break; 
case x6: setSty6(true);   
break; 
case x7: setSty7(true);   
break; 


}

}

if(n1 == 0 ){ //condição que seta o par para soma
setN1(n);
}else{
setN2(n);
}


if((n1 !== 0)&&(n2 !== 0)){
incrementePonto(); //função que verifica se o par soma 10. só é chamada quando o usuarioa clica em 2 numeros.
}

}
function executa1 (n){ //Função cópia, porém, para a linha 3 da matriz exibida, pois são valores repetidos e apresentariam problemas com a estilização
if(grade.length == 0){
Grades();
}

let pos = grade.indexOf(n);
grade.splice(pos,1);

if(grade.length <= 6 ){
iteraArray();
}

switch (n) {
case x8: setVisivel8(true) ;   
break;
case x9: setVisivel9(true) ;   
break; 
case x10: setVisivel10(true) ;   
break; 
case x11: setVisivel11(true) ;   
break; 
}

if(jogador1 == true){

switch (n) {
case x8: setSty8(true);   
break; 
case x9: setSty9(true);   
break; 
case x10: setSty10(true);   
break; 
case x11: setSty11(true);   
break; 
}
}

if(n1 == 0 ){
setN1(n);
}else{
setN2(n);
}

if((n1 !== 0)&&(n2 !== 0)){
incrementePonto();
}

}
function incrementePonto(){ //função que atribui cada ponto ao devido jogador, ela verifica se os pares somam 10 e atribui ao jogador corrente
  let res = n1+n2;
  
  if((res == 10) && (jogador1 == true)){
   setPontos1(pontos1 + 1);
   setJogador1(false);
   setJogador2(true);
  
    
    }else if((res == 10) && (jogador2 == true)){
      setPontos2(pontos2 + 1);
      setJogador1(true);
      setJogador2(false);

        } else if(((res > 0)&&(res != 10)) && (jogador1 == true)){
        
        setJogador1(false);
        setJogador2(true);

          }else if(((res > 0)&&(res != 10)) && (jogador2 == true)){
            
            setJogador1(true);
            setJogador2(false);
            }
   
   setN1(0);
   setN2(0);
   res=0;

}  
function iteraArray(){ //esta função verifica toda as combinações que resultam em 10 e incrementa o contador "v",
                       //cada iteração o vetor(grade) fica menor, pois, quando o usuario escolhe um numero, ele é
                       //retirado do vetor(grade), dessa forma, quando o contador chega a 0 significa que nao a mais
                       //pares que somam 10. Em seguida muda o valor de "atualiza" para true, que é chamado la no Effect 1
                       //para atualizar o vetor(grade) e dar continuidade ao jogo até que o Effect 2 acabe a execução.
  let v=0;
   for(var i =0; i <=grade.length; i++){
    for(var j =0; j <=grade.length; j++){
       if(((grade[i] + grade[j]) == 10) && (j !== i) ){
          v = v + 1;    
       }
    }
  }

  if(((v/2) == 0) && ((grade.length % 2) == 0)){
    grade.splice(0,grade.length); 
    setAtualiza(true);
    v=0;

  }

}
function zeraCores(){ //função que tira as cores dos numeros escolhidos pelos jogadores e volta ao padrao
    setVisivel(false);
    setVisivel1(false);
    setVisivel2(false);
    setVisivel3(false);
    setVisivel4(false);
    setVisivel5(false);
    setVisivel6(false);
    setVisivel7(false);
    setVisivel8(false);
    setVisivel9(false);
    setVisivel10(false);
    setVisivel11(false);

    setSty(false);
    setSty1(false);
    setSty2(false);
    setSty3(false);
    setSty4(false);
    setSty5(false);
    setSty6(false);
    setSty7(false);
    setSty8(false);
    setSty9(false);
    setSty10(false);
    setSty11(false);
}
function ganhador(){ //função que verifica o jogador que mais pontuou ou se ouve empate
  if(pontos1 > pontos2){
     setVencedor('Jogador 1 Venceu!!!');
  }else if(pontos1 < pontos2){
    setVencedor('Jogador 2 Venceu!!!');
  }else{
    setVencedor('Empate!')
  }
}

 return (
   
   <View style={styles.container}>
     <StatusBar backgroundColor="#85aab0" barStyle='light-content'/>
   
    <View style={styles.viewTitle}>
      <View style={styles.viewJogador1}>
        <Text style={styles.cabecalho}>Jogador 1</Text>
        <Text style={styles.box}>Pontos    {pontos1}</Text>
      </View>

      <View style={styles.viewJogador2}>
        <Text style={styles.cabecalho}>Jogador 2</Text>
        <Text style={styles.box}>Pontos    {pontos2}</Text> 
      </View>

    </View>

   <Text style={{fontSize:28, fontWeight:'bold', textAlign:'center',marginTop:10}}>{(n1 == 0)? '?' : n1} + {(n2 == 0)? '?' : n2} = {(( n1+n2)==0)? '10' : ( n1+n2) }</Text>
   <Text style={{fontSize:25, fontWeight:'bold', textAlign:'center'}}>Vez do jogador {(jogador1 == true)? '1' : '2'}</Text>
  
  <View style={styles.viewPrincipal}>
      <View style={styles.viewBtns}>
        
          <View style={styles.viewBtn }>

            <TouchableOpacity 
             style={(visivel == false) ?
             styles.btnNumero : ((sty == true) ?
             styles.btnNumero1 : styles.btnNumero2)}
             onPress={() => executa(x)}>

              <Text style={styles.numero}>{(x !== 0) ?
               x : (setX(Math.floor(Math.random() * (9 - 1 + 1)) + 1)) }
              </Text>
            </TouchableOpacity>

          </View>

          <View style={styles.viewBtn}>
            <TouchableOpacity style={(visivel1 == false) ? styles.btnNumero : ((sty1 == true) ? styles.btnNumero1 : styles.btnNumero2)} 
              onPress={() => executa(x1)}
            >
              <Text style={styles.numero}>{(x1 !== x) ? x1 : (setX1(Math.floor(Math.random() * (9 - 1 + 1)) + 1)) }</Text>
            </TouchableOpacity> 
          </View>
   
          <View style={styles.viewBtn}>
            <TouchableOpacity style={(visivel2 == false) ? styles.btnNumero : ((sty2 == true) ? styles.btnNumero1 : styles.btnNumero2)}
             onPress={() => executa(x2)}
            >
              <Text style={styles.numero}>{((x2 !== x1)&&(x2 !== x)) ? x2 : (setX2(Math.floor(Math.random() * (9 - 1 + 1)) + 1)) }</Text>
            </TouchableOpacity>
          </View> 
        
          <View style={styles.viewBtn}>
            <TouchableOpacity style={(visivel3 == false) ? styles.btnNumero : ((sty3 == true) ? styles.btnNumero1 : styles.btnNumero2)}
             onPress={() => executa(x3)}
            >
              <Text style={styles.numero}>{((x3 !== x1)&&(x3 !== x2)&&(x3 !== x)) ? x3 : (setX3(Math.floor(Math.random() * (9 - 1 + 1)) + 1)) }</Text>
            </TouchableOpacity>
          </View>
       
      </View>

      <View style={styles.viewBtns}>
          <View style={styles.viewBtn}>
            <TouchableOpacity style={(visivel4 == false) ? styles.btnNumero : ((sty4 == true) ? styles.btnNumero1 : styles.btnNumero2)}
             onPress={() => executa(x4)}
            >
              <Text style={styles.numero}>{((x4 !== x1)&&(x4 !== x2)&&(x4 !== x3)&&(x4 !== x)) ? x4 : (setX4(Math.floor(Math.random() * (9 - 1 + 1)) + 1)) }</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.viewBtn}>
            <TouchableOpacity style={(visivel5 == false) ? styles.btnNumero : ((sty5 == true) ? styles.btnNumero1 : styles.btnNumero2)}
             onPress={() => executa(x5)}
            >
              <Text style={styles.numero}>{((x5 !== x1)&&(x5 !== x2)&&(x5 !== x3)&&(x5 !== x)&&(x5 !== x4)) ? x5 : (setX5(Math.floor(Math.random() * (9 - 1 + 1)) + 1)) }</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.viewBtn}>
            <TouchableOpacity style={(visivel6 == false) ? styles.btnNumero : ((sty6 == true) ? styles.btnNumero1 : styles.btnNumero2)}
             onPress={() => executa(x6)}
            >
              <Text style={styles.numero}>{((x6 !== x1)&&(x6 !== x2)&&(x6 !== x3)&&(x6 !== x)&&(x6 !== x4)&&(x6 !== x5)) ? x6 : (setX6(Math.floor(Math.random() * (9 - 1 + 1)) + 1)) }</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewBtn}>
            <TouchableOpacity style={(visivel7 == false) ? styles.btnNumero : ((sty7 == true) ? styles.btnNumero1 : styles.btnNumero2)}
             onPress={() => executa(x7)}
            >
              <Text style={styles.numero}>{((x7 !== x1)&&(x7 !== x2)&&(x7 !== x3)&&(x7 !== x)&&(x7 !== x6)&&(x7 !== x5)&&(x7 !== x4)) ? x7 : (setX7(Math.floor(Math.random() * (9 - 1 + 1)) + 1)) }</Text>
            </TouchableOpacity>
          </View>
      </View>


      <View style={styles.viewBtns}>
          <View style={styles.viewBtn}>
            <TouchableOpacity style={(visivel8 == false) ? styles.btnNumero : ((sty8 == true) ? styles.btnNumero1 : styles.btnNumero2)}
             onPress={() => executa1(x8)}
            >
              <Text style={styles.numero}>{((x8 !== x6)&&(x8 !== x5)&&(x8 !== x4)) ? x8 : (setX8(Math.floor(Math.random() * (9 - 1 + 1)) + 1)) }</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.viewBtn}>
            <TouchableOpacity style={(visivel9 == false) ? styles.btnNumero : ((sty9 == true) ? styles.btnNumero1 : styles.btnNumero2)}
             onPress={() => executa1(x9)}
            >
              <Text style={styles.numero}>{((x9 !== x5)&&(x9 !== x6)&&(x9 !== x7)&&(x9 !== x8)) ? x9 : (setX9(Math.floor(Math.random() * (9 - 1 + 1)) + 1)) }</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.viewBtn}>
            <TouchableOpacity style={(visivel10 == false) ? styles.btnNumero : ((sty10 == true) ? styles.btnNumero1 : styles.btnNumero2)}
             onPress={() => executa1(x10)}
            >
              <Text style={styles.numero}>{((x10 !== x6)&&(x10 !== x7)&&(x10 !== x8)&&(x10 !== x9)) ? x10 : (setX10(Math.floor(Math.random() * (9 - 1 + 1)) + 1)) }</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewBtn}>
            <TouchableOpacity style={(visivel11 == false) ? styles.btnNumero :((sty11 == true) ? styles.btnNumero1 : styles.btnNumero2)}
             onPress={() => executa1(x11)}
            >
              <Text style={styles.numero}>{((x11 !== x4)&&(x11 !== x7)&&(x11 !== x8)&&(x11 !== x9)&&(x11 !== x10)) ? x11 : (setX11(Math.floor(Math.random() * (9 - 1 + 1)) + 1)) }</Text>
            </TouchableOpacity>
          </View>
      </View>

      
      </View>
       
       {/*barra de progresso*/}
     <Text style={{fontSize:15, fontWeight:'bold', textAlign:'center', marginTop:10}}>Faltam {segundos} segundos</Text>
      <ProgressBar progress={numero} color={'black'} style={styles.progress}/>

      <Modal animationType='fade' visible={chamaModalinicio}>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
           <TouchableOpacity style={{borderWidth:1, backgroundColor:'red', alignItems:'center',width:120,height:120,borderRadius:60,justifyContent:'center'}}
            onPress={() => start()}
           >
             <Text style={{fontSize:28, fontWeight:'bold', color:'#fff'}}>Iniciar</Text>
           </TouchableOpacity>
        </View>
      </Modal>

     
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#85aab0',
     
  },
  viewPrincipal:{
    flex:1,
    backgroundColor:'#85aab0',
    justifyContent:'center',
    marginBottom:'10%'
  },
  viewTitle:{
    marginTop:'2%',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row'
  },
  cabecalho:{
    fontSize:25,
    fontWeight:'bold',
    marginLeft:'10%',
    color:'#fff'
   
  },
  viewBtn:{ 
    marginLeft:'4%',
    marginTop:30,
    
  },
  btnNumero:{
    backgroundColor:'#3ec9a7',
    width: 70,
    height: 100,
    borderRadius:10,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center'
  },
  btnNumero1:{
    
    backgroundColor:'#5b88a5',
    width: 70,
    height: 100,
    borderRadius:10,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center'
  },
  btnNumero2:{
    backgroundColor:'#f23460',
    width: 70,
    height: 100,
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
    marginLeft:5,
   
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
  viewPontos:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:'5%',
    marginRight:'5%'
  },
  viewJogador1:{
    backgroundColor:'#5b88a5',
    height: 120,
    marginLeft:'5%',
    borderRadius:15
  },
  viewJogador2:{
    backgroundColor:'#f23460',
    height: 120,
    marginRight:'5%',
    borderRadius:15
  },
  progress:{
      height:30,
      borderRadius:10,
      marginTop:1,
      marginLeft:'5%',
      marginRight:'5%',
      backgroundColor:'#138872',
      marginBottom:'3%'
  },

});
