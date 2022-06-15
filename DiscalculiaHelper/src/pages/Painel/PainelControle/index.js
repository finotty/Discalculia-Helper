import React,{useContext,useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Image } from 'react-native';

import { AuthContext } from '../../../contexts/auth';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function PainelControle({route}) {

    const navigation = useNavigation();

    const { user,avaliartruefalse } = useContext(AuthContext);
    const [liberaGP, setLiberaGP] = useState(true);

    function liberaGrupo(){
        avaliartruefalse(true);
        navigation.navigate('AvaliarGrupo')
    }

 return (
     <View style={{flex:1}}>
         <Image
          source={require('../../../assets/menu/backGroundPainel.jpg')}
          style={{width:'100%', height:'100%'}}
         />
   <View style={styles.container}>

       

       <View style={styles.viewBtns}>
           <Animatable.View animation="fadeInRight" dalay={700} style={styles.viewbt}>
                <TouchableOpacity style={styles.btnsPainel} onPress={() => navigation.navigate('CriarGrupo')}>
                    <Image source={require('../../../assets/menu/btnCriarGrupo.png')}
                     style={{width:'100%', height:'90%'}}
                     />
                </TouchableOpacity>
           </Animatable.View>

           <Animatable.View animation="fadeInLeft" dalay={800} style={styles.viewbt} >
                <TouchableOpacity style={styles.btnsPainel} onPress={() => liberaGrupo()}>
                <Image source={require('../../../assets/menu/btnAvaliar.png')}
                     style={{width:'100%', height:'100%'}}
                     />
                </TouchableOpacity>
           </Animatable.View>

            <Animatable.View animation="fadeInRight" dalay={900} style={styles.viewbt}>
                <TouchableOpacity style={styles.btnsPainel} onPress={() => navigation.navigate('Resultados')}>
                <Image source={require('../../../assets/menu/btnResultado.png')}
                     style={{width:'100%', height:'100%'}}
                     />
                </TouchableOpacity>
           </Animatable.View>

            <Animatable.View animation="fadeInLeft" dalay={1000} style={styles.viewbt}>
                <TouchableOpacity style={styles.btnsPainel} onPress={() => navigation.navigate('Desafios')}>
                <Image source={require('../../../assets/menu/btnDesafio.png')}
                     style={{width:'100%', height:'100%'}}
                     />
                </TouchableOpacity>
           </Animatable.View>
       </View>
       
       

   </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:'-100%'
    },
    viewTitle:{
        flex:1,
        alignItems:'center',
        marginTop:'10%'   
    },
    titleTxt:{
        fontSize:28,
        fontWeight:'bold',
        color:'#fff'
    },
    viewBtns:{
        flex:3,
        alignItems:'center',
  
    },
    viewRodape:{
        flex:2,
        backgroundColor:'#fff',
        borderRadius:10,
        margin:'5%'
        
    },
    btnsPainel:{
     
     width:'70%',
     height:50,
     
     borderRadius:10,
     alignItems:'center',
     justifyContent:'center'
    },
    btnsPainelTxt:{
        fontSize:16,
        fontWeight:'bold',
        color:'#38a69d'
    },
    txtViewRodape:{
        textAlign:'center',
        fontSize:17,
        color:'#fff',
        fontWeight:'bold',
        marginBottom:-10
    },
    viewbt:{
        width:'100%',
        height:50,
        marginTop:15,
        alignItems:'center'
        
    }
})