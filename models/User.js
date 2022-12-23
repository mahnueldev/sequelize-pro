module.exports = function(connDB, DataTypes) {
  const User = connDB.define( 
    'user', 
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
        defaultValue: 21,
      },
      statusbool: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  
  User.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error while syncing database:', err);
  });

 return User;
}

