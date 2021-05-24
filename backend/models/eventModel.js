const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
    eventContent: {
      type: String,
      required: true,
    },
    eventImage: {
      type: String,
    },
    category: {
      type: String,
      default: ''
    },
    location:{
      type: String,
      default: 'TBA'
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        if (ret.eventImage)
          ret.eventImage = "http://localhost:3000/" + ret.eventImage;
      },
    },
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
