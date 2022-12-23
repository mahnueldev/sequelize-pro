module.exports = function(connDB, DataTypes) {
    const Employee = connDB.define( 
      'employee', 
      {
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
     
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
    
    Employee.sync()
    .then(() => {
      console.log('Database synced');
    })
    .catch((err) => {
      console.error('Error while syncing database:', err);
    });
  
   return Employee;
  }