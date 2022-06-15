import React,{useState, useEffect,useContext} from 'react';
import { View,Text, TouchableOpacity, StyleSheet,Modal,Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../../../contexts/auth';

export default function Desafio3_1({route}) {
  
  const navigation = useNavigation();

  const [quadrados, setQuadrados ] = useState([]);

  //const [pontos, setPontos ] = useState(0);

  const {pontos,setPontos,atualizar, veto, atualizaFrame,setVeto,rodada, setVetoQuadro,contaBolinhas, setContaBolinhas} = useContext(AuthContext);
  

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

  const [conta1, setConta1] = useState(0);

  useEffect(() => { //monitora a variavel "conta1" até que ela seja igual ao tamanho do vetor "veto[]"
                    
      if(conta1 == veto.length){

        setVetoQuadro(quadrados);
        atualizar();
        navigation.reset({
          index:0,
          routes:[{name: 'Desafio3'}]
        })
    
      }
     

  },[conta1])       //a variavel "conta1" é incrementada sempre que o jogador escolhe um quadrado
                    
    
    function preencher(n){//pega o quadrado, verifica se tem bolinha e atribui ponto
      setConta1(conta1 + 1);
      preencheVetor(n);
      let vv = 0
      for(let i =0; i<= veto.length -1; i++){
          if(n == veto[i]){
            vv = n;
          }
      }
          if(vv == n){
            switch (n) {
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
            setPontos(pontos + 1);           
                }else{
                  alert("voce errou!");   
                }

    }
    
  function preencheVetor(n){//preencher um novo vetor quando o jogador clica em um quadrado
    setQuadrados(quadrados.concat(n));

  }

 return (
   
   <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{alignItems:'center', borderWidth:1, width:100, height:55,marginBottom:'-15%',marginTop:'8%', backgroundColor:'#fff',borderRadius:10,marginLeft:'10%'}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Pontos</Text>
                <Text style={{fontSize:20, fontWeight:'bold'}}>{pontos}</Text>
          </View>

          <View style={{alignItems:'center', borderWidth:1, width:100, height:55,marginBottom:'-15%',marginTop:'8%', backgroundColor:'#fff',borderRadius:10,marginRight:'10%'}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Rodada</Text>
                <Text style={{fontSize:20, fontWeight:'bold'}}>{rodada} de 5</Text>
          </View>
       </View> 
      <View style={styles.viewGrupoQuadrados}>
          
          <View style={styles.viewQuadrado}>
            <TouchableOpacity style={styles.btnQuadrado}
              onPress={() => preencher(1)}
            >
              <Text style={(visivel == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnQuadrado}
              onPress={() => preencher(2)}
            >
              <Text style={(visivel1 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnQuadrado}
              onPress={() => preencher(3)}
            >
              <Text style={(visivel2 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnQuadrado}
              onPress={() => preencher(4)}
            >
              <Text style={(visivel3 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnQuadrado}
              onPress={() => preencher(5)}
            >
              <Text style={(visivel4 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewQuadrado}>
            <TouchableOpacity style={styles.btnQuadrado}
             onPress={() => preencher(6)}
            >
              <Text style={(visivel5 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnQuadrado}
              onPress={() => preencher(7)}
            >
              <Text style={(visivel6 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnQuadrado}
              onPress={() => preencher(8)}
            >
              <Text style={(visivel7 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnQuadrado}
              onPress={() => preencher(9)}
            >
              <Text style={(visivel8 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnQuadrado}
              onPress={() => preencher(10)}
            >
              <Text style={(visivel9 == true)?styles.txtQuadradosVermelhos : styles.txtQuadradosBranco}></Text>
            </TouchableOpacity>
          </View>
      </View>

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