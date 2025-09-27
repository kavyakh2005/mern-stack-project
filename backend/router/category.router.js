const categoryRouter= require('express').Router()
const {create, read}= require('../controller/category.controller');

categoryRouter.post('/create',create)

module.exports = categoryRouter