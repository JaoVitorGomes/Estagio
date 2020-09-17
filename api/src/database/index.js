import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Aluno from '../app/models/Aluno';
import Curso from '../app/models/Curso';
import AlunoCurso from '../app/models/AlunoCurso';

const modelsAluno = [Aluno];
const modelsCurso = [Curso];
const modelsAlunoCurso = [AlunoCurso];

class Database {
  constructor() {
    this.init();
  
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    modelsAluno
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.modelsAluno));

      modelsCurso
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.modelsCurso));

      modelsAlunoCurso
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.modelsAlunoCurso));
  }
}



export default new Database();
