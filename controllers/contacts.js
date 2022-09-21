const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const db = await mongodb.getDb()
  const result = db.db('CSE341').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    console.log(lists)
  }).catch((e)=>{console.error(e)});
};

const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const db = await mongodb.getDb()
    const result = db
      .db('CSE341')
      .collection('contacts')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    }).catch((e)=>{console.error(e)});
  };

  module.exports = { getAll, getSingle };