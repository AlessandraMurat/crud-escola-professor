var express  = require ('express');
var router = express.Router();
var Professor = require('./professor')



router.post('/', (req, res) => {
    let prof = new Professor({
        name:req.body.name,
        cpf:req.body.cpf
    });

    prof.save((err, p) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(p);
        }
    })
})

router.get ('/', (req,res) => {
    Professor.find().exec((err, profs) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(profs);
        }
    })
})



router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        await Professor.deleteOne({_id: id})
        res.status(200).send({});
    }
    catch(err) {
        res.status(500).send({msg:'Internal error', error:err})
    }
})


router.patch('/:id', (req, res) => {
    Professor.findById(req.params.id, (err, prof) => {
        if (err) {
            res.status(500).send(err);
        } else if(!prof) {
            res.status(404).send({});
        } else {
            prof.name = req.body.name;
            prof.cpf = req.body.cpf;
            prof.save()
                .then((p) => res.status(200).send(p))
                .catch((e) => res.status(500).send(e));
        }
    })
})


module.exports = router;







