const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
// const bodyParser = require('body-parser');

const getAll = async (req, res, next) => {
  try{const db = await mongodb.getDb()
  // const db = await mongodb.getDb()
  const result = db.db('CSE341').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    console.log(lists)
  }).catch((e)=>{console.error(e)});}catch(e){console.error(e);}
};

const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    try{const db = await mongodb.getDb()
    const result = db
      .db('CSE341')
      .collection('contacts')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    }).catch((e)=>{console.error(e)});}catch(e){console.error(e);}
  };

const addContact = async (req, res, next) => {
  const contact = req.body;
  const db = await mongodb.getDb()
  db
      .db('CSE341')
      .collection('contacts')
      .insertOne(contact, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        res.send(result.result);
    });
}

const updateContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const contact = req.body;
  const db = await mongodb.getDb()
  db
      .db('CSE341')
      .collection('contacts')
      .updateOne(
        {_id: userId},
        {
          $set: {
            "firstName": contact.firstName, 
            "lastName": contact.lastName, 
            "email": contact.email, 
            "favoriteColor": contact.favoriteColor, 
            "birthday": contact.birthday}
        }, (error) => {if(error) {
          return response.status(500).send(error);
      }
      res.send(`${contact.firstName} ${contact.lastName} contact information successfully updated.`);}
        )
}

const deleteContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb()
  db
      .db('CSE341')
      .collection('contacts')
      .deleteOne({_id : userId}, (error, result) =>{
        if(error){throw error};
        res.send(`One contact deleted.`)
      })
}

  module.exports = { getAll, getSingle, addContact, updateContact, deleteContact };