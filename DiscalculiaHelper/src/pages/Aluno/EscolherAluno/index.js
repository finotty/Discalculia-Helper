import React,{useContext,useEffect,useState} from 'react';
import { View,Text, TouchableOpacity,FlatList, StyleSheet,Modal, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../../contexts/auth';
import { db } from '../../../BancoNoSql/conexaoFirebase';
import { ref, set, onValue } from 'firebase/database';
let inser = true;




export default function EscolherAluno({route}) {

    const { user, guardaVariaveisCorrent,nomeGBavaliar, aplicaTesteFalta, visivelCorrent,contTeste,guardaGrupo } = useContext(AuthContext);

    const [userId, setUserId]=useState(user.userId+'/');
    const [nomeGrupo, setNomeGrupo] = useState(nomeGBavaliar+'/');
    const [nomeRecebido, setNomeRecebido]=useState([]);
    const [visivel, setVisivel] = useState(false);

    const navigation = useNavigation();

    const [aNome, setANome] = useState('');
    var dd =[];

    useEffect(() => {
      
      if(visivelCorrent == true){
          setVisivel(true);
          aplicaTesteFalta(false);
      }else{
        FlatRefresh();
      }
    },[])

    const slider = [//Lista com os dados do tutorial do primeiro teste
        {
          key:'1',
          title:'',
          text:'',
          image: <Image
          source={require('../../../assets/tuto1_1.png')}
          style={{
              resizeMode:'center',
              height:'75%',
              width:'85%',
              borderWidth:1,
              borderColor:'#fff',
              marginTop:-25
          }}
         /> 
        },
        {
            key:'2',
            title:'Exemplo de exercício',
            text:'Basta pressionar o número que você acha mais próximo de 10',
            image:   <Image
            source={require('../../../assets/tuto1_2.png')}
            style={{
                resizeMode:'center',
                height:'70%',
                width:'80%',
                borderWidth:1,
                borderColor:'#fff',
                marginTop:-25
            }}
           />  
          },
          {
            key:'3',
            title1:'Entendido? Vamos começar!',
            text2:'Basta pressionar o número que corresponde a quantidade de bolinhas da tela anterior',
            butto: <View style={{flex:1,justifyContent:'center', marginBottom:'20%'}}>
                <TouchableOpacity onPress={() => chamaTeste2()} style={{borderRadius:150,backgroundColor:'#fff',width:250,height:250, justifyContent:'center'}}>
                <Text style={{fontSize:50,fontWeight:'bold',textAlign:'center',color:'#04abd8'}}>Iniciar</Text>
            </TouchableOpacity>
            
            </View>
            
          }
    ]

    function chamaModal(alunoRef,avaliado){
        if(avaliado == false){
        setVisivel(true);
        guardaVariaveisCorrent(alunoRef, nomeGrupo);
        contTeste('teste1/');
        }
        else {
            alert("Este aluno ja foi avaliado!");
        }

    }

    function chamaTeste2(){
        setVisivel(false)
        navigation.navigate('Teste1_1')
    }

    function FlatRefresh(){ //atualiza o array do flatlist "alunos"
         const myDoc = ref(db,userId + nomeGrupo );
          console.log("grupo: "+nomeGrupo);
          console.log("nomeGbAvaliar: "+nomeGBavaliar);
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
               
             
             
             
         })
    }

    function renderSliders({item}){
        return(
     <View style={{flex:1,alignItems:'center'}}>
        <Text style={{fontSize:28, color:'#fff', textAlign:'center',marginTop:15, fontWeight:'bold'}}>{item.title}</Text>
        <Text style={{fontSize:26, color:'#fff', textAlign:'center',marginTop:15, fontWeight:'bold'}}>{item.title1}</Text>

       {item.image}
      
       {item.butto}
       
       <Text style={{fontSize:20, color:'#fff', textAlign:'center', marginTop:15}}>{item.text}</Text>
       
     </View>
        )
    }

    function resetVariavel(){
        let g ='';
        guardaGrupo(g);
        console.log('passou aqui'+g);
        navigation.reset({
            index:0,
            routes:[{name:"PainelControle"}],
        });
    }
 return (
   <View style={{flex:1}}>
       <Image
        source={require('../../../assets/avaliar/backAplicarTeste.jpg')}
        style={{width:'100%', height:'100%'}}
       />
   <View style={styles.container}>

       <Text style={styles.txtEscolha}>Escolha um aluno para avaliar </Text>

       <Animatable.View animation="zoomIn" style={styles.viewFlatList}>
           <FlatList
           data={nomeRecebido}
           renderItem={ ({item}) => 
           <View style={styles.viewFlat}>
               
               <TouchableOpacity style={(item.avaliado == true)? styles.btnFlatAvaliado : styles.btnFlat} onPress={() => chamaModal(item.alunoReferencia,item.avaliado)}>
               
               <Text style={styles.txtFlat}>{item.nome}</Text>
               </TouchableOpacity>
           </View>
           }
          keyExtractor={(item) => item.nome}
           
           />
       </Animatable.View>

      <Animatable.View animation="zoomIn" style={styles.viewBtn}>
           <TouchableOpacity style={styles.btnIniciar} onPress={() => navigation.navigate("InserirAluno", {inserirTrue : inser})}>
             <Image
              source={require('../../../assets/avaliar/EditarGrupo.png')}
              style={{width:'100%', height:'100%'}}
             />
           </TouchableOpacity>
       </Animatable.View>

       <Animatable.View animation="zoomIn" style={styles.viewBtn2}>
           <TouchableOpacity style={styles.btnIniciar} onPress={() => resetVariavel()}>
             <Image
              source={require('../../../assets/avaliar/btnInicioAV.png')}
              style={{width:'100%', height:'100%'}}
             />
           </TouchableOpacity>
        </Animatable.View> 

       {/*Modal que exibe um tutorial simples do teste a seguir*/}
       <Modal animationType='slide' visible={visivel}>
           <View style={{flex:1}}>
             
           <View style={styles.container1}>
              <AppIntroSlider
               renderItem={renderSliders}
               data={slider}
               activeDotStyle={{
                   backgroundColor:'#fff',
                   width:30
               }}
               renderNextButton={() => {}}
               renderDoneButton={() => {}}
               
              />

              
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
        marginTop:'-135%'
       },
       container1:{
        flex:1,
       // marginTop:'-170%',
        width: '100%',
        height: '100%',
        backgroundColor:'#04abd8'
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
        marginBottom:"10%"
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
        alignItems:'center',
        width: '85%',
        height: 45,
        marginLeft:'9%'
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
    }
})