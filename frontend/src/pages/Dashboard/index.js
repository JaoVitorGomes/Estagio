import React, { useEffect, useState, useCallback } from 'react';

// components
import { Table, Button, Popup, Modal, Header, Icon, Form } from 'semantic-ui-react'

//services
import {api , apiExterna} from '../../services/api';

// styles
import { Container, InitialText } from './styles';

const Dashboard = () => {
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [currentInfo, setCurrentInfo] = useState([]);
  const [modalInfos, setModalInfos] = useState(false);
  const [currentCurso, setCurrentCurso] = useState([]);
  const [modalCurso, setModalCurso] = useState(false);
  const [idcursos, setIdCursos] = useState([]);
  const [alunoCursos, setAlunoCursos]= useState([]);

 
//-----------------------------useFffect------------------------------------
  useEffect(()=>{
    async function fetchData() {
      try{
        const response = await api.get('/alunos');
        setAlunos(response.data);
        console.log(response.data)
        const responseCurso = await api.get('/cursos');
        setCursos(responseCurso.data);
      } catch {
        alert('Confira a api');
      }
    }
    fetchData();
  }, [])


  //--------------------------Functions------------------------------- 
  async function SubmitUpdate(id) {
    try{
       const resultUpdate = await api.put(`/alunos/${id}`,currentInfo)
       
       const updateAlunos = [...alunos];
        const index = updateAlunos.map(aluno => aluno.id).indexOf(id)
       updateAlunos[index] = resultUpdate.data;
        setAlunos(updateAlunos);
        alert('o aluno foi atualizado')
    } catch(err) {
      alert(err);
    }
  }

   async function SubmitCep(cep) {
    try{
        const viacep = await  apiExterna.get(`/${cep}/json/`)
      setCurrentInfo( previous => ({ ...previous, estado:viacep.data.uf , cidade:viacep.data.localidade  } ))
    } catch(err) {
      alert('insira um CEP valido de 8 numeros');
    }
  }

  function SubmitDel(id) {
    try{
        api.delete(`/alunos/${id}`)
        const removeAlunos = [...alunos];
        const index = removeAlunos.map(aluno => aluno.id).indexOf(id)
        removeAlunos.splice(index, 1);
        setAlunos(removeAlunos);
    }catch(err){
      alert(err);
    }
  }
  
  async function SubmitAlunoCurso(id) {
    try{
        const resultAlunoCurso = await api.post('/cursos',{id_pessoa:id,id_curso:idcursos})  
        alert(resultAlunoCurso.data)
    } catch(err) {
      alert(err);
    }
  }

  function update() {
    const select = document.getElementById('cursos');
    const option = select.options[select.selectedIndex];
  setIdCursos(option.value)
  }

    const handleInput = useCallback ((e) => {
      const updateCurrentInfo = {...currentInfo};
      updateCurrentInfo[e.target.name] = e.target.value;
      setCurrentInfo(updateCurrentInfo);
   },[currentInfo])


  //------------------------render(functions)-----------------------------------------------
  const render_modal_curso_alunos = () => (
    <Modal open={modalCurso} onClose={()=>setModalCurso(false)} closeIcon>
    <Header content={`Adicionar curso para ${currentCurso.nome}`} />
    <Modal.Content>
      <Form>
        <Form.Group widths='equal'>
          <select id='cursos' onChange={()=>update()}>
          <option disabled selected>Escolha um curso:</option>
          {render_cursos()}
          </select>
        </Form.Group>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button  color='red'>
        <Icon name='remove' onClick={()=>{setModalCurso(false)}}/> Cancelar
      </Button>
      <Button onClick={()=>{setModalCurso(false);SubmitAlunoCurso(currentCurso.id)}} color='green'>
        <Icon name='checkmark' /> Salvar curso no Aluno
      </Button>
    </Modal.Actions>
  </Modal>
  )

  const render_modal_info_alunos = () => (
    <Modal open={modalInfos} onClose={()=>{setModalInfos(false)}} closeIcon>
    <Header content={`Editando informações de ${currentInfo.nome}`} />
    <Modal.Content>
      <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid type='text'label='Nome' name='nome' placeholder='Nome' value={currentInfo.nome}onChange={handleInput}/>
          <Form.Input fluid type='email'label='Email' name='email' placeholder='Email' value={currentInfo.email} onChange={handleInput}/>
          <Form.Input fluid type='number'label='CEP'  name='cep' placeholder='CEP'value={currentInfo.cep} onChange={handleInput} onBlur={()=>{SubmitCep(currentInfo.cep)}} minlength="8" maxlength="8"/>
          <Form.Input fluid type='text'label='Cidade' name='cidade'  value={currentInfo.cidade} placeholder='preencha o cep para completar'onChange={handleInput} />
          <Form.Input fluid type='text'label='Estado' name='estado' value={currentInfo.estado}  placeholder='preencha o cep para completar'onChange={handleInput} />
        </Form.Group>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={()=>setModalInfos(false)} color='red'>
        <Icon name='remove'  /> Cancelar
      </Button>
      <Button onClick={()=>{SubmitUpdate(currentInfo.id);setModalInfos(false)}} color='green'>
        <Icon name='checkmark' /> Salvar
      </Button>
    </Modal.Actions>
  </Modal>
  )

  function open_info_alunos(data_aluno){
    console.log(data_aluno)
    setCurrentInfo(data_aluno)
    setModalInfos(true)

  }
  function open_curso_alunos(data_aluno){
    setCurrentCurso(data_aluno)
    setModalCurso(true)
  }

  function render_actions(data_aluno){
    return <center>
      <Popup
        trigger={<Button icon='edit' onClick={()=>open_info_alunos(data_aluno)} />}
        content="Editar informações"
        basic
      />
      <Popup
        trigger={<Button icon='plus' onClick={()=>open_curso_alunos(data_aluno)} positive />}
        content="Adicionar curso para aluno"
        basic
      />
      <Popup
        trigger={<Button icon='close' onClick={()=>SubmitDel(data_aluno.id)} negative />}
        content="Excluir aluno"
        basic
      />
    </center>
  }

  function render_alunos(){
    return alunos.map((v)=><Table.Row>
      <Table.Cell>{v.id}</Table.Cell>
      <Table.Cell>{v.nome}</Table.Cell>
      <Table.Cell>{v.email}</Table.Cell>
      <Table.Cell>{v.cep}</Table.Cell>
      <Table.Cell>{render_actions(v)}</Table.Cell>
    </Table.Row>)
  }

  function render_cursos(){
    return cursos.map((v)=><option value={v.id}>
      {v.nome}
      </option>)
  }

  //----------------------------------return----------------------------------------------
  return (
    <Container>
      <InitialText>Administrador de alunos</InitialText>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID Aluno</Table.HeaderCell>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>CEP</Table.HeaderCell>
            <Table.HeaderCell>Ações</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { alunos.length > 0 ? render_alunos() : <h2>Nenhum dado registrado </h2> }
        </Table.Body>
      </Table>
      {render_modal_info_alunos()}
      {render_modal_curso_alunos()}
      <Button primary href='/register'>Adicionar aluno</Button>
      <Button href="/" secondary>Ver instruções</Button>
    </Container>
  );

};





export default Dashboard;
