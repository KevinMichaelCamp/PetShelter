var   mongoose        = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator');

var PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pet name is required"],
    minlength: [3, "Pet name must be at least 3 characters"],
    unique: true
  },
  type: {
    type: String,
    required: [true, "Pet type is required"],
    minlength: [3, "Pet type must be at least 3 characters"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [3, "Description must be at least 3 characters"]
  },
  skill_1: {
    type: String,
  },
  skill_2: {
    type: String,
  },
  skill_3: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0
  }
}, {timestamps: true})

PetSchema.plugin(uniqueValidator, { message: "Pet name already taken" });

var Pet = mongoose.model('Pet', PetSchema);
module.exports = Pet;
