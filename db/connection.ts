import { Sequelize } from 'sequelize';


const db =  new Sequelize('curso_node', 'root', 'pitonpastel', {
    host: 'localhost',
    dialect : 'mysql',
    logging : true
});

export default db;