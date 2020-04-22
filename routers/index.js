const router = require('express').Router();

router.get(['','/'], async (req,res)=>{
    
    res.send("<p><h1> Welcome CII-2-DMWM-B to our student Rest API. </h1></p>");
})



module.exports = router;