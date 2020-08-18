const { Users } = require("../models");
const multer = require('multer')

const response = {
    message: "",
    status: true,
    data:[]
}


class UserController {

  static async getUser(req, res) {
    const author = await Users.findAll();
    response.data = author;
    response.message = "succes get data";
    response.status = "success";
    res.json(response)
  }
  
  static async saveUser(req, res) {

       try { 
        const saveUser = await Users.create({
            full_name:req.body.full_name,
            username:req.body.username,
            email:req.body.email,
            phone_number:req.body.phone_number,
            salt:req.body.salt,
            password:req.body.password,
            role:req.body.role
        }) 
        console.log(saveUser)
        response.message = "sukses simpan data"
        res.status(201).json(response)
      } catch (error) {
          response.status = false;
          response.message = error.message;
          res.status(400).json(response)
      }
  
  }

  static async getUserById(req, res) {
    const {id} = req.params;
    const UserDetail = await Users.findByPk(id)
    try {
        if(!UserDetail) throw new Error("Data Not Found")
        response.data = UserDetail;
        response.message = "succes get data";
        response.status = "Success";
        res.json(response)
    } catch (error) {
          // response.message = error.message;
          response.data = [];
          response.status = "fail";
          res.status(404).json(response)
    }
  } 

  static async updateUser(req, res) {
    const {id} = req.params;
    
    try {
      const updateUser = await Users.update({
        full_name:req.body.full_name,
        username:req.body.username,
        email:req.body.email,
        phone_number:req.body.phone_number,
        role:req.body.role
      }, {
        where: {
          id: id
        }
      })
      if(!updateUser) throw new Error("Data Not Found")
      const getUserById = await Users.findByPk(id)
      response.status = "success, data updated",
      response.data = getUserById
      res.status(200).json(response)
    } catch (error) {
      response.status = false;
      response.message = error.message;
      res.status(400).json(response)
    }
  }

  static async deleteUser(req, res) {
    const {id} = req.params;
    const user = await Users.destroy({
      where: {
        id: id
      }
    })

    try {
      if(user === 0) throw new Error("Data Not Found")
      response.status = "Success, Data Deleted";
      response.data = {"id" : id}
      res.json(response)
    } catch (error) {
      response.message = error.message;
      response.data = [];
      response.status = "fail";
      res.status(404).json(response)
    }
  }
}

module.exports = UserController;
