const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
// const bodyParser = require('body-parser');

const getAll = async (req, res) => {
  const db = await mongodb.getDb();
  const result = db.db('CSE341').collection('contacts').find();
  result
    .toArray()
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
      console.log(lists);
    })
    .catch((e) => {
      res.status(400).json({ message: e });
    });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const result = db.db('CSE341').collection('contacts').find({ _id: userId });
  result
    .toArray()
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    })
    .catch((e) => {
      res.status(400).json({ message: e });
    });
};

const addContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  // const contact = req.body;
  const db = await mongodb.getDb();
  db.db('CSE341')
    .collection('contacts')
    .insertOne(contact, (error, result) => {
      if (error) {
        return res.status(500).json(res.error || 'Some error occurred while creating the contact.');
      }
      res.status(201).json(result);
    });
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = req.body;
  const db = await mongodb.getDb();
  db.db('CSE341')
    .collection('contacts')
    .updateOne(
      { _id: userId },
      {
        $set: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          favoriteColor: contact.favoriteColor,
          birthday: contact.birthday
        }
      },
      (error) => {
        if (error) {
          return res
            .status(500)
            .json(res.error || 'Some error occurred while updating the contact.');
        } else {
          res
            .status(204)
            .send(
              `${contact.firstName} ${contact.lastName} contact information successfully updated.`
            );
        }
      }
    );
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  let deleteResult = await db.db('CSE341').collection('contacts').deleteOne({ _id: userId });
  if (deleteResult.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(deleteResult.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = { getAll, getSingle, addContact, updateContact, deleteContact };
