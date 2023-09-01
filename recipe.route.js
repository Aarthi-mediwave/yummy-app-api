const { Router } = require('express');

const router =  Router();

const{recipes} = require('./db');

// returns all recipes
router.get('/',(req,res) =>{
    res.send(recipes)
})

// return just 1 recipes
router.get('/:id',(req,res) =>{
    const recipe = recipes.find((recipe) => recipe.id == req.params.id);
if(!recipe){
    return res.status(404).json({
        message:`${req.params.id} recipe not found`,
    })
}
    res.send(recipe)
})


//adding a receipe
router.post('/',(req,res) =>{
    const payload = req.body;
    if(!payload.name) {
        return res.status(400).send({message:"Receipe should have a name"});
    }
    payload.id=new Date().getTime();
    recipes.push(payload);
     return res.status(201).send(payload);
})

//delete the receipe
router.delete('/:id',(req,res) =>{
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
router.put('/:id',(req,res) =>{
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




module.exports = router;