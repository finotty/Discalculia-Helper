import React,{useState,useContext} from 'react';
import { View, Text,StyleSheet, TextInput, TouchableOpacity,KeyboardAvoidingView,Image } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import {createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../../BancoNoSql/conexaoFirebase';
import { Ionicons} from '@expo/vector-icons';
import { AuthContext } from '../../../contexts/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUp() {
  //const [email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ passwordConf, setPasswordConf] = useState('');

  const [verPassword, setVerPassword] = useState(true);
  const [verPassword2, setVerPassword2] = useState(true);

  const navigation = useNavigation();

  const {email,setEmail} = useContext(AuthContext);

  function erro (er){
    if(er == er){
       alert("Esse E-mail ja existe ");
    }
   }

   async function CriarConta(){
     if(password == passwordConf){
       await createUserWithEmailAndPassword(auth, email,password)
       .then(value => {
           alert('cadastrado com sucesso');
          // console.log("uid: "+ value.user.uid);
          navigation.navigate('SignIn');
       })
       .catch(error => {
           console.log(error);
           erro(error)}
           );
       
     // setEmail('');
     
      setPassword('');
      setPasswordConf('');
   }else{
     alert("As senhas devem ser iguais");
     setPassword('');
     setPasswordConf('');
   }
  }
 return (
   <KeyboardAvoidingView behavior='height' style={{flex:1}} keyboardVerticalOffset={-25}>
     <Image
       source={require('../../../assets/cadastro/backGround.jpg')}
       style={{width:'100%',height:'100%'}}
     />
   <View style={styles.container}>
       <Animatable.View animation="fadeInLeft" delay={500}
        style={styles.containerHeader}
       >
           <Text style={styles.message}>Cadatro</Text>
       </Animatable.View >
       <View style={{width:'100%', height:'100%'}}>
         <Image
          source={require('../../../assets/cadastro/emailEsenhaCad.png')}
          style={{width:'100%', height:'59%'}}
         />
       </View>

       <View style={styles.containerForm}>
           
           <TextInput
            placeholder='Digite seu E-mail'
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={styles.input}
           />
              <View style={{flexDirection:'row',height:'15%', width:'78%',marginLeft:8}}>
                  <TextInput
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    style={styles.input2}
                    secureTextEntry={verPassword}
                    placeholder='Digite sua senha'
                  />

                  <TouchableOpacity style={{alignItems:'center',justifyContent:'center',height:40, width:'15%'}}
                   onPress={() => setVerPassword(!verPassword)}
                  >
                     <Ionicons name="eye" color="black" size={25}/>
                  </TouchableOpacity>
              </View>
           
              <View style={{flexDirection:'row',height:40, width:'78%',marginTop:25, marginBottom:'15%',marginLeft:8}}>
                  <TextInput
                    value={passwordConf}
                    onChangeText={(value) => setPasswordConf(value)}
                    style={styles.input1}
                    secureTextEntry={verPassword2}
                    placeholder='Digite sua senha'
                  />
                   <TouchableOpacity style={{alignItems:'center',justifyContent:'center',height:40, width:'15%',marginTop:22}}
                   onPress={() => setVerPassword2(!verPassword2)}
                  >
                     <Ionicons name="eye" color="black" size={25}/>
                  </TouchableOpacity>
              </View>

           <TouchableOpacity style={styles.button}
            onPress={() => CriarConta()}
           >
            <Image
             source={require('../../../assets/cadastro/botaoCadastrar.png')}
             style={{width:'100%', height:'100%'}}
            />
           </TouchableOpacity>

           <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('SignIn')}>
             <Text style={styles.registerTxt}>Ja possui uma conta? Entrar</Text>
           </TouchableOpacity>
       </View>
   </View>
   </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
  flex:1,
   marginTop:'-147%'

  },
  containerHeader:{
    marginTop:'14%',
    marginBottom:'8%',
    paddingStart:"5%",
  },
  message:{
    fontSize:28,
    fontWeight:'bold',
    color:'#fff'
  },
  containerForm:{
    flex:1,
    paddingStart:'5%',
    paddingEnd:'5%',
    marginTop:'-134%'
  },
  title:{
    fontSize:20,
    marginTop:28,

  },
  input:{
    
    height:40,
    marginBottom:'18%',
    fontSize:16,
    marginLeft:'12%',
    marginTop:-2
  },
  input2:{
    width:'81%' ,
    height:40,
    marginBottom:'13%',
    fontSize:16,
    marginLeft:'12%',
    marginTop:2
  },
  input1:{
    width: '81%',
    height:40,
    marginBottom:'10%',
    fontSize:16,
    marginLeft:'12%',
    marginTop:27
  },
  button:{
    
    width:'95%',
    height: '16%',
    
    paddingVertical: 8,
   
  
  },
  buttonTxt:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
  },
  buttonRegister:{
    marginTop:14,
    alignSelf:'center'
  },
  registerTxt:{
    color:'#fff',
    fontWeight:'bold'
  }
})