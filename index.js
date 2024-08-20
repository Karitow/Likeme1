const express = require("express");
const cors = require("cors");

const {getPosts, agregarPost} = require("./consultas");

const app = express();
const PORT = 3000;
app.use(express.json());
/*se instala globalmente*/
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
  });

app.get("/posts", async(req,res) => {
  try{
    const posts = await getPosts();
    res.send(posts);
  } catch (error) {
    res.status(500).send({
      error,
      message:"Not found ERROR 500", 
    });
  }
});

app.post("/posts", async(req, res) => {
  try {
    const post = req.body;
    const result = await agregarPost(post);
    res.status(201).json(result);
   } catch(error){
      console.error('Error a crear tu post:', error);
      res.status(500).json({error: 'Error en el servidor'});
    }
});

app.listen(PORT, console.log(`Servidor UP ${PORT}`))


