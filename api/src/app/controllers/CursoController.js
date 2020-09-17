//------------------------------import------------------------------------------------
import Curso from '../models/Curso';

//--------------------------------class-------------------------------------------
class CursoController {

  //------------------------------index---------------------------------------------
  async index(req, res) {
    try{
      const cursos = await Curso.findAll()
      res.json(cursos);
    }catch(err){
      console.log(err)
    }

    }

  //----------------------------read------------------------------------------------
  async read(req, res) {
      
    }
  
  //---------------------------create-------------------------------------------------
  async  create(req, res) {
  
    }
  
  //-------------------------update-----------------------------------------------------
  async update(req, res) {
     
       
    }
  //--------------------------delete----------------------------------------------------
  async delete(req, res) {
      
      
  }
}
  
  export default new CursoController();