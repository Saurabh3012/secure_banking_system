var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource ha ha ha and more stuff here');
});

router.post('/', function (req, res, next) {
    var id = req.body.id;
    var name = req.body.name;
    var age = req.body.age;
    // res.send({
    //   "id": id,
    //   "name": name,
    //   "age": age
    // });
    res.send(id + " " + name + " " + age);
});

module.exports = router;
