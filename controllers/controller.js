const Pet = require('../models/pet');

module.exports = {

  index: function(req, res){
    Pet.find().sort({type: 1})
      .then(pets => res.json(pets))
      .catch(err => res.json(err));
  },

  create: function(req, res){
    Pet.create(req.body)
      .then(pet => res.json(pet))
      .catch(err => res.json(err));
  },

  read: function(req, res){
    Pet.findOne({_id: req.params.id})
      .then(pet => {
        res.json(pet ? pet : "No such pet in database")
      })
      .catch(err => res.json(err));
  },

  like: function(req, res){
    Pet.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
      .then(pet => {
        res.json(pet ? pet : "No such pet in database")
      })
      .catch(err => res.json(err));
  },

  update: function(req, res){
    let pet = new Pet();
    pet.name = req.body.name;
    pet.type = req.body.type;
    pet.description = req.body.description;
    pet.validate(function(err) {
      if (err) {
        res.json(err);
      } else {
        Pet.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
          .then(pet => {
            res.json(pet ? pet : "No such pet in database")
          })
          .catch(err => res.json(err));
      }
    })
  },

  delete: function(req, res){
    Pet.deleteOne({_id: req.params.id})
    .then(pet => {
      res.json(pet ? pet : "No such pet in database")
    })
    .catch(err => res.json(err));
  }


}
