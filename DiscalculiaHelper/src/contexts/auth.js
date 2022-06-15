import React, { createContext, useState} from 'react';

import { useNavigation } from '@react-navigation/native';

import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../src/BancoNoSql/conexaoFirebase';

import { db } from '../../src/BancoNoSql/conexaoFirebase';
import { ref, set, onValue, update } from 'firebase/database';

export const AuthContext = createContext({})

function AuthProvider({children}){
    const [user, setUser] = useState({}); //Recebe o UID da função "login"

    const [email, setEmail] = useState('');

    const [AvaliarGp, setAvaliarGp] = useState(false);

    const [pontosTeste, setPontosTeste] = useState(1);

    const [grupoCorrent, setGrupoCorrent] = useState('');
    const [alunoCorrent, setAlunoCorrent] = useState('');

    const [nomeGBavaliar, setNomeGBavaliar] = useState('');

    const [visivelCorrent, setVisivelCorrent] = useState(false);
    const [marcador, setMarcador] = useState(false);

    const [testeContagem, setTesteContagem] = useState('');

    const [estimativaTeste1, setEstimativaTeste1 ] = useState(0);
    const [estimativaTeste2, setEstimativaTeste2 ] = useState(0);
    const [estimativaTeste3, setEstimativaTeste3 ] = useState(0);

    const [contaBolinhas, setContaBolinhas ] = useState(0);
    const [start, setStart] = useState(true);

    //------variaveis do ten frame---------
    const [atualizaFrame, setAtualizaFrame] =useState(false);
    const [veto, setVeto] = useState([]);
    const [vetoQuadro, setVetoQuadro] = useState([]);
    const [rodada, setRodada] = useState(0);
    const [pontos, setPontos] = useState(0);

    function atualizar(){
        (atualizaFrame == true)? setAtualizaFrame(false):setAtualizaFrame(true);
    }
   
    //-----------fim tenFrame----------------------

    //-------------trains---------------------------
    const [vencedor, setVencedor] =useState('');
    const [valor, setValor]= useState(0);

    //------------fim trains-------------------------

    //------------Escadas----------------------------
    const [pontos1, setPontos1] = useState(0);
    const [pontos2, setPontos2] = useState(0);

    const navigation = useNavigation(); //responsável por fazer navegação entre telas


    async function login(email,password){//Faz conexao com o banco, verifica se o email esta cadastrado e faz login
        await signInWithEmailAndPassword(auth, email,password)
        .then(value => {
            alert('loguin com sucesso!');
            setUser({
                userId : value.user.uid,
                email : email
            })
            navigation.reset({
                index:0,
                routes:[{name:'PainelControle'}]
            })   
        })
        .catch(error => {console.log(error); //tratamento de erro de senha e email nao cadastrado
              let strr = error;
              if(strr == "FirebaseError: Firebase: Error (auth/wrong-password)."){
              alert("senha incorreta");
              }
              if(strr == "FirebaseError: Firebase: Error (auth/user-not-found)."){
              alert("E-mail não cadastrado!")
              setUser({
                erroSenha : 'erro email'
            })}        
        });
    }

    function guardaVariaveisCorrent(alunoRef, nomegrupo){//Mantém global o aluno que esta sendo avaliado e o grupo pentencente
        setAlunoCorrent(alunoRef);
        setGrupoCorrent(nomegrupo); 
    }

    function guardaGrupo(nomegrupo){//Ajuda como referencia para possibilitar a edição do grupo a qualquer momento
        setNomeGBavaliar(nomegrupo); 
    }

    function avaliartruefalse(valor){//Função que permite a chamada de outra função na circunstancia correta
        if(valor == true)
         setAvaliarGp(true);
          else 
            setAvaliarGp(false);

    }

    function teste(){//Incrementa +1 na variavel "pontosTeste", para saber se o aluno acertou ou nao a questao do teste
       setPontosTeste(pontosTeste+1); 
       
    }

    function contTeste(nomeCont){
      setTesteContagem(nomeCont);
    }

    function enviaResultadoBancoT1(){//Envia resultado do primeiro teste para o firebase
        let alunoVal = (alunoCorrent);
        //console.log("aluno corrent "+ alunoCorrent);
        //console.log(alunoVal);
        update(ref(db, user.userId+'/' + grupoCorrent + alunoVal + testeContagem ), {
            estimativa: pontosTeste,
        }).then(() => {
           // alert("nota registrada!")
            setPontosTeste(1);
            })
          .catch((error) => {
            alert(error.message)
            alert("falhou nota");
            })
    }

    function enviaResultadoBancoT2(){//Envia resultado do segundo teste para o firebase
        let alunoVal = (alunoCorrent);
       // console.log("aluno corrent "+ alunoCorrent);
        //console.log(alunoVal);
        update(ref(db, user.userId+'/' + grupoCorrent + alunoVal + testeContagem), {
            logica: pontosTeste,
        }).then(() => {
           // alert("nota registrada!")
            setPontosTeste(1);
            })
          .catch((error) => {
            alert(error.message)
            alert("falhou nota");
            })
    }

    function enviaResultadoBancoT3(){//Envia resultado do terceiro teste para o firebase
        let alunoVal = (alunoCorrent);
        //console.log("aluno corrent "+ alunoCorrent);
        //console.log(alunoVal);
        update(ref(db, user.userId+'/' + grupoCorrent + alunoVal + testeContagem), {
            memoria: pontosTeste,
        }).then(() => {
            //alert("nota registrada!")
            setPontosTeste(1);
            })
          .catch((error) => {
            alert(error.message)
            alert("falhou nota");
            })
    }

    function enviaResultadoBancoT4(){//Envia resultado do quarto teste para o firebase
        let alunoVal = (alunoCorrent);
        //console.log("aluno corrent "+ alunoCorrent);
        //console.log(alunoVal);
        if(testeContagem == "teste1/"){
        update(ref(db, user.userId+'/' + grupoCorrent + alunoVal ), {    
            avaliado:true
        }).then(() => {
            //alert("nota registrada!")
            setPontosTeste(1);
            avaliartruefalse(true);
            })
          .catch((error) => {
            alert(error.message)
            alert("falhou nota");
            })
        }else if(testeContagem == "teste2/"){
            update(ref(db, user.userId+'/' + grupoCorrent + alunoVal ), {    
                avaliado1:true
            }).then(() => {
                //alert("nota registrada!")
                setPontosTeste(1);
                avaliartruefalse(true);
                })
              .catch((error) => {
                alert(error.message)
                alert("falhou nota");
                })
            }else if(testeContagem == "teste3/"){
                update(ref(db, user.userId+'/' + grupoCorrent + alunoVal ), {    
                    avaliado2:true
                }).then(() => {
                    //alert("nota registrada!")
                    setPontosTeste(1);
                    avaliartruefalse(true);
                    })
                  .catch((error) => {
                    alert(error.message)
                    alert("falhou nota");
                    })
                }
            //adicionar pontuação
            let numtest ='';
            if(testeContagem == 'teste1/'){
                numtest = 'primeira avaliação';
            }else if (testeContagem == 'teste2/'){
                numtest = 'segunda avaliação';
            }else {
                numtest = 'terceira avaliação';
            }
            update(ref(db, user.userId+'/' + grupoCorrent + alunoVal + testeContagem ), {
            
                visaoEspacial:pontosTeste,
                numteste:numtest
            }).then(() => {
                //alert("nota registrada!")
               // setGrupoCorrent('');
               // setNomeGBavaliar('');
                setPontosTeste(1);
                avaliartruefalse(true);
                })
              .catch((error) => {
                alert(error.message)
                alert("falhou nota");
                })
    }

    function aplicaTesteFalta(n){
     setVisivelCorrent(n);
    }
    function marcarAluno(n){
        setMarcador(n);
    }

    return(//exporta para toda aplicação
     <AuthContext.Provider value={{
      contTeste,login, user, guardaVariaveisCorrent, teste,alunoCorrent, grupoCorrent,enviaResultadoBancoT1,enviaResultadoBancoT2,
      enviaResultadoBancoT3,enviaResultadoBancoT4,avaliartruefalse,AvaliarGp,guardaGrupo,nomeGBavaliar,aplicaTesteFalta,visivelCorrent,
      marcarAluno,marcador,pontos,setPontos,atualizar, atualizaFrame,setAtualizaFrame,veto,setVeto,rodada, setRodada,setVetoQuadro,vetoQuadro,
      vencedor, setVencedor,valor,setValor,pontos1,setPontos1,pontos2,setPontos2,estimativaTeste3, setEstimativaTeste3
      ,estimativaTeste2, setEstimativaTeste2,estimativaTeste1, setEstimativaTeste1,contaBolinhas, setContaBolinhas,
      email,setEmail,start,setStart
      }}>
         {children}
     </AuthContext.Provider>
    )
}

export default AuthProvider;