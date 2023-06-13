const Category = require("../models/categoryModel.js");

async function createCategoryController(req, res){
    const {name, description} = req.body;
    
    if(!name){
        return res.send({error: "Please, enter a category name!"})
    }
    
    let categoryExists = await Category.find({name})
    
    if(categoryExists.length > 0){
        return res.send({error: "Category already exists, try another"})
    }
        
    let category = new Category({
        name, 
        description,
    })

    category.save();

    res.send({message: "Category created successfully"})
        
    
}

module.exports = createCategoryController;