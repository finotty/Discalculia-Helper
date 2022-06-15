import React,{useContext,useEffect,useState} from 'react';
import { View,Text, TouchableOpacity,FlatList, StyleSheet,Modal, Image, Alert, ScrollView } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../../../contexts/auth';
import { db } from '../../../../BancoNoSql/conexaoFirebase';
import { ref, set, onValue } from 'firebase/database';;

let inser = true;

export default function Resultados_1({route}) {

    const { user, guardaVariaveisCorrent,nomeGBavaliar, aplicaTesteFalta, marcador, marcarAluno,contTeste} = useContext(AuthContext);

    const [userId, setUserId]=useState(user.userId+'/');
    const [nomeGrupo, setNomeGrupo] = useState(nomeGBavaliar+'/');
    const [nomeRecebido, setNomeRecebido]=useState([]);

    const navigation = useNavigation();
    
    //variaveis do modal
    const [modalNome, setModalNome] = useState('');
    const [modalIdade, setModalIdade] = useState('');

    const [modalAlunoRef, setModalAlunoRef] = useState([]);

    const [modalResultado, setModalResultado] = useState(false);

    const [avaliado , setAvaliado ] = useState();
    const [avaliado1 , setAvaliado1 ] = useState(false);
    const [avaliado2 , setAvaliado2 ] = useState(false);

    const [alunoRef , setAlunoRef ] = useState('');


    var dd =[];
    let b =0;
    let falta=0;
    let d =0;
    let test =[];
    let teste1 = 'teste1/';
    let teste2 = 'teste2/';
    let teste3 = 'teste3/';

    useEffect(() => {
      FlatRefresh();
     
    },[])

    function aplicaTeste(alunoReferencia, avaliado){//vai direto de Resultados_1 para o primeiro teste levando o aluno escolhido
        if(avaliado == false){  
            guardaVariaveisCorrent(alunoReferencia, nomeGrupo);
            aplicaTesteFalta(true);
            marcarAluno(true);
            contTeste(teste1);
            navigation.navigate("EscolherAluno")
                }
                else {
                    alert("Este aluno ja foi avaliado!");
                }
    }

    function aplicarTesteNovo(avaliado, avaliado1, avaliado2,alunoReferencia){
        if((avaliado == true)&&(avaliado1 == false)){
           guardaVariaveisCorrent(alunoReferencia, nomeGrupo);
           aplicaTesteFalta(true);
           marcarAluno(true);
           contTeste(teste2);
           navigation.navigate("EscolherAluno")
   
        }else if((avaliado == true)&&(avaliado1 == true)&&(avaliado2 == false)){
           guardaVariaveisCorrent(alunoReferencia, nomeGrupo);
           aplicaTesteFalta(true);
           marcarAluno(true);
           contTeste(teste3);
           navigation.navigate("EscolherAluno")
        }else{
            alert("Numero maximo de testes atingido!");
        }
    }

    function chamaModal(alunoRef,avaliado,nome,idade,avaliado1,avaliado2){
        if(avaliado == true){
          setModalNome(nome);
          setModalIdade(idade);
          setAvaliado(avaliado);
          setAvaliado1(avaliado1);
          setAvaliado2(avaliado2);
          setAlunoRef(alunoRef);

          setModalResultado(true);
          buscarAluno(alunoRef);
        }else if (avaliado == false){
            Alert.alert("Aluno não avaliado!", "Deseja avaliar aluno(a): "+nome+" agora ?",[
                {
                    text: "Sim",
                    onPress: () => aplicaTeste(alunoRef,avaliado),
                },
                {
                    text: "Não",
                    
                }
            ])
        }
        
    }

    function FlatRefresh(){ //atualiza o array do flatlist "alunos"
         const myDoc = ref(db,userId + nomeGrupo );
   
         onValue(myDoc, (snapshot) => {
             
             const data = snapshot.val();
             if(data != null){
             let lt = [];
           
             lt.push(data);
             
              dd = lt.map(function(obj){
               return Object.keys(obj).map(function(key) { //converte em array
     
                 return obj[key];
               })
             })
         
     
               let b = dd[0].map((item) => {
                 return item;
               })
 
               let cont = b.length;
               setNomeRecebido(b);//array do flat list 
            }else{
               alert("Nenhum aluno registrado neste grupo.");
               navigation.navigate("Resultados");
            }
         })
    }

    function buscarAluno(alunoReferencia){
        const myDoc = ref(db,userId + nomeGrupo +alunoReferencia+'/');
         let al = [];
        onValue(myDoc, (snapshot) => {
            
            const data = snapshot.val();
            let lt = [];
          
            lt.push(data);
            
             al = lt.map(function(obj){
              return Object.keys(obj).map(function(key) { //converte em array
    
                return obj[key];
              })
            })
        
    
              let b = al[0].map((item) => {
                return item;
              })
            //  console.log(b);
              let cont = b.length;
              setModalAlunoRef(b);//array do flat list 
              test.push(b);
        })
    }

 return (
     <View style={{flex:1}}>
         <Image
          source={require('../../../../assets/resultados/backResulAluno.jpg')}
          style={{width:'100%', height:'100%'}}
         />
   <View style={styles.container}>
      < Animatable.View animation="fadeInLeft"  style={styles.viewTitle}>
           
           <Text style={styles.title}>{nomeGBavaliar}</Text>
       </Animatable.View>

       <Text style={styles.txtEscolha}>Escolha um aluno para ver o resultado </Text>

       <Animatable.View animation="zoomIn" style={styles.viewFlatList}>
           <FlatList
           data={nomeRecebido}
           renderItem={ ({item}) => 
           <View style={styles.viewFlat}>
               
               <TouchableOpacity style={(item.avaliado == true)? styles.btnFlatAvaliado : styles.btnFlat}
                onPress={() => chamaModal(
                item.alunoReferencia,item.avaliado,item.nome,item.idade,item.avaliado1, item.avaliado2
                )}>
               
               <Text style={styles.txtFlat}>{item.nome}</Text>
               </TouchableOpacity>
           </View>
           }
          keyExtractor={(item) => item.nome}
           
           />
       </Animatable.View>

       {/*<Animatable.View animation="zoomIn" style={styles.viewBtn2}>
           <TouchableOpacity style={styles.btnIniciar} onPress={() => modalGrupo()}>
             <Text style={styles.btnIniciarTxt}>Informações do grupo</Text>
           </TouchableOpacity>
        </Animatable.View> */}

      <Animatable.View animation="zoomIn" style={styles.viewBtn}>
           <TouchableOpacity style={styles.btnIniciar} onPress={() => navigation.navigate("InserirAluno", {inserirTrue : inser})}>
             <Image
              source={require('../../../../assets/avaliar/EditarGrupo.png')}
              style={{width:'100%', height:'100%'}}
             />
           </TouchableOpacity>
       </Animatable.View>

       <Animatable.View animation="zoomIn" style={styles.viewBtn2}>
           <TouchableOpacity style={styles.btnIniciar} onPress={() => navigation.navigate("PainelControle")}>
           <Image
              source={require('../../../../assets/avaliar/btnInicioAV.png')}
              style={{width:'100%', height:'100%'}}
             />
           </TouchableOpacity>
        </Animatable.View> 
   
        <Modal animationType='fadeIn' visible={modalResultado} transparent={true}>
          
            <View style={{backgroundColor:'#04abd8',width:'80%',height:'55%', marginLeft:'10%', marginTop:'42%', borderRadius:10}}> 
                <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                    <View >
                        <Text style={styles.modalTxt}>Aluno(a): {modalNome}</Text>
                        <Text style={styles.modalTxt}>Idade: {modalIdade}</Text>
                    </View>
                    <View style={{width:40,height:40,marginBottom:15}}>
                        <TouchableOpacity style={{alignItems:'center', justifyContent:'center', width:40,height:40,backgroundColor:'red',borderRadius:10, marginTop:-5}} 
                        onPress={() => setModalResultado(false)}
                        >
                            <Text style={{color:'#fff', fontSize:25, fontWeight:'bold'}}>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{alignItems:'center',height:'70%'}}>
                        <FlatList
                        data={modalAlunoRef}
                        renderItem={({item}) => item.numteste != null ?
                        
                            <View style={{flexDirection:'row',borderBottomWidth:1, borderBottomColor:"#fff"}}>
                                <View style={{ marginTop:'10%'}}>
                                
                                
                                    <Text style={{fontSize:20, color:'#fff', fontWeight:'bold', marginBottom:10}}>{item.numteste} :</Text>
                
                                    <Text style={styles.modalresult}> Estimativa          |   {(((item.estimativa)/3)*100).toFixed(0)}%</Text>
                                    <Text style={styles.modalresult}> Lógica                 |   {(((item.logica)/3)*100).toFixed(0)}%</Text>
                                    <Text style={styles.modalresult}> Memória             |   {(((item.memoria)/3)*100).toFixed(0)}%</Text>
                                    <Text style={styles.modalresult}> Visão Espacial   |   {(((item.visaoEspacial)/3)*100).toFixed(0)}%</Text>
                                
                                    <Text style={styles.modalMedia}>Média:  {(((item.estimativa + item.logica + item.memoria + item.visaoEspacial)/ 12)*100).toFixed(0)}%</Text>
                                
                                </View>
                        
                        </View> : <Text style={{marginTop:-50}}></Text>
                        }
                        keyExtractor={(item) => item.nome}
                        showsVerticalScrollIndicator={false}
                        />
                                <View style={{marginBottom:-25, width:'80%',alignItems:'center'}}>
                                    <TouchableOpacity style={{width:'80%', height:40, backgroundColor:"#fff", borderRadius:10, alignItems:'center',justifyContent:'center'}}
                                     onPress={() => aplicarTesteNovo(avaliado,avaliado1,avaliado2,alunoRef)}
                                    >
                                        <Text style={{fontSize:17, fontWeight:'bold',color:'black'}}>Avaliar novamente</Text>
                                    </TouchableOpacity>
                                    </View>
                </View>
  
            </View>
        </Modal>

       


   </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:'-180%'
       },
    viewTitle:{
        flex:1,
        marginTop:'10%',
        alignItems:'center'
       
    },
    title:{
        fontSize:28,
        fontWeight:'bold',
        color:'#fff'
    },
    viewFlatList:{
        flex:4,
        margin:'5%',
        backgroundColor:'#fff',
        borderRadius:10,
        marginBottom:"5%"
    },
    viewBtn:{
        flex:1,
        marginBottom:-25,
        width: '85%',
        height: 45,
        marginLeft:'13%'
    },
    viewBtn2:{
        flex:1,
        marginBottom:-25,
        width: '85%',
        height: 45,
        marginLeft:'13%'
        
    },
    btnIniciar:{
       
        width:'90%',
        height:45,
       
    },
    btnIniciarTxt:{
        fontSize:18,
        fontWeight:'bold',
        color:'#38a69d'
    },
    txtEscolha:{
        textAlign:'center',
        fontSize:14,
        fontWeight:'bold',
        color:'#fff',
        marginBottom:-10
    },
    viewFlat:{
       justifyContent:'center',
       alignItems:'center',
       
    },
    txtFlat:{
        
        fontSize: 16,
        fontWeight:'bold'
    },
    btnFlat:{
        borderWidth:1,
        width: "85%",
        height: 30,
        alignItems:'center',
        justifyContent:'center',
        marginTop:15,
        borderRadius:15
    },
    btnFlatAvaliado:{
        borderWidth:1,
        width: "85%",
        height: 30,
        alignItems:'center',
        justifyContent:'center',
        marginTop:15,
        borderRadius:15,
        backgroundColor: '#04abd8'
    },
    modalresult:{
        fontSize:16, 
        color:'#fff', 
        fontWeight:'bold',
        borderWidth:1, 
        borderColor:'#fff',
        width:'90%',
        marginLeft:'15%'
    },
    modalTxt:{
        fontSize:20, 
        color:'#fff', 
        fontWeight:'bold',
        marginLeft:'5%'
        
    },
    modalMedia:{
        fontSize:20, 
        color:'#fff', 
        fontWeight:'bold',
        marginTop:10
    }
})