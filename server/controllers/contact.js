const router = require('express').Router()
const Contact = require('../models/Contact')
const Reference = require('../models/Reference')
const Court = require('../models/Court')
const District = require('../models/District')
const User = require('../models/User')


const add = async (req, res) => {
  const { name, phone, email, district, court, advocate, field_of_practice, relation, contacted, remark, reference_name, reference_email, reference_phone, reference_contact_relation, user_id } = req.body;
  try {
    //check if contact already exist
    const user = await Contact.findOne({ email: email });

    if (user == null) {
      //add contact on contact document
      const addContact = await Contact.create({
        User_id: user_id,
        name: name,
        phone: phone,
        email: email,
        district: district,
        court: court,
        advocate: advocate,
        field_of_practice: field_of_practice,
        relation: relation,
        contacted: contacted,
        remark: remark
      })
      await addContact.save();
      //adding reference in document of reference collection
      //get the id of added contact 
      const data = await Contact.findOne({ email: email })
      const addreference = await Reference.create({
        contact_id: data._id,
        rname: reference_name,
        remail: reference_email,
        rphone: reference_phone,
        rcontact_relation: reference_contact_relation
      })
      await addreference.save();
      // add court and district information in repective collection
      const addcourt = await Court.create({
        User_id: user_id,
        contact_id: data._id,
        name: court
      })
      await addcourt.save();
      const addDistrict = await District.create({
        User_id: user_id,
        contact_id: data._id,
        name: district
      })
      await addDistrict.save();

      return res.status(200).send("Contact added succesfully");
    }
    else return res.status(500).send("Contact already exists")

  } catch (error) {
    return res.status(500).send(error.message)
  }

}
const list = async (req, res) => {
  console.log(req.query)
  try {
    const query = req.query;
    const filter = {};

    if (query.court) {
      filter.court = query.court;
    }

    if (query.district) {
      filter.district = query.district;
    }
    if (query.advocate) {
      filter.advocate = query.advocate;
    }

    if (query.field_of_practice) {
      filter.field_of_practice = query.field_of_practice;
    }
    if (query.relation) {
      filter.relation = query.relation;
    }

    if (query.contacted) {
      filter.contacted = query.contacted;
    }
    filter.User_id = query.user_id; 

    const contacts = await Contact.find(filter);
    return res.status(200).send(contacts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
const listDistricts = async (req, res) => {
  const { user_id } = req.query;
  try {
    
    await District.distinct("name", { User_id: user_id }, (err, DistrictNames) => {
      if (err) {
        return res.status(500).send(err.message)
      } else {
        
        return res.status(200).send(DistrictNames)
      }
    });
    // const courts = await Court.find({User_id: user_id}, {name: 1});

  } catch (error) {
    console.log(error)
  }

}
const listCourts = async (req, res) => {
  const { user_id } = req.query;
  try {

    await Court.distinct("name", { User_id: user_id }, (err, courtnames) => {
      if (err) {
        return res.status(500).send(err.message)
      } else {
        
        return res.status(200).send(courtnames)
      }
    });
    // const courts = await Court.find({User_id: user_id}, {name: 1});

  } catch (error) {
    console.log(error)
  }

}
const getreference = async (req, res) => {
  const { contact_id } = req.query;
  try {

    const data = await Reference.find({contact_id: contact_id});
    return res.status(200).send(data)
  } catch (error) {
    console.log(error)
  }

}

const update = async (req, res) => {
  const {id, name, phone, email, district, court, advocate, field_of_practice, relation, contacted, remark, reference_name, reference_email, reference_phone, reference_contact_relation } = req.body;
  try {
    const filter = { email: email }
    const updatee = { name: name, phone: phone, district: district, court: court, advocate: advocate, field_of_practice: field_of_practice, relation: relation, contacted: contacted, remark: remark }
    await Contact.findOneAndUpdate(filter, updatee);
    await Reference.findOneAndUpdate({contact_id: id}, {rname: reference_name, remail: reference_email, rphone: reference_phone, rcontact_relation: reference_contact_relation})
    let data = await Contact.findOne(filter);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.message)
  }

}
const deletee = async (req, res) => {
  const { contact_id } = req.query;
  try {
    await Contact.findByIdAndDelete(contact_id)
    await Court.findOneAndDelete({contact_id:  contact_id});
    await District.findOneAndDelete({contact_id:  contact_id})
    await Reference.findOneAndDelete({contact_id: contact_id})
    return res.status(200).send("Contact deleted Successfully");
  } catch (error) {
    return res.status(500).send(error.message)
  }

}
module.exports = { add, list, update, deletee, listCourts, listDistricts, getreference }