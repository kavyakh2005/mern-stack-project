const categoryRouter= require('express').Router()
const {create, read}= require('../controller/category.controller');

categoryRouter.post('/create',create)
categoryRouter.get('/:id?', read);


module.exports = categoryRouter;