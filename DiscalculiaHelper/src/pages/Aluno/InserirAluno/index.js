import React,{useContext,useState,useEffect} from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, FlatList, Alert,KeyboardAvoidingView,ScrollView,Image } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../../contexts/auth'

import { db } from '../../../BancoNoSql/conexaoFirebase';
import { ref, set, onValue } from 'firebase/database';

export default function InserirAluno({route}) {
    var cont =0;
    let inserir = route.params.inserirTrue;
    const navigation = useNavigation();
    const { user,nomeGBavaliar } = useContext(AuthContext);

    const [userId, setUserId]=useState(user.userId+'/');

    const [nomeGrupo, setNomeGrupo] = useState(nomeGBavaliar+'/');

    const [contador,setContador] = useState(0);
    const [aluno,setAluno] = useState('aluno');

    const [nome,setNome] = useState('');
    const [idade,setIdade] = useState('');

    const [nomeRecebido, setNomeRecebido]=useState([]);
   var dd =[];

   useEffect(() => {
       if(inserir == true){
        FlatRefresh();
         inserir = false;
       }
        
   },[]);

    function FlatRefresh(){ //atualiza o array do flatlist "grupos"
        const myDoc = ref(db,userId + nomeGrupo );
  
        onValue(myDoc, (snapshot) => {
            
            const data = snapshot.val();
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
              setContador(cont);
              //console.log("b: ",b);
            
            
        })
    }

    function setarAlunoEmGrupo(){//Envia as informações do aluno para o firebase
        setContador(contador+1);
        console.log("contador: "+contador);
        cont = contador;
        let alunoVal = (aluno+cont+'/');
        console.log(alunoVal);
        set(ref(db, userId + nomeGrupo + alunoVal ), {
            nome: nome,
            idade: idade,
            alunoReferencia: alunoVal,
            avaliado:false,
            avaliado1:false,
            avaliado2:false

        }).then(() => {
            alert("Aluno registrado!")
            FlatRefresh();
            setNome('');
            setIdade('');
            })
          .catch((error) => {
            alert(error.message)
            alert("falhou");
            })

            
    }

    function setarNomeDeGrupos(){//Referencia do nome do grupo em que o aluno esta sendo inserido
        
        let nomeGp = nomeGBavaliar;
        set(ref(db, userId + "nomesDeGrupos/" + nomeGrupo  ), {
            nomeg: nomeGp,
            

        }).then(() => {
           // alert("Enviou nome do grupo corretamente!")
            navigation.navigate('PainelControle');
            })
          .catch((error) => {
            alert(error.message)
            alert("falhou envio do nome do grupo");
            })
    }

    function deletarAluno(alunoCur){//Deleta um aluno da lista e do firebase
        Alert.alert("Confirmação", "Deseja excluir o aluno "+alunoCur+" ?",[
            {
                text: "Sim",
                onPress: () => console.log("implementar Delete"),
            },
            {
                text: "Não",
                
            }
        ])
    }

 return (

    <KeyboardAvoidingView behavior='height' style={{flex:1}}
     keyboardVerticalOffset={-210}
    >

    <Image
     source={require('../../../assets/criarGrupo2/backGroundCG2.jpg')}
     style={{width:'100%', height:'100%'}}
    />
   <View style={styles.container}>
       

       <View style={styles.viewInput}>
           <TextInput
           placeholder='Digite o nome do Aluno'
           style={styles.input}
           value={nome}
           onChangeText={(value) => setNome(value)}
           />

       </View>
       <View style={styles.viewInput2}>
            <TextInput
                placeholder='Idade'
                style={styles.input2}
                value={idade}
                onChangeText={(value) => setIdade(value)}
                />

            <TouchableOpacity style={styles.btnAdd}
             onPress={() => setarAlunoEmGrupo()}
            >
                <Image source={require('../../../assets/criarGrupo2/btnAdicionarCG2.png')}
                 style={{width:'100%', height:'100%'}}
                 />
            </TouchableOpacity>
       </View>

       <Text style={styles.alunosCad}>Alunos Cadastrados</Text>
        
       < Animatable.View animation="zoomIn" style={styles.viewRodape}>
         <View>{/*é preciso otimizar esse flatlist*/}
             <View style={{flexDirection:'row'}}>
             <Text style={styles.flatStyle }>Nome</Text>
             <Text style={styles.flatStyle1}>Idade</Text>
             </View>
             <FlatList
                style={{height:'90%'}}
                data={nomeRecebido}
                renderItem={ ({item}) => 
                            <View style={styles.viewFlat}>
                                <TouchableOpacity style={styles.btnFlatNome} onPress={() => deletarAluno(item.nome)}>
                                  <Text style={styles.txtFlat}>{item.nome}</Text>
                                </TouchableOpacity>
                                <Text style={styles.txtFlat1}>{item.idade}</Text>
                            </View>
                            }
                keyExtractor={(item) => item.nome}
             />
     
         </View>
        
       </Animatable.View>

       <Animatable.View animation="lightSpeedIn" style={styles.viewBtnFinalizar}>
             <TouchableOpacity style={styles.btnFinalizar} onPress={() => setarNomeDeGrupos()}>
             <Image source={require('../../../assets/criarGrupo2/btnFinalizarCG2.png')}
                 style={{width:'100%', height:'100%'}}
                 />
             </TouchableOpacity>
         </Animatable.View>
        

   </View>
   </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     marginTop:'-120%'
    },
    viewInput:{
        marginTop:'-20%',
        alignItems:'center',
    },
    viewInput2:{
        
        marginLeft:'13%',
        marginTop:10,
        flexDirection:'row'
    },
    input:{
        borderBottomWidth:1,
        borderBottomColor:'#fff',
        width:'75%',
        color:'#fff',
        fontSize:16,
        fontWeight:'bold'
    },
    input2:{
        borderBottomWidth:1,
        borderBottomColor:'#fff',
        width:'20%' ,
        marginBottom:5,
        color:'#fff',
        fontSize:16,
        fontWeight:'bold'
    },
    btnAdd:{
       
        width:'51%',
        height: 41,
    
        marginLeft:50,
        marginTop:10
    },
    btnAddTxt:{
        fontSize:18,
        color:'#38a69d',
        fontWeight:'bold'
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
    viewRodape:{
        flex:2,
        backgroundColor:'#fff',
        borderRadius:10,
        margin:'5%'
    },
    viewBtnFinalizar:{
        marginTop:5,
        marginBottom:'10%',
        alignItems:'center',
        height: 50
    },
    btnFinalizar:{
        width:'75%',
        height:48,
    },
    btnFinalizarTxt:{
        fontSize:18,
        fontWeight:'bold',
        color:'#38a69d'
    },
    alunosCad:{
        textAlign:'center',
        marginTop:'5%',
        marginBottom:-15,
        fontSize:16,
        color:'#fff',
        fontWeight:'bold'
    },
    flatStyle:{
        marginLeft:"3%", 
        fontSize:18, 
        fontWeight:'bold',
        borderBottomWidth:1,
        width: '70%'
    },
    flatStyle1:{
        marginLeft:"3%", 
        fontSize:18, 
        fontWeight:'bold',
        width:"20%",
        borderBottomWidth:1
    },
    viewFlat:{
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    txtFlat:{
        marginLeft:'3%',
        marginTop:5, 
        fontSize: 16
    },
    txtFlat1:{
        marginRight:'14%',
        marginTop:5, 
        fontSize: 17, 
        fontWeight:'bold'
    },
    btnFlatNome:{
        marginLeft:'3%'
    }
})