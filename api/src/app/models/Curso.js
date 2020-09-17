//------------------------import-----------------------------------------
import { Model, DataTypes } from 'sequelize';

//----------------------------class-------------------------------------------
class Curso extends Model {

  //---------------------------init------------------------------------------
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING

      },
      {
        sequelize,
        timestamps: false,
        tableName: 'curso'
      }
    );

    return this;
  }
}

export default Curso;
