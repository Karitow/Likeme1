const { Pool } = require('pg');

const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: '123456789',
    database: 'likeme',
    allowExisOnIdle:true,
    port: 5432,
});

const getPosts = async () => {
    try {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
};
    
const agregarPost = async (post) => {
    try { 
        const values = Object.values(post);
        const query ="INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING*";
        const result = await pool.query(query, values);
        return result.row[0];
    } catch (error) {
      throw error;
    }
};    

module.exports = { getPosts, agregarPost };
