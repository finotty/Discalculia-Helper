import React,{useContext,useEffect,useState} from 'react';
import { View,Text, TouchableOpacity,FlatList, StyleSheet,Modal,Image } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../../../contexts/auth';
import { db } from '../../../../BancoNoSql/conexaoFirebase';
import { ref, set, onValue } from 'firebase/database';
import {Picker} from '@react-native-picker/picker';

export default function Resultados() {
    const { user , avaliartruefalse, AvaliarGp,guardaGrupo} = useContext(AuthContext);
    const navigation = useNavigation();

    const [userId, setUserId]=useState(user.userId+'/');
    const [nomeRecebido, setNomeRecebido]=useState([]);

    const [modalResultadoGrupo, setModalResultadoGrupo] = useState(false);

    const [gruposPicker1,setGruposPicker1] = useState('1');
    const [gruposPicker2,setGruposPicker2] = useState('2');

    const [nomeGB,setNomeGB] = useState([]);
    const [nomeGB2,setNomeGB2] = useState([]);

    const [m1,setM1] = useState(0);
    const [m2,setM2] = useState(0);

 
    let tes =[];
    var dd =[];
    

    let s1=0;
    let s2=0;
    let s3=0;
    let media =0;

    let media1 =0;
    let media2 =0;
    let contadorAl =0;
    useEffect(() => {//Executa primeiro, busca no banco e converte o array Json
           if(nomeRecebido.length == 0 ){      
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
                 
                 setNomeRecebido(g);
            }else{
                alert("Nenhum grupo criado\nCrie e Avalie pelo menos um grupo\ndepois retorne em 'Resultados'");
                navigation.navigate("PainelControle");
            }
                 
           })
           
        }
       },[]);

   function modalAlunos(val){
        guardaGrupo(val);
        navigation.navigate("Resultados_1");
   }

   function chamaModalPicker(){
          setModalResultadoGrupo(true);
   }

   function FlatRefresh1(itemValue){ //atualiza o array do flatlist tabela 1
       
        
        if(itemValue != '1'){
            
            setGruposPicker1(itemValue);
            let  myDoc = ref(db,userId + itemValue+'/' );
  
            onValue(myDoc, (snapshot) => {
                
                const data = snapshot.val();
                
                if(data != null){

                let lt = [];
            
                lt.push(data);
                
               let tes = lt.map(function(obj){
                return Object.keys(obj).map(function(key) { //converte em array
        
                    return obj[key];
                })
                })

                let b = tes[0].map((item) => {
                    return item;
                })

                 setNomeGB(b);//array do flat list 
               
                 let c1 =0;
                 let c2 =0;
                 let c3 =0;

                 let soma =0;//soma das medias de cada aluno
                 let contad=0;//quantidade de alunos
                 for(let i =0; i <= b.length -1; i++){
                     if(b[i].avaliado == true)
                      {
                         c1 = ((b[i].teste1.estimativa + b[i].teste1.logica + b[i].teste1.memoria + b[i].teste1.visaoEspacial)/12)*100;
                         contad = contad + 1;
                         if(b[i].avaliado1 == true){
                             c2 = ((b[i].teste2.estimativa + b[i].teste2.logica + b[i].teste2.memoria + b[i].teste2.visaoEspacial)/12)*100;
                             if(b[i].avaliado2 == true){
                                c3 = ((b[i].teste3.estimativa + b[i].teste3.logica + b[i].teste3.memoria + b[i].teste3.visaoEspacial)/12)*100;
                                
                                (c1 >= c2)? ((c1 >= c3)? soma += c1 : soma += c3) : (c2 >= c3)? soma += c2 : soma+= c3 
                           }

                           if(b[i].avaliado2 == false && c2 > c1){
                              soma += c2;
                            }else{
                              soma += c1;
                            }
                        }

                        if(b[i].avaliado1 == false){
                           soma += c1;
                        }
                      }
                 }

                 media1 = (soma/contad);
                 if(media1 > 0){
                    setM1(media1);
                 }else{
                     setM1(0.5);
                 }
                 
                 }else{
                     alert("Este grupo está vazio.");
                     setGruposPicker1('1');
                 } 
               
        })

        
        }else{
            setGruposPicker1('1');
        }
   }

   function FlatRefresh2(itemValue){ //atualiza o array do flatlist 
    if(itemValue != '2'){

      setGruposPicker2(itemValue);
      let  myDoc = ref(db,userId + itemValue+'/' );

      onValue(myDoc, (snapshot) => {
        
        const data = snapshot.val();
        if(data != null){
        let lt = [];
    
        lt.push(data);
        
        let tes = lt.map(function(obj){
        return Object.keys(obj).map(function(key) { //converte em array

            return obj[key];
        })
        })

        let b = tes[0].map((item) => {
            return item;
        })

         setNomeGB2(b);//array do flat list 

         let c1 =0;
         let c2 =0;
         let c3 =0;

         let soma =0;
         let contad=0;
         for(let i =0; i <= b.length -1; i++){
             if(b[i].avaliado == true)
              {
                 c1 = ((b[i].teste1.estimativa + b[i].teste1.logica + b[i].teste1.memoria + b[i].teste1.visaoEspacial)/12)*100;
                 contad = contad + 1;
                 if(b[i].avaliado1 == true){
                     c2 = ((b[i].teste2.estimativa + b[i].teste2.logica + b[i].teste2.memoria + b[i].teste2.visaoEspacial)/12)*100;
                     if(b[i].avaliado2 == true){
                        c3 = ((b[i].teste3.estimativa + b[i].teste3.logica + b[i].teste3.memoria + b[i].teste3.visaoEspacial)/12)*100;
                        
                        (c1 >= c2)? ((c1 >= c3)? soma += c1 : soma += c3) : (c2 >= c3)? soma += c2 : soma+= c3 
                   }

                   if(b[i].avaliado2 == false && c2 > c1){
                      soma += c2;
                    }else{
                      soma += c1;
                    }
                }

                if(b[i].avaliado1 == false){
                   soma += c1;
                }
              }
         }

         media2 = (soma/contad);
         if(media2 > 0){
            setM2(media2);
         }else {
             setM2(0.5);
         }
         
         
        }else{
            alert("Este grupo esta vazio.");
            setGruposPicker2('2');
        } 
    })
    }else{
        setGruposPicker2('2');
    }

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
             //console.log(b);
             //let cont = b.length;
             setModalAlunoRef(b);//array do flat list 
             //test.push(b);
       })
   }

   function ordenaNome(){
     let newList1 = [...nomeGB];
     let newList2 = [...nomeGB2];

     newList1.sort((atual,prox) => {
         if(atual.nome > prox.nome){
             return 1;
         }else {
             if(prox.nome > atual.nome){
                 return -1;
             }else{
                 return 0;
             }
         }
     });

     newList2.sort((atual,prox) => {
        if(atual.nome > prox.nome){
            return 1;
        }else {
            if(prox.nome > atual.nome){
                return -1;
            }else{
                return 0;
            }
        }
    });

     setNomeGB(newList1);
     setNomeGB2(newList2);
   }

   function ordenaMédia(){
    let newList1 = [...nomeGB];
    let newList2 = [...nomeGB2];

    newList1.sort((atual,prox) => {
        let media01 =0;
        let media02 =0;
        let i = 0,i1 =0,i2=0;
        let ii =0,ii1=0,ii2=0;
        
        if(atual.avaliado == true){
           i = ((atual.teste1.estimativa + atual.teste1.logica + atual.teste1.memoria + atual.teste1.visaoEspacial)/12) 
           media01 = i;
        }
            if(atual.avaliado1 == true){
            i1= ((atual.teste2.estimativa + atual.teste2.logica + atual.teste2.memoria + atual.teste2.visaoEspacial)/12)
              (i > i1)? media01 = i : media01 = i1
            }
                if(atual.avaliado1 == true){
                i2= ((atual.teste3.estimativa + atual.teste3.logica + atual.teste3.memoria + atual.teste3.visaoEspacial)/12)
                (i > i1)? (i > i2)? media01 = i : media01 = i2 : (i1 > i2) ? media01 = i1 : media01 = i2    
                }
                  
                    
         if(prox.avaliado == true)  {
            ii = ((prox.teste1.estimativa + prox.teste1.logica + prox.teste1.memoria + prox.teste1.visaoEspacial)/12) 
             media02 = ii;
         }    
            if(prox.avaliado1 == true){
                 ii1= ((prox.teste2.estimativa + prox.teste2.logica + prox.teste2.memoria + prox.teste2.visaoEspacial)/12)
                  (ii > ii1)? media02 = ii : media02 = ii1
            }   

               if(prox.avaliado2 == true){
                   ii2= ((prox.teste3.estimativa + prox.teste3.logica + prox.teste3.memoria + prox.teste3.visaoEspacial)/12)
                  (ii > ii1)? (ii > ii2)? media02 = ii : media02 = ii2 : (ii1 > ii2) ? media02 = ii1 : media02 = ii2

               }
      
        
        if(media01 < media02 ){
            return 1;
        }else {
            if(media02 < media01){
                return -1;
            }else{
                return 0;
            }
        }

        
    });

    newList2.sort((atual,prox) => {
        let media01 =0;
        let media02 =0;
        let i = 0,i1 =0,i2=0;
        let ii =0,ii1=0,ii2=0;
        
        if(atual.avaliado == true){
           i = ((atual.teste1.estimativa + atual.teste1.logica + atual.teste1.memoria + atual.teste1.visaoEspacial)/12) 
           media01 = i;
        }
            if(atual.avaliado1 == true){
            i1= ((atual.teste2.estimativa + atual.teste2.logica + atual.teste2.memoria + atual.teste2.visaoEspacial)/12)
              (i > i1)? media01 = i : media01 = i1
            }
                if(atual.avaliado1 == true){
                i2= ((atual.teste3.estimativa + atual.teste3.logica + atual.teste3.memoria + atual.teste3.visaoEspacial)/12)
                (i > i1)? (i > i2)? media01 = i : media01 = i2 : (i1 > i2) ? media01 = i1 : media01 = i2    
                }
                  
                    
         if(prox.avaliado == true)  {
            ii = ((prox.teste1.estimativa + prox.teste1.logica + prox.teste1.memoria + prox.teste1.visaoEspacial)/12) 
             media02 = ii;
         }    
            if(prox.avaliado1 == true){
                 ii1= ((prox.teste2.estimativa + prox.teste2.logica + prox.teste2.memoria + prox.teste2.visaoEspacial)/12)
                  (ii > ii1)? media02 = ii : media02 = ii1
            }   

               if(prox.avaliado2 == true){
                   ii2= ((prox.teste3.estimativa + prox.teste3.logica + prox.teste3.memoria + prox.teste3.visaoEspacial)/12)
                  (ii > ii1)? (ii > ii2)? media02 = ii : media02 = ii2 : (ii1 > ii2) ? media02 = ii1 : media02 = ii2

               }
      
        
        if(media01 < media02 ){
            return 1;
        }else {
            if(media02 < media01){
                return -1;
            }else{
                return 0;
            }
        }

        
    });

    setNomeGB(newList1); 
    setNomeGB2(newList2);
    

   }

   const dados =[
       {
       id : 1,
      'nome': '',
     'media':'',
       },
       {
     id : 2,
      'nome': '',
     'media':'',
       },
       {
     id : 3,
      'nome': '',
     'media':'',
       },
       {
     id : 4,
      'nome': '',
     'media':'',
       },
       {
     id : 5,
      'nome': '',
     'media':'',
       },
       {
     id : 6,
      'nome': '',
     'media':'',
       },
       {
     id : 7,
      'nome': '',
     'media':'',
       },
       {
     id : 8,
      'nome': '',
     'media':'',
       },
       {
     id : 9,
      'nome': '',
     'media':'',
       },
       {
     id : 10,
      'nome': '',
     'media':'',
    },
    {
        id : 11,
         'nome': '',
        'media':'',
       },
       {
        id : 12,
         'nome': '',
        'media':'',
       }
   ]

   function fechaModal(){
    setGruposPicker1('1');
    setGruposPicker2('2');
    setModalResultadoGrupo(false);
   }
 return (
     <View style={{flex:1}}>
     <Image
      source={require('../../../../assets/resultados/backGroundResultado.jpg')}
      style={{width:'100%', height:'100%'}}
     />
   <View style={styles.container}>
     

       <Text style={styles.txtEscolha}>Escolha um grupo para ver o resultado</Text>

       <Animatable.View animation="zoomIn" style={styles.viewFlatList}>
       
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
       
       </Animatable.View>

       <Animatable.View animation="zoomIn" style={styles.viewBtn}>
           <TouchableOpacity style={styles.btnIniciar}onPress={() => chamaModalPicker()}>
           <Image
            source={require('../../../../assets/resultados/ComparaGrupos.png')}
            style={{width:'100%', height:'100%'}}
            />
           </TouchableOpacity>
       </Animatable.View>
      

      {/*Modal ed tabela de grupos*/}
      <Modal animationType='fadeIn' visible={modalResultadoGrupo} transparent={true}>
          <View>
            <View style={{borderRadius:10,width:'90%', height:'90%', margin:'5%',backgroundColor:'#04abd8', marginTop:'10%',flexDirection:'row', borderWidth:1, borderColor:'#fff'}}>
               
              <View style={{marginLeft:'3%', marginTop:'7%'}}>
                        <View style={{width:40,height:40, marginLeft:'69%', paddingLeft:'18%',marginTop:-25,paddingTop:-10}}>
                            <TouchableOpacity style={{alignItems:'center', justifyContent:'center', width:40,height:40,backgroundColor:'red',borderRadius:10}} 
                            onPress={() => fechaModal()}
                            >
                                <Text style={{color:'#fff', fontSize:25, fontWeight:'bold'}}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row', marginTop:'5%'}}>
                                    <View style={{width:'45%', backgroundColor:'#fff', borderRadius:10, height:40,justifyContent:'center'}}>
                                    {  nomeRecebido ?
                                        <Picker
                                        style={{width:160}}
                                        selectedValue={gruposPicker1}
                                        onValueChange={(itemValue, itemIndex) => FlatRefresh1(itemValue)}
                                        >
                                            <Picker.Item label='Grupo 1' value='1'/>

                                        { nomeRecebido.map(nomegrupo =>
                                            <Picker.Item label={nomegrupo.nomeg} value={nomegrupo.nomeg}/>)
                                        }
                                            
                                        </Picker>
                                        : null
                                        }

                                    </View>

                                    <View style={{backgroundColor:'#fff', width:'45%', borderRadius:10, marginLeft:5,height:40,justifyContent:'center'}}>
                                        {  nomeRecebido ?
                                            <Picker
                                            style={{width:160}}
                                            selectedValue={gruposPicker2}
                                            onValueChange={(itemValue, itemIndex) => FlatRefresh2(itemValue)}
                                            >
                                                <Picker.Item label='Grupo 2' value='2'/>

                                            { nomeRecebido.map(nomegrupo =>
                                                <Picker.Item label={nomegrupo.nomeg} value={nomegrupo.nomeg}/>)
                                            }
                                                
                                            </Picker>
                                            : null
                                            }

                                </View>
                        </View>

               <View style={{marginLeft:'-0.5%'}}>         
                        <View style={{flexDirection:'row',marginTop:'10%'}}>
                                <View style={{flexDirection:'row',width:"49%",marginLeft:-5,borderWidth:1, borderColor:'#fff'}}>
                                    <Text style={{fontSize:15, fontWeight:'bold', color:'#fff',marginRight:'15%'}}>Nome</Text>
                                    <Text style={{fontSize:15, fontWeight:'bold', color:'#fff',marginLeft:'25%'}}>Média</Text>
                                </View>
                                <View style={{flexDirection:'row',width:"50%",borderWidth:1, borderColor:'#fff'}}>
                                    <Text style={{fontSize:15, fontWeight:'bold', color:'#fff'}}>Nome</Text>
                                    <Text style={{fontSize:15, fontWeight:'bold', color:'#fff', marginLeft:'43%'}}>Média</Text>
                                </View>
                        </View>
                 
                 
               <View style={{flexDirection:'row',justifyContent:'center',width:'100%', paddingRight:'1%'}}>              
                       
                      {gruposPicker1 != '1'?
                       <FlatList
                        style={{ width:'51%',marginLeft:-5,height:'80%',borderWidth:1, borderColor:'black',backgroundColor:'#fff'}}
                        showsVerticalScrollIndicator={false}
                        data={nomeGB}
                        renderItem={ ({item}) => 
                        <View >
                            
                            <View style={{flexDirection:'row',borderWidth:1, borderColor:'black',width:'100%', backgroundColor:'#fff'}}>
                                <View style={{width:'82%'}}>
                                    
                                    <Text style={{fontSize:15, fontWeight:'bold'}}>{item.nome}</Text> 
                                </View>
                                <View style={{width:'18%',alignItems:'center'}}>
                                    { ((item.avaliado == true) && (item.avaliado1 == false))? 
  
                                    <Text style={{fontSize:15,fontWeight:'bold',marginLeft:-10}}>

                                        {(((item.teste1.estimativa + item.teste1.logica + item.teste1.memoria + item.teste1.visaoEspacial)/12)*100).toFixed(0)}%

                                    </Text> :null
                                        
                                    }

                                    { ((item.avaliado == true) && (item.avaliado1 == true) && (item.avaliado2 == false))? 
                                    
                                    <Text style={{fontSize:15,fontWeight:'bold',marginLeft:-10}}>

                                        {( s1=((item.teste1.estimativa + item.teste1.logica + item.teste1.memoria + item.teste1.visaoEspacial)/12) >
                                          (s2=((item.teste2.estimativa + item.teste2.logica + item.teste2.memoria + item.teste2.visaoEspacial)/12)))?
                                          (s1 * 100).toFixed(0) : (s2 * 100).toFixed(0)
                                        }%

                                    </Text> : null
                                        
                                    }

                                    { ((item.avaliado == true) && (item.avaliado1 == true) && (item.avaliado2 == true))? 
                                    
                                    <Text style={{fontSize:15,fontWeight:'bold',marginLeft:-10}}>

                                        {( s1=((item.teste1.estimativa + item.teste1.logica + item.teste1.memoria + item.teste1.visaoEspacial)/12) >
                                          (s2=((item.teste2.estimativa + item.teste2.logica + item.teste2.memoria + item.teste2.visaoEspacial)/12)))?
                                          (s1 * 100).toFixed(0) : s2 >
                                          (s3=((item.teste3.estimativa + item.teste3.logica + item.teste3.memoria + item.teste3.visaoEspacial)/12)) ?
                                           (s2 * 100).toFixed(0) : (s3 * 100).toFixed(0) 
                                           
                                        }%

                                    </Text> : null
                                        
                                    }

                                   
                                    

                                </View>
                        </View>
                            
                        </View>
                        }
                        keyExtractor={(item) => item.nome}
                        />
                        : 
                        <FlatList
                        style={{ width:'51%',marginLeft:-5,height:'80%',borderWidth:1, borderColor:'black'}}
                        showsVerticalScrollIndicator={false}
                        data={dados}
                        renderItem={ ({item}) => 
                        <View >
                            
                            <View style={{flexDirection:'row',borderWidth:1, borderColor:'black',width:'100%', backgroundColor:'#fff'}}>
                                <View style={{width:'82%'}}>
                                    <Text style={{fontSize:15, fontWeight:'bold'}}>{item.nome}</Text> 
                                </View>
                                <View style={{width:'18%',alignItems:'center'}}>
              
                               <Text style={{fontSize:15,fontWeight:'bold',marginLeft:-10}}>{item.media}</Text> 
    
                                </View>
                        </View>
                            
                        </View>
                        }
                        keyExtractor={(item) => item.id}
                        />
                        }

                      { gruposPicker2 != '2'? 
                      <FlatList
                        style={{ width:'52%',marginRight:5,paddingLeft:'-4%',height:'80%',borderWidth:1, borderColor:'black',backgroundColor:'#fff'}}
                        showsVerticalScrollIndicator={false}
                        data={nomeGB2}
                        renderItem={ ({item}) => 
                        <View>
                            
                            <View style={{flexDirection:'row',borderWidth:1, borderColor:'black',width:'100%',backgroundColor:'#fff'}}>
                                <View style={{width:'82%', backgroundColor:'#fff'}}>
                                    
                                    <Text style={{fontSize:15, fontWeight:'bold'}}>{item.nome}</Text> 
                                </View>
                                <View style={{width:'18%', alignItems:'center'}}>
                                    { ((item.avaliado == true) && (item.avaliado1 == false))? 
  
                                    <Text style={{fontSize:15,fontWeight:'bold',marginLeft:-10,backgroundColor:'#fff'}}>

                                        {(((item.teste1.estimativa + item.teste1.logica + item.teste1.memoria + item.teste1.visaoEspacial)/12)*100).toFixed(0)}%

                                    </Text> :null
                                        
                                    }

                                    { ((item.avaliado == true) && (item.avaliado1 == true) && (item.avaliado2 == false))? 
                                    
                                    <Text style={{fontSize:15,fontWeight:'bold',marginLeft:-10}}>

                                        {( s1=((item.teste1.estimativa + item.teste1.logica + item.teste1.memoria + item.teste1.visaoEspacial)/12) >
                                          (s2=((item.teste2.estimativa + item.teste2.logica + item.teste2.memoria + item.teste2.visaoEspacial)/12)))?
                                          (s1 * 100).toFixed(0) : (s2 * 100).toFixed(0)
                                        }%

                                    </Text> : null
                                        
                                    }

                                    { ((item.avaliado == true) && (item.avaliado1 == true) && (item.avaliado2 == true))? 
                                    
                                    <Text style={{fontSize:15,fontWeight:'bold',marginLeft:-10}}>

                                        {( s1=((item.teste1.estimativa + item.teste1.logica + item.teste1.memoria + item.teste1.visaoEspacial)/12) >
                                          (s2=((item.teste2.estimativa + item.teste2.logica + item.teste2.memoria + item.teste2.visaoEspacial)/12)))?
                                          (s1 * 100).toFixed(0) : s2 >
                                          (s3=((item.teste3.estimativa + item.teste3.logica + item.teste3.memoria + item.teste3.visaoEspacial)/12)) ?
                                           (s2 * 100).toFixed(0) : (s3 * 100).toFixed(0) 
                                           
                                        }%

                                    </Text> : null
                                        
                                    }
                                    

                                </View>
                        </View>
                            
                        </View>
                        }
                        keyExtractor={(item) => item.nome}
                        />
                       :
                       <FlatList
                       style={{ width:'52%',marginRight:5,paddingLeft:'-4%',height:'80%',borderWidth:1, borderColor:'black'}}
                       showsVerticalScrollIndicator={false}
                       data={dados}
                       renderItem={ ({item}) => 
                       <View>
                           
                           <View style={{flexDirection:'row',borderWidth:1, borderColor:'black',width:'100%',backgroundColor:'#fff'}}>
                               <View style={{width:'82%', backgroundColor:'#fff'}}> 
                                   <Text style={{fontSize:15, fontWeight:'bold'}}>{item.nome}</Text> 
                               </View>
                               <View style={{width:'18%', alignItems:'center'}}>
                                  <Text style={{fontSize:15,fontWeight:'bold',marginLeft:-10,backgroundColor:'#fff'}}>{item.media}</Text> 
                               </View>
                       </View>
                           
                       </View>
                       }
                       keyExtractor={(item) => item.id}
                       />
                    }

                    
                 </View>
               
                    
                
                </View>
                    
      

               
               </View>

               
            </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:'-48%',marginLeft:'8%'}}>
                                {  (gruposPicker1 != '1' &&  m1 != 0.5)?
                                <Text style={{fontSize:16,color:'#fff', fontWeight:'bold'}} >Média: {m1.toFixed(1)}%</Text>
                                
                                
                                
                                :(gruposPicker1 != '1' &&  m1 == 0.5)?
                                 <Text style={{fontSize:16,color:'#fff', fontWeight:'bold'}} >Grupo não avaliado</Text>
                                 :null
                                }




                                { (gruposPicker2 != '2' && m2 != 0.5)?
                                  <Text style={{marginRight:'22%',fontSize:16,color:'#fff', fontWeight:'bold'}} >Média:{m2.toFixed(1)}%</Text>
                                 : (gruposPicker2 != '2' && m2 == 0.5)?

                                 <Text style={{marginRight:33,marginLeft:'1%',fontSize:16,color:'#fff', fontWeight:'bold'}} >Grupo não avaliado</Text>
                                : null
                                }
                                
                        </View>




                   <View style={{marginTop:'20%', marginLeft:'10%', flexDirection:'row'}}>
                        <TouchableOpacity style={{width:140, height:40, backgroundColor:'#fff', borderRadius:10,alignItems:'center', justifyContent:'center'}}
                         onPress={() => ordenaNome()}
                        >
                            <Text>Ordenar por Nome</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width:140, height:40, backgroundColor:'#fff', borderRadius:10,alignItems:'center', justifyContent:'center', marginLeft:10}}
                        onPress={() => ordenaMédia()}
                        >
                            <Text>Ordenar por Média</Text>
                        </TouchableOpacity>
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
        marginBottom:-25,
        width: '85%',
        height: 45,
        marginLeft:'13%'
    },
    viewBtn2:{
        flex:1,
        alignItems:'center',
        
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
    viewFlat:{
       justifyContent:'center',
       alignItems:'center'
    },
})