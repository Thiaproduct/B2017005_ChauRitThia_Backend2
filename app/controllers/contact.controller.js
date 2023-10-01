const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const ContactService = require("../services/contact.services");
// exports.create = (req, res) => {
//     res.send({ message: "create handler"});
// };
// exports.create = async (req, res, next ) =>{
//     console.log(req.body);
//     if(!req.body?.name){
//         return next(new ApiError(400, "Name can not be empty"));
//     }
//     try {
//         const contactService = new ContactService(MongoDB.client);
        
//         const document = await contactService.create(req.body);
//         return res.send(document);
//     }catch (error){
//         return next(
//             new ApiError(500, "An error occurred while creating the contact")
//         );
//     }
// };

exports.create = async (req, res, next)=>{
    if (!req.body?.name){
      return next(new ApiError(400, "Name can not be empty"));
    }
    try{
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.create(req.body);
      return res.send(document)
    }catch(error){
      return next(new ApiError(500, `An error has occurred while creating new contact with error '${error}'`))
    }
  };
exports.findAll = async (req, res, next) =>{

  let document = [];

  try{
    const contactService = new ContactService(MongoDB.client);
    const {name} = req.query;
    if(name){
      document = await contactService.findByName(name);

    }
    else{
      document = await contactService.find({});
    }

  }catch(error){
    return next(
      new ApiError(500, "An error occurred while retrieving contacts")
    );
  }
  return res.send(document);
};

exports.findOne = async (req, res, next) => {
  try{
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);
    if(!document){
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(document);
  }catch (error){
    return next(
      new ApiError(500, `Error retreving contact with id=${req.params.id}` 
      )
    )
  }
};

exports.update = async(req, res, next) =>{
  if(Object.keys(req.body).length === 0){
    return next(new ApiError(400, "Data to update cat not be empty"));
  }
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.update(req.params.id, req.body)
    if(!document){
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({message : "Contact was updated successfully"});
  }
  catch (error){
    return next(
      new ApiError(500, `Error updating cantact with id=${req.params.id}`)
    );
  }
};

exports.delete = async(req, res, next) => {
  try{
    const contactService = new ContactService(Mongodb.clinet);
    const document = await contactService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was deleted successully"});
  }catch (error){
    return next(
      new ApiError(500, `Could not dalete contsct eoth id=${req.params.id}`)
    );
  }
  
};

exports.deleteAll = async(req, res, next) =>{
    try{
      const contactService = new ContactService(MongoDB.client);
      const deletedCount = await contactService.deleteAll();
      return res.send({
        message: `${deletedCount} contatcs were deleted successfully`
      });
    }catch (error){
      return next(
        new ApiError(500, "An error occurred while removing all contacts")
      );

    }
};


exports.findAllFavorite = async(req, res, next) =>{
  try{
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findAllFavorite();
    return res.send(document);
  } 
  catch(error){
    return next(
      new ApiError(500, "An error occurred while retrieving favorite contacts")
    );
  }
 
};

