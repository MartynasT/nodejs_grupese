const Event = require("../models/eventModel");

const getAllEvents = async (req, res) => {
  const allEvents = await Event.find();
  res.send(allEvents);
};

const createEvent = async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      eventDate: req.body.eventDate,
      eventContent: req.body.content,
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
