var controller  = require('../controllers/controller'),
    path        = require('path');

module.exports = function(app){

  app.get('/animals', controller.index);
  app.post('/animals', controller.create);
  app.get('/animals/:id', controller.read);
  app.put('/animals/:id', controller.update);
  app.put('/like/:id', controller.like);
  app.delete('/animals/:id', controller.delete);
  app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });
}
