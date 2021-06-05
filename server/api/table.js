const router = require('express').Router()
const {DataTable} = require('../db')


router.get('/', async (req, res, next) => {
    try {
        console.log('in get api get route')
        const datatable = await DataTable.findAll()
        res.json(datatable)
    } catch (err) {
        next(err);
    }
});


// router.post('/create', async(req, res, next) => {
//     try {
//         res.status(201).json(await Project.create(req.body))
//     } catch (error) {
//         next(error)
//     }
// });

// router.put('/edit/:id', async(req, res, next) => {
//     try {
//         const project = await Project.findByPk(req.params.id) ;
//             res.json(await project.update(req.body))
//     } catch (error) {
//             next(error)
//     }
// });

// router.delete('/:id', async(req, res, next) => {
//     try {
//         const project = await Project.findByPk(req.params.id)
//         if (project) {
//             await project.destroy()
//             res.sendStatus(204)
//         } else {
//             res.sendStatus(404)
//         }
//     } catch (error) {
//        next(error)
//     }
// });

module.exports = router;