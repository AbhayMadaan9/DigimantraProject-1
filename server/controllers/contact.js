const router = require('express').Router()
const Contact = require('../models/Contact')
const Reference = require('../models/Reference')

const add = async (req, res)=>{
const {name, phone, email, district, court, advocate, field_of_practice, relation, contacted, remark, reference} = req.body;
try {
    //check if contact already exist
const user = await Contact.findOne({email: email});

if(user == null)
{
    //add contact on contact document
    const addContact = await Contact.create({
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
     //adding reference in referenc document
     //get the id of added contact 
     const data = await Contact.findOne({email: email})
     const addreference = await Reference.create({
       contact_id: data._id,
      name: reference.name,
      email: reference.email,
      phone: reference.phone,
      contact_relation: reference.contact_relation
     })
     await addreference.save();
    return res.status(200).send("Contact added succesfully");
}
else return res.status(500).send("Contact already exists")

} catch (error) {
    return res.status(500).send(error.message)
}

}
const list = async (req, res)=>{
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
    
        const contacts = await Contact.find(filter);
        return res.status(200).send(contacts);
      } catch (error) {
        return res.status(500).send(error.message);
      }
}
const update = async (req, res)=>{
    const {name, phone, email, district, court, advocate, field_of_practice, relation, contacted, remark} = req.body;
    try {
        const filter = {email: email}
        const updatee = {name: name, phone: phone, district: district, court: court, advocate: advocate,field_of_practice: field_of_practice,relation: relation,contacted: contacted,remark: remark}
         await Contact.findOneAndUpdate(filter, updatee);
        let data = await Contact.findOne(filter);
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send(error.message)
    }

}
const deletee = async (req, res)=>{
const {email} = req.body;
try {
    let data = await Contact.findOneAndDelete({email: email});
return res.status(200).send(data);
} catch (error) {
    return res.status(500).send(error.message)
}

}
module.exports = {add, list, update, deletee}