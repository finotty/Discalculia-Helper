import React,{useState,useEffect,useContext,useRef} from 'react';
import { View, Text , StyleSheet, TouchableOpacity, Image, Modal} from 'react-native';
import {AuthContext} from '../../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { LogBox } from 'react-native'

/* Jogo da escada
    Parte da Estratégia

   *Um valor aleatorio entre 1 e 10 (inclusive) é usado como dado.

   *são 10 hastes, foi preciso 20 variaveis, 10 para controlar a exibição das hastes desordenadas e 10 para controlar o posicionamento. 
 
   *para desordenar as hastes, toda vez que uma rodada é iniciada, foi utilizado uma função simples que desordena um vetor de 10 posições  que
   inicialmente esta ordenado de 1 a 10. 

   *O vetor desordenado que é gerado entra numa condição comparando o valor estatico de cada haste nas
   variaveis "m1 a m10". Dessa forma (m1 = 1 ) vetorDesordenado[2,1,3,5,4,8,6,7,10,9], a renderização segue a condição "(m1 == vetorDesordena[0])?" 
   se essa condição for verdade a haste "1" é renderizada, se não, a mesma condição é aplicada na segunda posição do vetor "(m1 == vetorDesordena[1])?"
   se for true, a haste "2" é renderizada, dessa forma cada haste será renderizada na ordem correta.
 
   *Ao clicar em uma haste, um valor é atribuido a uma variavel "marcaValor" que representa o "valor" da haste, atendendo, em seguida, a condição "(marcaValor != haste)?",
   quando "marcaValor" recebe o valor da haste essa haste deixa de ser renderizada, para que fique evidente que a haste clicada não é mais uma opção.
 
   *Se o usuario errar o posicionamento ou se tiver escolhido a haste que nao corresponde ao valor do dado a haste clicada volta a ser renderizada.
*/

