const express = require('express');
const _ = express();
const { categoryController, categoryStatusController, subCategoryController, SubCategoryStatusController, getAllCategory, getAllSubCategory} = require('../../controllers/categoryController.js')


_.post('/createcategory', categoryController);
_.post('/categorystatus', categoryStatusController);
_.post('/createsubcategory', subCategoryController);
_.post('/subcategorystatus', SubCategoryStatusController);
_.get('/getallcategory', getAllCategory);
_.get('/getallsubcategory', getAllSubCategory);

module.exports = _;