const express = require('express');
const router = express.Router();
const controller = require('../Controllers/SchemaData');

router.get('/', controller.schema);

module.exports = router;