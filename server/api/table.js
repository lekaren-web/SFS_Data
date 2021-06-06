const router = require('express').Router()
const {DataTable} = require('../db')


router.get('/', async (req, res, next) => {
    try {
        const datatable = await DataTable.findAll()
        res.json(datatable)
    } catch (err) {
        next(err);
    }
});


router.post('/create', async(req, res, next) => {
    try {
        res.status(201).json(await DataTable.create(req.body))
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        const data = await DataTable.findByPk(req.params.id)
        if (data) {
            await data.destroy()
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
       next(error)
    }
});

module.exports = router;