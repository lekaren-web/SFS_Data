const router = require('express').Router()

router.use('/datatable', require('./table'))
// router.use('/robots', require('./robots'))

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router