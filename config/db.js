const Sequelize = require("sequelize");

const sequelize = new Sequelize('todo_node_app', 'root', 'mysql@123', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false,
    define: {
        timestamps: false
    }
});




module.exports = sequelize;