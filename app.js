const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());
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


//adding a receipe
app.post('/recipes',(req,res) =>{
    const payload = req.body;
    if(!payload.name) {
        return res.status(400).send({message:"Receipe should have a name"});
    }
    payload.id=new Date().getTime();
    recipes.push(payload);
     return res.status(201).send(payload);
})

//delete the receipe
app.delete('/recipes/:id',(req,res) =>{
    const index = recipes.findIndex((recipe) => recipe.id == req.params.id);
if(index == -1){
    return res.status(404).json({
        message:`${req.params.id} recipe not found`,
    })
}
const deleteRecipe = recipes[index];
recipes.splice(index, 1);
    res.send(deleteRecipe);
})

//update a recipe
app.put('/recipes/:id',(req,res) =>{
    const payload = req.body;
    // req is ok?
    if(!payload.name) {
        return res.status(400).send({message:"Receipe should have a name"});
    }
//is the recipe to be changed there?
    const index = recipes.findIndex((recipe) => recipe.id == req.params.id);
if(index == -1){
    return res.status(404).json({
        message:`${req.params.id} recipe not found`,
    })
}
recipes[index]["name"] = payload.name;
return res.send(recipes[index]);
})



app.use((req, res, next) => {
    return res.status(404).json({
        message:"Resource not found",
    })
});



app.listen(PORT, (err) => {
    if(err){
        console.error(err);
        process.exit(1);
    }
    console.log(`server run on port ${PORT}`);
})
