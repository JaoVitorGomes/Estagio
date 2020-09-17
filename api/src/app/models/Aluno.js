//------------------------import-----------------------------------------
import { Model, DataTypes } from 'sequelize';

//----------------------------class-------------------------------------------
class Aluno extends Model {
  //---------------------------init------------------------------------------
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        cep: DataTypes.STRING,
        cidade: DataTypes.STRING,
        estado: DataTypes.STRING
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'aluno'
      }
    );

    return this;
  }

}


export default Aluno;
