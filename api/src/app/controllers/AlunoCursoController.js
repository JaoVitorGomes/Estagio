//------------------------------import------------------------------------------------
import AlunoCurso from '../models/AlunoCurso';

//--------------------------------class-------------------------------------------
class AlunoCursoController {

    //------------------------------index---------------------------------------------
    async index(req, res) {
       
    }

    //----------------------------read------------------------------------------------
    async read(req, res) {
      
    }

   //---------------------------create-------------------------------------------------
    async  create(req, res) {
        try{
            const {id_pessoa, id_curso} =  req.body;

            await AlunoCurso.create({ id:null, id_pessoa:id_pessoa, id_curso:id_curso})
            res.json('curso adicionado  no aluno')
        }catch(err){
            console.log(err)
        }
        
    }
  
   //-------------------------update-----------------------------------------------------
    async update(req, res) {
     
       
    }
  
    //--------------------------delete----------------------------------------------------
    async delete(req, res) {
      
    
    }  
  }
  
  
  export default new AlunoCursoController();