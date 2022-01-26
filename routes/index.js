const router = require('express').Router();
const apiRoutes = require('./api0');

router.use('/api', apiRoutes);
router.use((req, res) => {
    res.status(404).send('Error');
});

module.exports = router;