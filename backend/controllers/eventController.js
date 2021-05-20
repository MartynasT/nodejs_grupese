const Event = require("../models/eventModel");

const getAllEvents = async (req, res) => {
  const allEvents = await Event.find();
  res.send(allEvents);
};

const createEvent = async (req, res) => {
  console.log(req.body)
  console.log(req.file)
  try {
    const event = new Event({
      title: req.body.eventTitle,
      eventDate: req.body.eventDate,
      eventContent: req.body.content,
      eventImage: req.file.path

    });

    let savedEvent = await event.save();
    res.send(savedEvent);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  getAllEvents,
  createEvent,
};
