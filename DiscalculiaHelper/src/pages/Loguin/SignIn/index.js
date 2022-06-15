import React,{useState, useContext,useEffect} from 'react';
import { View, Text,StyleSheet, TextInput, TouchableOpacity,Image,KeyboardAvoidingView } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../../BancoNoSql/conexaoFirebase';

import { AuthContext } from '../../../contexts/auth';
import { Ionicons} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignIn() {
 
  //variaveis que recebem email e senha para fazer loguin no firebase
  //const [email, setEmail] = useState('');

  const [isChecked, setChecked] = useState(false);
  const [emailResgatado, setResgatado] = useState(true);

  const [password, setPassword] = useState('');
  const [verPassword, setVerPassword] = useState(true);

  const {login, user,email,setEmail} = useContext(AuthContext);

  const navigation = useNavigation();

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('email/', value)
    } catch (e) {
       console.log("erro ao recuperar email")
    }
  }

  
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('email/')
    if(value !== null && emailResgatado == true) {
      setEmail(value);
      //setChecked(true);
      setResgatado(false);
      console.log("deu certo! :"+email);
    }
  } catch(e) {
    console.log("erro ao ler email");
  }
}


  function logIN(){//Faz conexao com o banco, verifica se o email esta cadastrado e faz login
   login(email,password);
   setPassword('');
    if(isChecked == true){
      storeData(email);
    }
   
}

function telaCadastro(){
  navigation.navigate('SignUp');
  setEmail('');
  storeData('');
}

useEffect(() => {
  getData();
})
 return (
   <KeyboardAvoidingView behavior='height' style={styles.container} keyboardVerticalOffset={-100}>
   
     <Image
      source={require('../../../assets/entrar/background.jpg')}
      style={{width:'100%',height:'100%',zIndex:0}}
     />
     <View style={{ marginTop:'-5%'}}> 
            <Animatable.View animation="fadeInLeft" delay={500}
              style={styles.containerHeader}
            >
              
                
            </Animatable.View >
     
       <Animatable.View animation="fadeInUp" style={styles.containerForm}>
           <View style={{width:'95%',marginLeft:10, marginTop:'20%'}}>
             <Image source={require('../../../assets/entrar/emailEsenhaLog.png')}
              style={{width:'100%', height:'76%'}}/>

            </View>
            
             <View style={{marginTop:'-74%',marginLeft:'13%'}}>
                <TextInput
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  placeholder='Digite seu E-mail'
                  style={styles.input}
                />
                <View style={{flexDirection:'row'}}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.checkboxTxt}>Guardar e-mail?</Text>
                </View>
                <View style={{flexDirection:'row',height:'15%', width:'82%'}}>
                  <TextInput
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                    style={styles.input}
                    secureTextEntry={verPassword}
                    placeholder='Digite sua senha'
                  />
                  <TouchableOpacity style={{alignItems:'center',justifyContent:'center',height:40, width:'15%'}}
                   onPress={() => setVerPassword(!verPassword)}
                  >
                     <Ionicons name="eye" color="black" size={25}/>
                  </TouchableOpacity>
                </View>
           </View>
           
                  <View style={{marginTop:'-10%',width:'100%',height:'20%'}}>
                    <TouchableOpacity style={styles.button} onPress={() => logIN()}>
                      <Image source={require('../../../assets/entrar/entrar.png')}
                        style={{ width:'100%', height:'100%'}}/>
                    </TouchableOpacity>
                  </View>

              
                 
                  
           

           <TouchableOpacity style={styles.buttonRegister} onPress={() => telaCadastro()}>
             <Text style={styles.registerTxt}>Não possui uma conta? Cadastre-se</Text>
           </TouchableOpacity>
       </Animatable.View>
       
       </View>
   </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
  flex: 1,
  
  },
  containerHeader:{
    marginTop:'-135%',
    //marginBottom:'1%',
    paddingStart:"5%",
  },
  message:{
    fontSize:28,
    fontWeight:'bold',
    color:'#fff'
  },
  containerForm:{
    flex:1,
  
  
  },
  title:{
    fontSize:20,
    marginTop:28,

  },
  input:{
    width: '85%',
    height:40,
    marginBottom:'21.5%',
    fontSize:16,
    
    
  },
  button:{
   
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
  },
  imagem:{
    width:50,
    height:50
  },
  imagem2:{
    width:38,
    height:38,
    marginLeft: 7,
    marginTop:4
  },
  googleBtn:{
   flexDirection:'row',
   borderWidth:1,
   marginTop:15,
   borderRadius:5,
   width:'70%',
   alignSelf:'center'

  },
  googleBtnTxt:{
    alignSelf:'center',
    fontSize:16
  },
  facebookBtn:{
    flexDirection:'row',
    borderWidth:1,
    marginTop:15,
    borderRadius:5,
    width:'70%',
    alignSelf:'center',
    height:50
  },
  facebookBtnTxt:{
    alignSelf:'center',
    fontSize:16,
    marginLeft: 5
  },
  checkbox: {
    //margin: 8,
    marginTop:'-23%',
    marginBottom:'17.7%',
    backgroundColor:'#fff',
    borderRadius:15
  },
  checkboxTxt:{
    marginTop:'-23%',
    marginBottom:'17.7%',
    marginLeft:5,
    color: '#fff'
  }

})