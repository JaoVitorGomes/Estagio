//------------------------import-----------------------------------------
import { Model, DataTypes } from 'sequelize';

//----------------------------class-------------------------------------------
class AlunoCurso extends Model {

  //---------------------------init------------------------------------------
  static init(sequelize) {
    super.init(
      {
        id_pessoa: DataTypes.INTEGER,
        id_curso: DataTypes.INTEGER

      },
      {
        sequelize,
        timestamps: false,
        tableName: 'curso_pessoa'
      }
    );

    return this;
  }
}

export default AlunoCurso;
