const router = require('express').Router();
const productController = require('../controllers/productController');

//Get All Product
router.get("/products", productController.getAllProduct);

// router.post("/todo/new", createTodo);

// router.delete('/todo/delete/:id', deleteTodo)

// router.get('/todo/toggleStatus/:id', toggleTodoStatus)

module.exports = router;
