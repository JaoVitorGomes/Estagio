import { Router } from 'express';

/** Controllers */
import AlunosController from '../app/controllers/AlunoController';
import CursoController from '../app/controllers/CursoController';
import AlunoCursoController from '../app/controllers/AlunoCursoController';
/**  * */

const routes = new Router();    

routes.get('/alunos', AlunosController.index);
routes.get('/cursos', CursoController.index);

routes.post('/alunos', AlunosController.create);
routes.post('/cursos', AlunoCursoController.create);

routes.put('/alunos/:id', AlunosController.update);

routes.delete('/alunos/:id', AlunosController.delete);

export default routes;
