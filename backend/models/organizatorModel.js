const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const OrganizatorSchema = new mongoose.Schema({
  organization: {
      type: String,
      required: true,
    },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.password
    }
  }
})


OrganizatorSchema.pre('save', function(next) {
  
  let organizator = this
  if (organizator.isModified('password')) {
    
    let hash = bcrypt.hashSync(organizator.password, 10)
    organizator.password = hash
    next()
  } else {
    next()
  }
})

const Organizator = mongoose.model('Organizator', OrganizatorSchema)

module.exports = Organizator