const express = require('express');
const _ = express();
const createCategoryController = require('../../controllers/createCategoryController.js')

_.post('/createcategory', createCategoryController);

module.exports = _;