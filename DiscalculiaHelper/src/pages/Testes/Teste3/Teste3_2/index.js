import React,{useState, useEffect} from 'react';
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';


export default function Teste3_2({route}) {

    const [numero, setNumero] = useState(0);
    const navigation = useNavigation();
   
    
    useEffect(() => {
        if(numero <= 1){
         const timer= setInterval( () => {
         setNumero(numero + 0.1);
         //setSegundos(segundos + 1)
        },50);
        
        
        return () => clearInterval(timer);
        }else{
            setNumero(0);
           // navigation.navigate('Teste3_2');
           navigation.reset({
            index: 0,
            routes: [{ name: 'Teste3_2_2' }],
          });
        }

      
       
    });

    
   return (
     <View style={styles.container}>
        <View style={styles.progressBar}>
           <ProgressBar progress={numero} color={'#fff'} style={styles.progress}/>
           
        </View>

        <View style={styles.principal}>
            <View style={styles.alinhaBalinhas}>
                <Animatable.Text animation="fadeInLeft" style={styles.bolinha1}></Animatable.Text>
                <Animatable.Text animation="fadeInRight" style={styles.bolinha2}></Animatable.Text>
            </View>
            
            <View>
                <Animatable.Text animation="fadeInUp" style={styles.bolinha5}></Animatable.Text>     
            </View>

       </View>
  
     </View>
    );
  }
  
  const styles = StyleSheet.create({
      container:{
          flex: 1,
          backgroundColor:'#04abd8',
          
      },
      principal:{
          flex:1,
        justifyContent:'center'
      },
      bolinha1:{
          backgroundColor:'#fff',
          marginTop:40,
          width:70,
          height:70,
          borderRadius:50,
          marginLeft:'10%',
          
      },
      bolinha2:{
        backgroundColor:'#fff',
        marginTop:55,
        width:70,
        height:70,
        borderRadius:50,
        
        marginRight:'25%',
        
    },
    bolinha3:{
        backgroundColor:'#fff',
        marginTop:40,
        width:70,
        height:70,
        borderRadius:50,
        marginLeft:'25%'
    },
      bolinha4:{
        backgroundColor:'#fff',
        marginTop:55,
        width:70,
        height:70,
        borderRadius:50,
        marginLeft:'10%',
        marginRight:'10%'
    }, 
     bolinha5:{
        backgroundColor:'#fff',
        marginTop:40,
        width:70,
        height:70,
        borderRadius:50,
        marginLeft:'50%',
        
    },
    alinhaBalinhas:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    progress:{
        height:30,
        borderRadius:10,
        marginTop:15,
        marginLeft:'3%',
        marginRight:'3%',
        backgroundColor:'#aeced2'
    }
})