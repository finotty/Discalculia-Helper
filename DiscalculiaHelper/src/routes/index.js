import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from '../pages/Welcome';
import EscolherAluno from '../pages/Aluno/EscolherAluno';
import InserirAluno from '../pages/Aluno/InserirAluno';

import SignIn from '../pages/Loguin/SignIn';
import SignUp from '../pages/Loguin/SignUp';

import AvaliarGrupo from '../pages/Painel/AvaliarGrupo';
import CriarGrupo from '../pages/Painel/CriarGrupo';
import Desafios from '../pages/Painel/Desafios';
import PainelControle from '../pages/Painel/PainelControle';

import Resultados from '../pages/Painel/Resultado/Resultados';
import Resultados_1 from '../pages/Painel/Resultado/Resultados_1';

import Teste1_1 from '../pages/Testes/Teste1/Teste1_1';
import Teste1_2 from '../pages/Testes/Teste1/Teste1_2';
import Teste1_3 from '../pages/Testes/Teste1/teste1_3';

import Teste2_1 from '../pages/Testes/Teste2/Teste2_1';
import Teste2_2 from '../pages/Testes/Teste2/Teste2_2';
import Teste2_3 from '../pages/Testes/Teste2/Teste2_3';


import Teste3_1 from '../pages/Testes/Teste3/Teste3_1';
import Teste3_1_1 from '../pages/Testes/Teste3/Teste3_1_1';
import Teste3_2 from '../pages/Testes/Teste3/Teste3_2';
import Teste3_2_2 from '../pages/Testes/Teste3/Teste3_2_2';
import Teste3_3 from '../pages/Testes/Teste3/Teste3_3';
import Teste3_3_3 from '../pages/Testes/Teste3/Teste3_3_3';

import Teste4_1 from '../pages/Testes/Teste4/Teste4_1';
import Teste4_1_1 from '../pages/Testes/Teste4/Teste4_1_1';
import Teste4_2_2 from '../pages/Testes/Teste4/Teste4_2_2';

import Desafio1 from '../pages/Desafio/Desafio1';
import Desafio1_1 from '../pages/Desafio/Desafio1_1';

import Desafio2 from '../pages/Desafio/Desafio2';
import Desafio2_1 from '../pages/Desafio/Desafio2_1';

import Desafio3 from '../pages/Desafio/Desafio3';
import Desafio3_1 from '../pages/Desafio/Desafio3_1';
import Desafio3_2 from '../pages/Desafio/Desafio3_2';

import Desafio4 from '../pages/Desafio/Desafio4';
import Desafio4_1 from '../pages/Desafio/Desafio4_1';

import Desafio5 from '../pages/Desafio/Desafio5';
import Desafio5_1 from '../pages/Desafio/Desafio5_1';


const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
      
        <Stack.Navigator>
            <Stack.Screen
             name='Welcome'
             component={Welcome}
             options={{
                 headerShown: false
             }}
            />
       
            <Stack.Screen
            name='SignIn'
            component={SignIn}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='SignUp'
            component={SignUp}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='PainelControle'
            component={PainelControle}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='CriarGrupo'
            component={CriarGrupo}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='InserirAluno'
            component={InserirAluno}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='AvaliarGrupo'
            component={AvaliarGrupo}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='EscolherAluno'
            component={EscolherAluno}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='Teste1_1'
            component={Teste1_1}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Teste1_2'
            component={Teste1_2}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Teste1_3'
            component={Teste1_3}
            options={{
                headerShown: false
            }}
            />
     

           <Stack.Screen
            name='Teste2_1'
            component={Teste2_1}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='Teste2_2'
            component={Teste2_2}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Teste2_3'
            component={Teste2_3}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='Teste3_1'
            component={Teste3_1}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Teste3_1_1'
            component={Teste3_1_1}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Teste3_2'
            component={Teste3_2}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Teste3_2_2'
            component={Teste3_2_2}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Teste3_3'
            component={Teste3_3}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Teste3_3_3'
            component={Teste3_3_3}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Resultados'
            component={Resultados}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='Desafios'
            component={Desafios}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='Teste4_1'
            component={Teste4_1}
            options={{
                headerShown: false
            }}
            />
          
           <Stack.Screen
            name='Teste4_1_1'
            component={Teste4_1_1}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Teste4_2_2'
            component={Teste4_2_2}
            options={{
                headerShown: false
            }}
            />

         


           <Stack.Screen
            name='Desafio1'
            component={Desafio1}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Desafio1_1'
            component={Desafio1_1}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Desafio2'
            component={Desafio2}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='Desafio2_1'
            component={Desafio2_1}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='Desafio3'
            component={Desafio3}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Desafio3_1'
            component={Desafio3_1}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='Desafio3_2'
            component={Desafio3_2}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='Desafio4'
            component={Desafio4}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Desafio4_1'
            component={Desafio4_1}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='Desafio5'
            component={Desafio5}
            options={{
                headerShown: false
            }}
            />

           <Stack.Screen
            name='Desafio5_1'
            component={Desafio5_1}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name='Resultados_1'
            component={Resultados_1}
            options={{
                headerShown: false
            }}
            />

        </Stack.Navigator>

    )
}