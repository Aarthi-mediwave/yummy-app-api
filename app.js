const express = require("express");
const app = express();
const PORT = 8080;

const recipes = [
    {
        id:101,
        name:'fish'
    },
    {
        id:102,
        name:'mutton'
    },
]
// returns all recipes
app.get('/recipes',(req,res) =>{
    res.send(recipes)
})

// return just 1 recipes
app.get('/recipes/:id',(req,res) =>{
    const recipe = recipes.find((recipe) => recipe.id == req.params.id);
if(!recipe){
    return res.status(404).json({
        message:`${req.params.id} recipe not found`,
    })
}
    res.send(recipe)
})

app.put('/',(req,res) =>{
    res.send("PUT request")
})

app.post('/',(req,res) =>{
    res.send("POST request")
})

app.delete('/',(req,res) =>{
    res.send("DELETE request")
})

app.listen(PORT, (err) => {
    if(err){
        console.error(err);
        process.exit(1);
    }
    console.log(`server run on port ${PORT}`);
})
