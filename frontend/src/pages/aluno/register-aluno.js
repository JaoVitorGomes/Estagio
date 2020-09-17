import React, {useState}from 'react';
import {api, apiExterna} from '../../services/api';
import {withRouter} from 'react-router-dom';

import { Button, Form , Segment, Grid} from 'semantic-ui-react'

import { Container, InitialText } from './styles';

const Register_aluno = ({history}) =>{

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    async function submitCep(cep) {
      try{
          const viacep = await  apiExterna.get(`/${cep}/json/`)
        setCidade(viacep.data.localidade)
        setEstado(viacep.data.uf)
      } catch(err) {
        alert('Insira um CEP valido de 8 numeros');
      }
    }

   async function submit() {

            try{
                
                await api.post('/alunos',{nome,email,cep,cidade,estado})
                history.push('/admin')
              
            } catch(err) {
              alert(err);
            }
          }

 
    return(
      <Container>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <InitialText>Cadastro de Alunos</InitialText>
        <Form size='large'  textAlign='center'>
        <Segment stacked>
            <Form.Input fluid type="text"  placeholder='Nome' name='nome' onChange={(e) => {setNome(e.target.value)}} icon='users'iconPosition='left' />
            <Form.Input fluid type="text"  placeholder='Email' name='email' onChange={(e) => {setEmail(e.target.value)}} icon='at' iconPosition='left' />
           
            <Form.Input fluid type="text" placeholder='CEP' name='cep' onChange={(e) => {setCep(e.target.value)}}onBlur={()=>{submitCep(cep)}}/>
            <Form.Input fluid type="text" placeholder='Cidade' name='cidade'value={cidade} onChange={(e) => {setCidade(e.target.value)}} />
            <Form.Input fluid type="text" placeholder='Estado' name='estado' value={estado} onChange={(e) => {setEstado(e.target.value)}} />
            <Button fluid primary onClick={()=>{submit()}} >confirmar</Button>
            <Button fluid secondary href='/admin'>voltar</Button>
          </Segment>
          </Form>
          </Grid.Column>
          </Grid>
        </Container>  
        
    );
};

export default withRouter(Register_aluno);