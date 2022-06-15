import React,{useContext,useEffect,useState} from 'react';
import { View,Text, TouchableOpacity,FlatList, StyleSheet, Image} from 'react-native';
import { Checkbox } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import {  useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../contexts/auth';
import { db } from '../../../BancoNoSql/conexaoFirebase';
import { ref, set, onValue } from 'firebase/database';



export default function AvaliarGrupo({route}) {

    const [selecionado, setSelecionado] = useState(false);
    const [modAlunos, setModAlunos] = useState(false);
    const [checked1, setChecked1] = useState(false);

    const navigation = useNavigation();
    const { user , avaliartruefalse, AvaliarGp,guardaGrupo} = useContext(AuthContext);

    //const [avaliarGb, setAvaliarGp] = useState(route.params.liberaGP);

    const [userId, setUserId]=useState(user.userId+'/');
    const [contador,setContador] = useState(0);

    const [nomeRecebido, setNomeRecebido]=useState([]);

    var dd =[];
    useEffect(() => {//Executa primeiro, busca no banco e converte o array Json
     if(AvaliarGp == true)  {
              
        const myDoc = ref(db,userId+"nomesDeGrupos/");
         
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
             let g = dd[0].map((item) => {//eliminar um indice externo pra facilitar o acesso aos dados
               return item;
             })
              let cont = g.length;
              setNomeRecebido(g);
              setContador(cont);
            }else{
                alert("Nenhum grupo cadastrado.\nCrie um grupo e tente novamente.");
                navigation.navigate("PainelControle");
            }
        })

        avaliartruefalse(false);
    }
          
    },[]);

    function modalAlunos(val){
      guardaGrupo(val);
      navigation.navigate("EscolherAluno");
    }

 return (
     <View style={{flex:1}}> 
         <Image
          source={require('../../../assets/avaliar/backGroundAV.jpg')}
          style={{width:'100%', height:'100%'}}
         />

         
 

   <View style={styles.container}>
        
         <TouchableOpacity style={{marginTop:'-40%',marginBottom:'30%', marginLeft:10, backgroundColor:'#04abd8', borderRadius:30, height:60, width:60, alignItems:'center',justifyContent:'center',borderWidth:1}}
          onPress={() => navigation.navigate("PainelControle")}
         >
              <Text style={{fontSize:17, fontWeight:'bold', color:'#fff'}}>Voltar</Text>
         </TouchableOpacity>
       <Text style={styles.txtEscolha}>Escolha um Grupo para Avaliar</Text>

       <View style={styles.viewFlatList}>
           <FlatList
            data={nomeRecebido}
            renderItem={ ({item}) => 
                        <View style={styles.viewFlat}>
                            
                            <TouchableOpacity style={styles.btnFlat} onPress={() => modalAlunos(item.nomeg)}>
                            
                            <Text style={styles.txtFlat}>{item.nomeg}</Text>
                            </TouchableOpacity>
                        </View>
                        }
            keyExtractor={(item) => item.nomeg}
           />
       </View>
       

   </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:'-130%'
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
        borderRadius:10
    },
    viewBtn:{
        flex:1,
        alignItems:'center'
    },
    btnIniciar:{
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        height:40,
        borderRadius:10
    },
    btnIniciarTxt:{
        fontSize:18,
        fontWeight:'bold',
        color:'#38a69d'
    },
    txtEscolha:{
        textAlign:'center',
        fontSize:16,
        fontWeight:'bold',
        color:'#fff',
        marginBottom:-10
    },
    viewFlat:{
       justifyContent:'center',
       alignItems:'center'
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
    }
})