export default function Desafio5() {
    LogBox.ignoreLogs([
        'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
        'NativeBase: The contrast ratio of',
        "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    ])
    
    const navigation = useNavigation();//responsável pela navegação entre telas
    const [jogador1, setJogador1]= useState(true);
    const [jogador2, setJogador2]= useState(true);

    const animation = useRef(null);//---------------------------------------------------------------------
    const [dado, setDado]= useState(false);//animation,dado e chamaDado auxiliam para execução da animação
    const [chamaDado, setChamaDado]= useState(false);//---------------------------------------------------
    const [numero, setNumero]= useState(0);//controla o tempo da exibição da animação

    const [imgDado, setImgDado]= useState(true);//imagem de em dado que é exibida com o botão"Jodar Dado"
    const [imgDadoResul, setImgDadoResul]= useState(false);//auxiliar de imgDado

    const [chamaBtnDado, setChamaBtnDado]= useState(false);//auxilia na exibição do dado com o numero aleatoio
    const [btnDado, setBtnDado]= useState(true);

    const [modalDado, setModalDado]= useState(true);//exibe um modal transparente, usado para renderizar toda a animação por cima da tela principal, onde estao as hastes

    const [numeroAleatorio, setNumeroAleatorio]= useState(1);//numero do dado 

    const {pontos1,pontos2,setPontos1,setPontos2,setVencedor} = useContext(AuthContext);


    const [marcaValor1, setMarcaValor1]= useState(0);//------------------------------------------------------------
    const [marcaValor2, setMarcaValor2]= useState(0);
    const [marcaValor3, setMarcaValor3]= useState(0);
    const [marcaValor4, setMarcaValor4]= useState(0);
    const [marcaValor5, setMarcaValor5]= useState(0);//variaveis que guardam o valor das hastes que podem escolhida
    const [marcaValor6, setMarcaValor6]= useState(0);
    const [marcaValor7, setMarcaValor7]= useState(0);
    const [marcaValor8, setMarcaValor8]= useState(0);
    const [marcaValor9, setMarcaValor9]= useState(0);
    const [marcaValor10, setMarcaValor10]= useState(0);//----------------------------------------------------------

    const [marca1, setMarca1]= useState(0);//-------------------------------------------------------------------
    const [marca2, setMarca2]= useState(0);
    const [marca3, setMarca3]= useState(0);
    const [marca4, setMarca4]= useState(0);
    const [marca5, setMarca5]= useState(0);//variaveis que guardam o valor das posições que podem ser escolhidas
    const [marca6, setMarca6]= useState(0);
    const [marca7, setMarca7]= useState(0);
    const [marca8, setMarca8]= useState(0);
    const [marca9, setMarca9]= useState(0);
    const [marca10, setMarca10]= useState(0);//-----------------------------------------------------------------

    const [asteCorrent, setAsteCorrent]= useState(0);//Guarda o valor da haste escolhida

    const [vetorGuardaAste, setVetorGuardaAste]= useState([]);//guarda as ja clicadas e posicionadas corretamente
    const [vetorGuardaAsteDuplicados, setVetorGuardaAsteDuplicados]= useState([]);//guarda os valores do dado que se repetem

    const [vetor2, setVetor2]= useState([]);//recebe vetor1 desordenado
    
    let m1 =1,m2=2,m3=3,m4=4,m5=5,m6=6,m7=7,m8=8,m9=9,m10=10; // ajudam com a exibição das hastes iniciais nas posições de acordo com o vetor2

    let vetor1=[1,2,3,4,5,6,7,8,9,10];

    useEffect(() => {
  
        if(vetor2.length == 0){
            desordenaVetor(vetor1); //recebe vetor1, desordena e atribui ao vetor2
        }

        if(chamaDado == true){//quando usuario clica no botão "jogar dado" , variavel "chamaDado" recebe "true" e inicia a renderização da animação
            if(dado ==true){ //entra apenas uma vez para dar inicio a animação
                animation.current.play(49,215);
                setDado(false);
            }
     
           if(numero <= 0.7){//entra 3 vezes para controlar o intervalo em que a animação é exibida e logo em seguida, no "else", chama o dado com o numero aleatorio gerado
            const timer= setInterval( () => {
            setNumero(numero + 0.3);
          },900);
         
          return () => clearInterval(timer);
          }else{
             
              setNumero(0);
              setImgDado(false);
              setChamaDado(false);
              setImgDadoResul(true);  
          }      
        }

       // definir vencedor
        if(vetorGuardaAste.length == 10){
            if(pontos1 > pontos2){
                setVencedor('Jogador 1 Venceu!!');
            }else if (pontos1 < pontos2){
                setVencedor('Jogador 2 Venceu!!');
            }else {
                setVencedor('Empate!');
            }

            navigation.reset({
                index:0,
                routes:[{name: 'Desafio5_1'}]
            })
        }

    },[dado,imgDadoResul,numero,vetorGuardaAste,numeroAleatorio,marcaValor1])

    function getRandomIntInclusive(min, max) {//gera um numero aleatorio 
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function desordenaVetor(vetor){ //desordena vetor
        
        // Loop em todos os elementos
    for (let i = vetor.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
    }
        // Retornando array com aleatoriedade
   
    return setVetor2(vetor);

    }
    function jogarDado(){//gera um novo numero pseudo aleatório

        setChamaDado(true);
        setDado(true);
        setImgDado(false);
        setImgDadoResul(false);
        setBtnDado(false);

       if(vetorGuardaAsteDuplicados.length == 0){
        setNumeroAleatorio(getRandomIntInclusive(1,10))
       }else {//compara numero aleatório atual com numeros que ja foram renderizados 2 vezes
           let compara =getRandomIntInclusive(1,10);
        
          while (vetorGuardaAsteDuplicados.includes(compara) == true) {
              compara = getRandomIntInclusive(1,10)  
          }

          setNumeroAleatorio(compara);
       }
    }
    function escolherNmero(){//verifica se o numero gerado é repetido, inclui no vetor "vetorGuardaAsteDuplicados[]", passa a vez e volta para opção de "jogar dado" novamente

        setModalDado(false);
        setChamaBtnDado(true); 
        setImgDadoResul(false);
        setBtnDado(true);
        setImgDado(true);
        let numRepetido =0;
        
        for(let i =0; i <= vetorGuardaAste.length; i++){
           
          if(numeroAleatorio == vetorGuardaAste[i]){
              numRepetido = vetorGuardaAste[i] ;
              setVetorGuardaAsteDuplicados(vetorGuardaAsteDuplicados.concat(numRepetido));
          } 
        }

        if(numRepetido > 0){
          alert("Que pena, um numero repetido. \nPassou a vez!")
          setModalDado(true);
          setChamaBtnDado(false);
  
          if(jogador1 == true){
              setJogador1(false);
              setJogador2(true);
              }else if (jogador2 == true){
                  setJogador1(true);
                  setJogador2(false)
              }
              
        }
        
    }
    function escolha(aste){//guarda a aste clicada em "asteCorrent"

        setAsteCorrent(aste);

        switch (aste) {
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
  
    }
    function posicionaAste(pos){//verifica se a haste clicada e a posição estão corretos, atribui ponto e passa vez
    
        if((asteCorrent == pos) && (asteCorrent == numeroAleatorio)){
          
            setVetorGuardaAste(vetorGuardaAste.concat(asteCorrent));
            switch (pos) {
                case 1: setMarca1(1);
                    break;
                case 2: setMarca2(2);
                    break;
                case 3: setMarca3(3);
                    break;
                case 4: setMarca4(4);
                    break;
                case 5: setMarca5(5);
                    break;
                case 6: setMarca6(6);
                    break;
                case 7: setMarca7(7);
                    break;
                case 8: setMarca8(8);
                    break;
                case 9: setMarca9(9);
                    break;
                case 10: setMarca10(10);
                    break;
                       }

                setModalDado(true);
                setChamaBtnDado(false);

                if(jogador1 == true){
                    setPontos1(pontos1 + 1);
                    setJogador1(false);
                    setJogador2(true);
                }else if (jogador2 == true){
                    setPontos2(pontos2 + 1);
                    setJogador1(true);
                    setJogador2(false)
                }
            

        }else{

            if(asteCorrent != numeroAleatorio){
             alert("Haste e posição incorreta!  \nPassou a vez e perdeu 1 ponto");
            }else{
                alert("posição incorreta! \nPassou a Vez e perdeu 1 ponto!");
            }
            
            if(jogador1 == true){
                setPontos1(pontos1 - 1);
                setJogador1(false);
                setJogador2(true);
            }else if (jogador2 == true){
                setPontos2(pontos2 - 1);
                setJogador1(true);
                setJogador2(false)
            }
              //condição ternaria para voltar a exibir a haste caso ela for clicada ou posicionada incorretamente
            (asteCorrent == 1)?setMarcaValor1(0):(asteCorrent == 2)?setMarcaValor2(0):(asteCorrent == 3)?setMarcaValor3(0):(asteCorrent == 4)? setMarcaValor4(0):(asteCorrent == 5)?setMarcaValor5(0):
            (asteCorrent == 6)?setMarcaValor6(0):(asteCorrent == 7)?setMarcaValor7(0):(asteCorrent == 8)?setMarcaValor8(0):(asteCorrent == 9)? setMarcaValor9(0):(asteCorrent == 10)?setMarcaValor10(0):null
            
               
            
        }
    }
 
 return (
   <View style={styles.container}>
       <View style={styles.cabecalho}>
           <Text style={{fontSize:28, fontWeight:'bold'}}>Vez do Jogador {(jogador1 == true)?'1':'2'}</Text>

       </View>

            <View style={styles.astes}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5,}}>

                  { (m1 == vetor2[0] && marcaValor1 != 1)?
                    <TouchableOpacity style={styles.aste1}onPress={() => escolha(1)}></TouchableOpacity> :
                    (m1 == vetor2[1] && marcaValor2 != 2)?
                    <TouchableOpacity style={styles.aste2}onPress={() => escolha(2)}></TouchableOpacity> :
                    (m1== vetor2[2] && marcaValor3 != 3)?
                    <TouchableOpacity style={styles.aste3}onPress={() => escolha(3)}></TouchableOpacity> :
                    (m1 == vetor2[3] && marcaValor4 != 4)?
                    <TouchableOpacity style={styles.aste4}onPress={() => escolha(4)}></TouchableOpacity> :
                    (m1 == vetor2[4] && marcaValor5 != 5)?
                    <TouchableOpacity style={styles.aste5}onPress={() => escolha(5)}></TouchableOpacity> :
                    (m1 == vetor2[5] && marcaValor6 != 6)?
                    <TouchableOpacity style={styles.aste6}onPress={() => escolha(6)}></TouchableOpacity> :
                    (m1 == vetor2[6] && marcaValor7 != 7)?
                    <TouchableOpacity style={styles.aste7}onPress={() => escolha(7)}></TouchableOpacity>:
                    (m1 == vetor2[7] && marcaValor8 != 8)?
                    <TouchableOpacity style={styles.aste8}onPress={() => escolha(8)}></TouchableOpacity>:
                    (m1 == vetor2[8] && marcaValor9 != 9)?
                    <TouchableOpacity style={styles.aste9}onPress={() => escolha(9)} ></TouchableOpacity>:
                    (m1 == vetor2[9] && marcaValor10 != 10)?
                    <TouchableOpacity style={styles.aste10}onPress={() => escolha(10)}></TouchableOpacity>:
                    <Text style={{width:20}}></Text>
                    }

                   { (m2 == vetor2[0] && marcaValor1 != 1)?
                    <TouchableOpacity style={styles.aste1}onPress={() => escolha(1)}></TouchableOpacity> :
                    (m2 == vetor2[1] && marcaValor2 != 2)?
                    <TouchableOpacity style={styles.aste2}onPress={() => escolha(2)}></TouchableOpacity> :
                    (m2== vetor2[2] && marcaValor3 != 3)?
                    <TouchableOpacity style={styles.aste3}onPress={() => escolha(3)}></TouchableOpacity> :
                    (m2 == vetor2[3] && marcaValor4 != 4)?
                    <TouchableOpacity style={styles.aste4}onPress={() => escolha(4)}></TouchableOpacity> :
                    (m2 == vetor2[4] && marcaValor5 != 5)?
                    <TouchableOpacity style={styles.aste5}onPress={() => escolha(5)}></TouchableOpacity> :
                    (m2 == vetor2[5] && marcaValor6 != 6)?
                    <TouchableOpacity style={styles.aste6}onPress={() => escolha(6)}></TouchableOpacity> :
                    (m2 == vetor2[6] && marcaValor7 != 7)?
                    <TouchableOpacity style={styles.aste7}onPress={() => escolha(7)}></TouchableOpacity>:
                    (m2 == vetor2[7] && marcaValor8 != 8)?
                    <TouchableOpacity style={styles.aste8}onPress={() => escolha(8)}></TouchableOpacity>:
                    (m2 == vetor2[8] && marcaValor9 != 9)?
                    <TouchableOpacity style={styles.aste9}onPress={() => escolha(9)} ></TouchableOpacity>:
                    (m2 == vetor2[9] && marcaValor10 != 10)?
                    <TouchableOpacity style={styles.aste10}onPress={() => escolha(10)}></TouchableOpacity>:
                    <Text style={{width:20}}></Text>
                    }

                   { (m3 == vetor2[0] && marcaValor1 != 1)?
                    <TouchableOpacity style={styles.aste1}onPress={() => escolha(1)}></TouchableOpacity> :
                    (m3 == vetor2[1] && marcaValor2 != 2)?
                    <TouchableOpacity style={styles.aste2}onPress={() => escolha(2)}></TouchableOpacity> :
                    (m3== vetor2[2] && marcaValor3 != 3)?
                    <TouchableOpacity style={styles.aste3}onPress={() => escolha(3)}></TouchableOpacity> :
                    (m3 == vetor2[3] && marcaValor4 != 4)?
                    <TouchableOpacity style={styles.aste4}onPress={() => escolha(4)}></TouchableOpacity> :
                    (m3 == vetor2[4] && marcaValor5 != 5)?
                    <TouchableOpacity style={styles.aste5}onPress={() => escolha(5)}></TouchableOpacity> :
                    (m3 == vetor2[5] && marcaValor6 != 6)?
                    <TouchableOpacity style={styles.aste6}onPress={() => escolha(6)}></TouchableOpacity> :
                    (m3 == vetor2[6] && marcaValor7 != 7)?
                    <TouchableOpacity style={styles.aste7}onPress={() => escolha(7)}></TouchableOpacity>:
                    (m3 == vetor2[7] && marcaValor8 != 8)?
                    <TouchableOpacity style={styles.aste8}onPress={() => escolha(8)}></TouchableOpacity>:
                    (m3 == vetor2[8] && marcaValor9 != 9)?
                    <TouchableOpacity style={styles.aste9}onPress={() => escolha(9)} ></TouchableOpacity>:
                    (m3 == vetor2[9] && marcaValor10 != 10)?
                    <TouchableOpacity style={styles.aste10}onPress={() => escolha(10)}></TouchableOpacity>:
                    <Text style={{width:20}}></Text>
                    }

                    { (m4 == vetor2[0] && marcaValor1 != 1)?
                    <TouchableOpacity style={styles.aste1}onPress={() => escolha(1)}></TouchableOpacity> :
                    (m4 == vetor2[1] && marcaValor2 != 2)?
                    <TouchableOpacity style={styles.aste2}onPress={() => escolha(2)}></TouchableOpacity> :
                    (m4== vetor2[2] && marcaValor3 != 3)?
                    <TouchableOpacity style={styles.aste3}onPress={() => escolha(3)}></TouchableOpacity> :
                    (m4 == vetor2[3] && marcaValor4 != 4)?
                    <TouchableOpacity style={styles.aste4}onPress={() => escolha(4)}></TouchableOpacity> :
                    (m4 == vetor2[4] && marcaValor5 != 5)?
                    <TouchableOpacity style={styles.aste5}onPress={() => escolha(5)}></TouchableOpacity> :
                    (m4 == vetor2[5] && marcaValor6 != 6)?
                    <TouchableOpacity style={styles.aste6}onPress={() => escolha(6)}></TouchableOpacity> :
                    (m4 == vetor2[6] && marcaValor7 != 7)?
                    <TouchableOpacity style={styles.aste7}onPress={() => escolha(7)}></TouchableOpacity>:
                    (m4 == vetor2[7] && marcaValor8 != 8)?
                    <TouchableOpacity style={styles.aste8}onPress={() => escolha(8)}></TouchableOpacity>:
                    (m4 == vetor2[8] && marcaValor9 != 9)?
                    <TouchableOpacity style={styles.aste9}onPress={() => escolha(9)} ></TouchableOpacity>:
                    (m4 == vetor2[9] && marcaValor10 != 10)?
                    <TouchableOpacity style={styles.aste10}onPress={() => escolha(10)}></TouchableOpacity>:
                    <Text style={{width:20}}></Text>
                    }

                   { (m5 == vetor2[0] && marcaValor1 != 1)?
                    <TouchableOpacity style={styles.aste1}onPress={() => escolha(1)}></TouchableOpacity> :
                    (m5 == vetor2[1] && marcaValor2 != 2)?
                    <TouchableOpacity style={styles.aste2}onPress={() => escolha(2)}></TouchableOpacity> :
                    (m5== vetor2[2] && marcaValor3 != 3)?
                    <TouchableOpacity style={styles.aste3}onPress={() => escolha(3)}></TouchableOpacity> :
                    (m5 == vetor2[3] && marcaValor4 != 4)?
                    <TouchableOpacity style={styles.aste4}onPress={() => escolha(4)}></TouchableOpacity> :
                    (m5 == vetor2[4] && marcaValor5 != 5)?
                    <TouchableOpacity style={styles.aste5}onPress={() => escolha(5)}></TouchableOpacity> :
                    (m5 == vetor2[5] && marcaValor6 != 6)?
                    <TouchableOpacity style={styles.aste6}onPress={() => escolha(6)}></TouchableOpacity> :
                    (m5 == vetor2[6] && marcaValor7 != 7)?
                    <TouchableOpacity style={styles.aste7}onPress={() => escolha(7)}></TouchableOpacity>:
                    (m5 == vetor2[7] && marcaValor8 != 8)?
                    <TouchableOpacity style={styles.aste8}onPress={() => escolha(8)}></TouchableOpacity>:
                    (m5 == vetor2[8] && marcaValor9 != 9)?
                    <TouchableOpacity style={styles.aste9}onPress={() => escolha(9)} ></TouchableOpacity>:
                    (m5 == vetor2[9] && marcaValor10 != 10)?
                    <TouchableOpacity style={styles.aste10}onPress={() => escolha(10)}></TouchableOpacity>:
                    <Text style={{width:20}}></Text>
                    }

                   { (m6 == vetor2[0] && marcaValor1 != 1)?
                    <TouchableOpacity style={styles.aste1}onPress={() => escolha(1)}></TouchableOpacity> :
                    (m6 == vetor2[1] && marcaValor2 != 2)?
                    <TouchableOpacity style={styles.aste2}onPress={() => escolha(2)}></TouchableOpacity> :
                    (m6== vetor2[2] && marcaValor3 != 3)?
                    <TouchableOpacity style={styles.aste3}onPress={() => escolha(3)}></TouchableOpacity> :
                    (m6 == vetor2[3] && marcaValor4 != 4)?
                    <TouchableOpacity style={styles.aste4}onPress={() => escolha(4)}></TouchableOpacity> :
                    (m6 == vetor2[4] && marcaValor5 != 5)?
                    <TouchableOpacity style={styles.aste5}onPress={() => escolha(5)}></TouchableOpacity> :
                    (m6 == vetor2[5] && marcaValor6 != 6)?
                    <TouchableOpacity style={styles.aste6}onPress={() => escolha(6)}></TouchableOpacity> :
                    (m6 == vetor2[6] && marcaValor7 != 7)?
                    <TouchableOpacity style={styles.aste7}onPress={() => escolha(7)}></TouchableOpacity>:
                    (m6 == vetor2[7] && marcaValor8 != 8)?
                    <TouchableOpacity style={styles.aste8}onPress={() => escolha(8)}></TouchableOpacity>:
                    (m6 == vetor2[8] && marcaValor9 != 9)?
                    <TouchableOpacity style={styles.aste9}onPress={() => escolha(9)} ></TouchableOpacity>:
                    (m6 == vetor2[9] && marcaValor10 != 10)?
                    <TouchableOpacity style={styles.aste10}onPress={() => escolha(10)}></TouchableOpacity>:
                    <Text style={{width:20}}></Text>
                    }

                    { (m7 == vetor2[0] && marcaValor1 != 1)?
                    <TouchableOpacity style={styles.aste1}onPress={() => escolha(1)}></TouchableOpacity> :
                    (m7 == vetor2[1] && marcaValor2 != 2)?
                    <TouchableOpacity style={styles.aste2}onPress={() => escolha(2)}></TouchableOpacity> :
                    (m7== vetor2[2] && marcaValor3 != 3)?
                    <TouchableOpacity style={styles.aste3}onPress={() => escolha(3)}></TouchableOpacity> :
                    (m7 == vetor2[3] && marcaValor4 != 4)?
                    <TouchableOpacity style={styles.aste4}onPress={() => escolha(4)}></TouchableOpacity> :
                    (m7 == vetor2[4] && marcaValor5 != 5)?
                    <TouchableOpacity style={styles.aste5}onPress={() => escolha(5)}></TouchableOpacity> :
                    (m7 == vetor2[5] && marcaValor6 != 6)?
                    <TouchableOpacity style={styles.aste6}onPress={() => escolha(6)}></TouchableOpacity> :
                    (m7 == vetor2[6] && marcaValor7 != 7)?
                    <TouchableOpacity style={styles.aste7}onPress={() => escolha(7)}></TouchableOpacity>:
                    (m7 == vetor2[7] && marcaValor8 != 8)?
                    <TouchableOpacity style={styles.aste8}onPress={() => escolha(8)}></TouchableOpacity>:
                    (m7 == vetor2[8] && marcaValor9 != 9)?
                    <TouchableOpacity style={styles.aste9}onPress={() => escolha(9)} ></TouchableOpacity>:
                    (m7 == vetor2[9] && marcaValor10 != 10)?
                    <TouchableOpacity style={styles.aste10}onPress={() => escolha(10)}></TouchableOpacity>:
                    <Text style={{width:20}}></Text>
                    }

                   { (m8 == vetor2[0] && marcaValor1 != 1)?
                    <TouchableOpacity style={styles.aste1}onPress={() => escolha(1)}></TouchableOpacity> :
                    (m8 == vetor2[1] && marcaValor2 != 2)?
                    <TouchableOpacity style={styles.aste2}onPress={() => escolha(2)}></TouchableOpacity> :
                    (m8== vetor2[2] && marcaValor3 != 3)?
                    <TouchableOpacity style={styles.aste3}onPress={() => escolha(3)}></TouchableOpacity> :
                    (m8 == vetor2[3] && marcaValor4 != 4)?
                    <TouchableOpacity style={styles.aste4}onPress={() => escolha(4)}></TouchableOpacity> :
                    (m8 == vetor2[4] && marcaValor5 != 5)?
                    <TouchableOpacity style={styles.aste5}onPress={() => escolha(5)}></TouchableOpacity> :
                    (m8 == vetor2[5] && marcaValor6 != 6)?
                    <TouchableOpacity style={styles.aste6}onPress={() => escolha(6)}></TouchableOpacity> :
                    (m8 == vetor2[6] && marcaValor7 != 7)?
                    <TouchableOpacity style={styles.aste7}onPress={() => escolha(7)}></TouchableOpacity>:
                    (m8 == vetor2[7] && marcaValor8 != 8)?
                    <TouchableOpacity style={styles.aste8}onPress={() => escolha(8)}></TouchableOpacity>:
                    (m8 == vetor2[8] && marcaValor9 != 9)?
                    <TouchableOpacity style={styles.aste9}onPress={() => escolha(9)} ></TouchableOpacity>:
                    (m8 == vetor2[9] && marcaValor10 != 10)?
                    <TouchableOpacity style={styles.aste10}onPress={() => escolha(10)}></TouchableOpacity>:
                    <Text style={{width:20}}></Text>
                    }

                    { (m9 == vetor2[0] && marcaValor1 != 1)?
                    <TouchableOpacity style={styles.aste1}onPress={() => escolha(1)}></TouchableOpacity> :
                    (m9 == vetor2[1] && marcaValor2 != 2)?
                    <TouchableOpacity style={styles.aste2}onPress={() => escolha(2)}></TouchableOpacity> :
                    (m9== vetor2[2] && marcaValor3 != 3)?
                    <TouchableOpacity style={styles.aste3}onPress={() => escolha(3)}></TouchableOpacity> :
                    (m9 == vetor2[3] && marcaValor4 != 4)?
                    <TouchableOpacity style={styles.aste4}onPress={() => escolha(4)}></TouchableOpacity> :
                    (m9 == vetor2[4] && marcaValor5 != 5)?
                    <TouchableOpacity style={styles.aste5}onPress={() => escolha(5)}></TouchableOpacity> :
                    (m9 == vetor2[5] && marcaValor6 != 6)?
                    <TouchableOpacity style={styles.aste6}onPress={() => escolha(6)}></TouchableOpacity> :
                    (m9 == vetor2[6] && marcaValor7 != 7)?
                    <TouchableOpacity style={styles.aste7}onPress={() => escolha(7)}></TouchableOpacity>:
                    (m9 == vetor2[7] && marcaValor8 != 8)?
                    <TouchableOpacity style={styles.aste8}onPress={() => escolha(8)}></TouchableOpacity>:
                    (m9 == vetor2[8] && marcaValor9 != 9)?
                    <TouchableOpacity style={styles.aste9}onPress={() => escolha(9)} ></TouchableOpacity>:
                    (m9 == vetor2[9] && marcaValor10 != 10)?
                    <TouchableOpacity style={styles.aste10}onPress={() => escolha(10)}></TouchableOpacity>:
                    <Text style={{width:20}}></Text>
                    }

                    { (m10 == vetor2[0] && marcaValor1 != 1)?
                    <TouchableOpacity style={styles.aste1}onPress={() => escolha(1)}></TouchableOpacity> :
                    (m10 == vetor2[1] && marcaValor2 != 2)?
                    <TouchableOpacity style={styles.aste2}onPress={() => escolha(2)}></TouchableOpacity> :
                    (m10== vetor2[2] && marcaValor3 != 3)?
                    <TouchableOpacity style={styles.aste3}onPress={() => escolha(3)}></TouchableOpacity> :
                    (m10 == vetor2[3] && marcaValor4 != 4)?
                    <TouchableOpacity style={styles.aste4}onPress={() => escolha(4)}></TouchableOpacity> :
                    (m10 == vetor2[4] && marcaValor5 != 5)?
                    <TouchableOpacity style={styles.aste5}onPress={() => escolha(5)}></TouchableOpacity> :
                    (m10 == vetor2[5] && marcaValor6 != 6)?
                    <TouchableOpacity style={styles.aste6}onPress={() => escolha(6)}></TouchableOpacity> :
                    (m10 == vetor2[6] && marcaValor7 != 7)?
                    <TouchableOpacity style={styles.aste7}onPress={() => escolha(7)}></TouchableOpacity>:
                    (m10 == vetor2[7] && marcaValor8 != 8)?
                    <TouchableOpacity style={styles.aste8}onPress={() => escolha(8)}></TouchableOpacity>:
                    (m10 == vetor2[8] && marcaValor9 != 9)?
                    <TouchableOpacity style={styles.aste9}onPress={() => escolha(9)} ></TouchableOpacity>:
                    (m10 == vetor2[9] && marcaValor10 != 10)?
                    <TouchableOpacity style={styles.aste10}onPress={() => escolha(10)}></TouchableOpacity>:
                    <Text style={{width:20}}></Text>
                    }
         
              </View>
              
             
            </View>

            <View style={styles.astes2}>

              <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                  {
                     (marcaValor1 == 1 && marca1 == 1)?
                  <View style={styles.aste1}></View> :

                    <TouchableOpacity style={styles.pontilhado} onPress={() => posicionaAste(1)}></TouchableOpacity>
                     
                  }
                    {
                        (marcaValor2 == 2 && marca2 == 2)?
                        <View style={styles.aste2}></View>:
                        <TouchableOpacity style={styles.pontilhado} onPress={() => posicionaAste(2)} ></TouchableOpacity>
                    }
                        {
                            (marcaValor3 == 3 && marca3 == 3)?
                        <View style={styles.aste3}></View> :
                        <TouchableOpacity style={styles.pontilhado} onPress={() => posicionaAste(3)}></TouchableOpacity>
                        }

                            {
                                (marcaValor4 == 4 && marca4 == 4)?
                                <View style={styles.aste4}></View> :
                                <TouchableOpacity style={styles.pontilhado} onPress={() => posicionaAste(4)}></TouchableOpacity>
                            }

                           {
                               (marcaValor5 == 5 && marca5 == 5)?
                               <View style={styles.aste5}></View> :
                               <TouchableOpacity style={styles.pontilhado} onPress={() => posicionaAste(5)}></TouchableOpacity>
                           }

                   {
                       (marcaValor6 == 6 && marca6 == 6)?
                       <View style={styles.aste6}></View> :
                       <TouchableOpacity style={styles.pontilhado} onPress={() => posicionaAste(6)}></TouchableOpacity>
                   }

                      {
                          (marcaValor7 == 7 && marca7 == 7)?
                          <View style={styles.aste7}></View> :
                          <TouchableOpacity style={styles.pontilhado} onPress={() => posicionaAste(7)}></TouchableOpacity>
                      }

                           {
                               (marcaValor8 == 8 && marca8 == 8)?
                               <View style={styles.aste8}></View> :
                               <TouchableOpacity style={styles.pontilhado} onPress={() => posicionaAste(8)}></TouchableOpacity>
                           }

                              {
                               (marcaValor9 == 9 && marca9 == 9)?
                                <View style={styles.aste9}></View> :
                                <TouchableOpacity style={styles.pontilhado} onPress={() => posicionaAste(9)}></TouchableOpacity>
                              }

                                  { 
                                   (marcaValor10 == 10 && marca10 == 10)?
                                   <View style={styles.aste10}></View> :
                                   <TouchableOpacity style={styles.pontilhado} onPress={() => posicionaAste(10)}></TouchableOpacity>
                                  }
              </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={{marginLeft:5,}}>1</Text>
                           
                            <Text style={{marginLeft:-5, paddingRight:2,}}>10</Text>
                        </View>
               
            </View>

                    <View style={styles.rodape}>
                       <View style={{width:70, height:70, borderRadius:10, backgroundColor:'blue', marginLeft:'3%'}}>
                        <Text style={{textAlign:'center', color:'#fff', fontWeight:'bold',marginTop:5}}>Jogador 1</Text>
                        <Text style={{textAlign:'center',textAlignVertical:'center', fontSize:35,fontWeight:'bold',color:'#fff', marginTop:-5}}>{pontos1}</Text> 
                       </View>

                      { chamaBtnDado == true?
                       <Text style={{width:70, height:70, borderRadius:10, textAlign:'center', backgroundColor:'red',textAlignVertical:'center', fontSize:45,fontWeight:'bold',color:'#fff'}}>{numeroAleatorio}</Text>
                       : null  
                      }

                      <View style={{width:70, height:70, borderRadius:10, backgroundColor:'black', marginRight:'2%'}}>
                       <Text style={{textAlign:'center', color:'#fff', fontWeight:'bold',marginTop:5}}>Jogador 2</Text>
                       <Text style={{textAlign:'center',textAlignVertical:'center', fontSize:35,fontWeight:'bold',color:'#fff',marginTop:-5}}>{pontos2}</Text>
                      </View>

                    </View>

                    {/*Modal que mostra os dados*/}

                  <Modal transparent={true} visible={modalDado}>
                      <View style={{ width:'90%', height:'69%',marginLeft:'5%', marginTop:'25%',borderRadius:10}}>
                        <View style={{flex:3, alignItems:'center'}}>
                        {
                            imgDado == false && imgDadoResul == false ?
                            <LottieView
                            source={require('../../../assets/escadas/2dados.json')}
                            autoPlay={false}
                            loop={false}
                            style={{width:350, height:350}}
                            resizeMode="cover"
                            ref={animation}
                            />
                              : imgDado == true && imgDadoResul == false ?
                               <Image
                                source={require('../../../assets/escadas/dado.png')}
                                style={{width:200, height:200,marginTop:'20%'}}
                               /> 
                               :

                               <View style={{width:200, height:200, borderRadius:15, backgroundColor:'red',marginTop:'20%', alignItems:'center',justifyContent:'center'}}>
                                   <Text style={{fontSize:150, fontWeight:'bold', color:'#fff'}}>{numeroAleatorio}</Text>
                               </View>
                           }
                        </View>


                       <View style={{flex:1, alignItems:'center'}}>
                           { 
                             btnDado == true?
                           <TouchableOpacity  style={{width:100, height:70, borderRadius:10, backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}
                             onPress={() => jogarDado()}
                            >
                                <Text>Jogar dado!</Text>
                            </TouchableOpacity>
                              :
                            <TouchableOpacity  style={{width:130, height:70, borderRadius:10, backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}
                             onPress={() => escolherNmero()}
                            >
                                <Text>Escolher Barra</Text>
                            </TouchableOpacity>}
                            
                        </View>
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
    cabecalho:{
      height:'7%' ,
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
       paddingRight:10
    },
    rodape:{
      
       height: '10%',
       alignItems:'center',
       marginTop:5,
       marginBottom:10,
       flexDirection:'row',
       justifyContent:'space-between'
       
    } , astes2:{
        flex: 1,
        borderWidth:1,
        margin: "2%",
        justifyContent:'flex-end',
        paddingLeft:10,
        paddingRight:10
     },
     aste1:{
        width:20,
        height:30, 
        backgroundColor:'black',
        marginTop:'55.4%'
     },
     aste2:{
        width:20,
        height:50, 
        backgroundColor:'#ff8830',
        marginTop:'49.2%'
     },
     aste3:{
        width:20,
        height:70, 
        backgroundColor:'#9e0c39',
        marginTop:'42.9%'
     },
     aste4:{
        width:20,
        height:90, 
        backgroundColor:'#83a300',
        marginTop:'36.8%'
     },
     aste5:{
        width:20,
        height:110, 
        backgroundColor:'#483078',
        marginTop:'30.8%'
     },
     aste6:{
        width:20,
        height:130, 
        backgroundColor:'#e6ae00',
        marginTop:'24.5%'
     },
     aste7:{
        width:20,
        height:150, 
        backgroundColor:'#0ccaba',
        marginTop:'18.2%'
     },
     aste8:{
        width:20,
        height:170, 
        backgroundColor:'#4e5c69',
        marginTop:'12.2%'
     },
     aste9:{
        width:20,
        height:190, 
        backgroundColor:'#9e3f00',
        marginTop:'6%'
     },
     aste10:{
        width:20,
        height:210, 
        backgroundColor:'#204b5e',
        marginTop:'-0.2%'
     },
     pontilhado:{
        width:20,
        height:4, 
        backgroundColor:'black',
        marginTop:'63.4%'
     }

  
  });
  