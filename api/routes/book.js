const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');

router.get('/', async (req, res) => {
  await controller.get(req, res);
});

router.post('/add', async (req, res) => {
  await controller.add(req, res);
});

router.delete('/delete', async (req, res) => {
  await controller.remove(req, res);
  res.sendStatus(200);
});

router.put('/edit', async (req, res) => {
  await controller.edit(req, res);
})

router.get('/get/:id', async (req,res) => {
  await controller.getOneBook(req, res);
})

router.get('/searchauthor', async (req, res) => {
  await controller.searchAuthor(req, res);
})

router.get('/searchtitle', async (req, res) => {
  await controller.searchTitle(req, res);
})

module.exports = router;
