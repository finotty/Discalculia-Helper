import React,{useContext,useEffect,useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,TextInput,KeyboardAvoidingView,Image,ScrollView } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { AuthContext } from '../../../contexts/auth';

import { useNavigation } from '@react-navigation/native';


export default function CriarGrupo({route}) {

    const { guardaGrupo } = useContext(AuthContext);

    const navigation = useNavigation();
     
    const [nomeGrupo, setNomeGrupo] = useState('');
    
    let inser = false;

    function NomeGrupo(){//Registra o nome o grupo
       
        setNomeGrupo(nomeGrupo);
        guardaGrupo(nomeGrupo);
        navigation.navigate('InserirAluno',{inserirTrue: inser})
    }
 return (
     
      
   <KeyboardAvoidingView behavior='height' style={{flex:1}}
    keyboardVerticalOffset ={-210}
   >
   <Image 
     source={require('../../../assets/criarGrupo/backGroundCriarGrupo.jpg')}
     style={{width:'100%', height:'100%'}}
    />
   <ScrollView style={styles.container}>
       
        <Animatable.View animation="fadeInRight"  style={styles.viewInput}>
            
            <TextInput
                placeholder='Digite o nome do Grupo'
                style={styles.input}
                onChangeText={(value) => setNomeGrupo(value)}
                
            />

            <TouchableOpacity style={styles.btnAvancar} onPress={() => NomeGrupo()}>
               <Image source={require('../../../assets/criarGrupo/btnAvancarCG.png')}
                style={{width:'100%', height:'100%'}}
               />
            </TouchableOpacity>
        </Animatable.View>
       

       
       
   </ScrollView>
   </KeyboardAvoidingView>
  
  );
}

const styles =StyleSheet.create({
    container:{
     flex:1,
     marginTop:'-120%'
     
    },
    viewTitle:{
        flex:1,
        marginTop:'10%',
        alignItems:'center'
       
    },
    viewInput:{
        flex:2,
        alignItems:'center'
    },
    viewRodape:{
        flex:3,
        backgroundColor:'#fff',
        borderRadius:10,
        margin:'5%',
        
    },
    title:{
        fontSize:28,
        fontWeight:'bold',
        color:'#fff'
    },
    input:{
       
        height:40,
        marginBottom:12,
        fontSize:16,
       // backgroundColor:'#fff',
        width:'75%',
        //borderRadius:10,
        marginTop:15,
        borderBottomWidth:1,
        borderBottomColor:'#fff'
    },
    inputTxt:{
        fontSize:14,
        marginTop:15,
        marginBottom:-10,
        color:'#fff',
        
    },
    btnAvancar:{
      
       width:'100%',
       height:48,
       borderRadius:10,
       alignItems:'center',
       justifyContent:'center',
       marginTop:30
    },
    btnAvancarTxt:{
        fontSize:18,
        fontWeight:'bold',
        color:'#38a69d'
    },
    txtGruposCadastrados:{
        fontSize:16,
        fontWeight:'bold',
        color:'#fff',
        textAlign:'center',
        marginBottom:-5
    },
    cont:{
        flex:1
    }
})