//------------------------------import------------------------------------------------
import Aluno from '../models/Aluno';

//--------------------------------class-------------------------------------------
class AlunoController {
  //------------------------------index---------------------------------------------
  async index(req, res) {
    const alunos = await Aluno.findAll()
    res.json(alunos);
  }

  //----------------------------read------------------------------------------------
  async read(req, res) {
    
  }
  //---------------------------create-------------------------------------------------
  async  create(req, res) {
    try{
      const {nome , email, cep, cidade, estado} = req.body;

      await Aluno.create({ id:null, nome:nome, email:email, cep:cep, cidade:cidade, estado:estado})
      res.json('Aluno criado com sucesso')
    }catch(err){
      console.log(err)
    }
    

  }

  //-------------------------update-----------------------------------------------------
  async update(req, res) {
    try{
      const aluno_id = req.params.id;
    const {nome , email, cep, cidade, estado} = req.body;
  
      const aluno = await Aluno.findByPk(aluno_id)
      await aluno.update({ nome, email, cep, cidade, estado})
      res.json(aluno)
    }catch(err){
      console.log(err)
    }
    
  }

  //--------------------------delete----------------------------------------------------
  async delete(req, res) {
    try{
      const aluno_id = req.params.id;

        Aluno.destroy({ where: {id: aluno_id}})
    }catch(err){
      console.log(err)
    }
    
}
}

export default new AlunoController();
