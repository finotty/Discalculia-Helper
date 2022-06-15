import React from 'react';
import { View,
   Text,
   StyleSheet,
  Image,
 TouchableOpacity } from 'react-native';

 import * as Animatable from 'react-native-animatable';

 import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();
 return (
   <View style={{flex:1}}>
      <Image
       source={require('../../assets/entrar/inicio.jpg')}
       style={{width:'100%', height:'100%'}}
      />
        <View style={styles.container}>
             
            

              <Animatable.View delay={500} animation="fadeInUp" style={styles.containerForm}>
                <View style={{alignItems:'center', marginTop:10}}>
                  <Text style={styles.title}>GOSTARIA DE SABER UM</Text>
                  <Text style={styles.title}>POUCO MAIS SOBRE A</Text>
                  <Text style={styles.titlem}>DISCALCULIA?</Text>
                </View>
                <Text style={styles.txt}>Faça loguin para começar</Text>

                <TouchableOpacity 
                onPress={() => navigation.navigate('SignIn')}
                style={styles.button}>
                  <Text style={styles.buttonTxt}>Acessar</Text>
                </TouchableOpacity>
              </Animatable.View>
        </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   marginTop:'-65%'
  },

  containerLogo:{
    flex:2,
    backgroundColor: '#04abd8',
    justifyContent:'center',
    alignItems:'center'
  },
  containerForm:{
    flex:1,
    backgroundColor: '#fff',
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
    paddingStart:'5%',
    paddingEnd:'5%'
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    //marginTop:28,
    //marginBottom:12,
  },
  titlem:{
    fontSize:28,
    fontWeight:'bold',
  },
  txt:{
    color:'#a1a1a1',
    marginTop:20,
    alignSelf:'center'
  },
  button:{
    position:'absolute',
    backgroundColor:'#04abd8',
    borderRadius:50,
    paddingVertical: 8,
    width:'60%',
    alignSelf:'center',
    bottom:'15%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonTxt:{
    fontSize:18,
    color:'#fff',
    fontWeight:'bold'
  }

})






