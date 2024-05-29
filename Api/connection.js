const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',        
  host: 'localhost',            
  database: 'postgres', 
  password: 'rB2j',    
  port: 5432,                   
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database');
    done();
  }
});

module.exports = pool;
