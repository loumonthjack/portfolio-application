const express = require('express');
const router = express.Router();
const Website = require("../../functions/internal/website");


// @route GET /
// @description GET
// @access Public
router.get('/', async (req, res) => {
  try{
    const portfolio = await Website.getWebsiteByUrl(req.get('origin'))
    return res.send({
      portfolio: portfolio
    })
  }
  catch(err){
    return res.status(400).json(err)
  }
});


module.exports = router;