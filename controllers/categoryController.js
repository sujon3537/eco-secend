const Category = require("../models/categoryModel.js");
const SubCategory = require("../models/subcategoryModel.js");

async function categoryController(req, res){
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

    return res.send({message: "Category created successfully"})
        
    
}

async function categoryStatusController(req, res){
    const {name, status} = req.body;
    
    if(status == "rejected" || status == "waiting"){
        let updateCategory = await Category.findOneAndUpdate({name}, {$set: {status: status, isActive: false}}, {new: true})

        return res.send({success: "Category status updated successfully"})
    }
    else if(status == "approved"){
        let updateCategory = await Category.findOneAndUpdate({name}, {$set: {status: status, isActive: true}}, {new: true})
        return res.send({success: "Category status updated successfully"})
    }
}

async function subCategoryController(req, res){
    const {name, description, categoryId} = req.body;
    
    if(!name){
        return res.send({error: "Please, enter a subcategory name!"})
    }
    
    let subCategoryExists = await SubCategory.find({name})
    
    if(subCategoryExists.length > 0){
        return res.send({error: "Subcategory already exists, try another"})
    }
        
    let subcategory = new SubCategory({
        name, 
        description,
        categoryId
    })

    subcategory.save();

    await Category.findOneAndUpdate({_id: subcategory.categoryId}, {$push: {subCategory: subcategory._id}}, {new: true})

    return res.send({message: "Subcategory created successfully"})
        
    
}

async function SubCategoryStatusController(req, res){
    const {name, status} = req.body;
    
    if(status == "rejected" || status == "waiting"){
        let updateSubCategory = await SubCategory.findOneAndUpdate({name}, {$set: {status: status, isActive: false}}, {new: true})

        return res.send({success: "Subcategory status updated successfully"})
    }
    else if(status == "approved"){
        let updateSubCategory = await SubCategory.findOneAndUpdate({name}, {$set: {status: status, isActive: true}}, {new: true})
        return res.send({success: "Subcategory status updated successfully"})
    }
}

async function getAllCategory(req, res){
    let allCategory = await Category.find({}).populate("subCategory")

    res.send(allCategory)
}

async function getAllSubCategory(req, res){
    let allSubCategory = await SubCategory.find({}).populate("categoryId")

    res.send(allSubCategory)
}

module.exports = {categoryController, categoryStatusController, subCategoryController, SubCategoryStatusController, getAllCategory, getAllSubCategory};