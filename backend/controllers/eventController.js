const Event = require("../models/eventModel");

const getAllEvents = async (req, res) => {
  const allEvents = await Event.find().sort("eventDate").populate("userId");
  res.send(allEvents);
};

const createEvent = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  // const relPath = req.file.path.replace(remove,'').replace(/\\/g, '/')
  const relPath = req.file.path.replace(/\\/g, "/");
  try {
    const event = new Event({
      title: req.body.eventTitle,
      eventDate: req.body.eventDate,
      eventContent: req.body.content,
      eventImage: relPath,
      category: req.body.category,
      location: req.body.eventLocation,
      userId: req.user._id,
    });

    let savedEvent = await event.save();
    res.send(savedEvent);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getOrganizatorEvents = async (req, res) => {
  let events = await Event.find({ userId: req.user._id }).sort("eventDate");
  res.send(events);
};

const getOneEvent = async (req, res) => {
  let event = await Event.find({ _id: await req.body.id });
  res.send(event);
};

const updateEvent = async (req, res) => {
  console.log(req.body);

  try {
    if (!req.body.eventId) throw { message: "provide ID" };
    await Event.findOneAndUpdate(
      { _id: await req.body.eventId },
      {
        title: req.body.title,
        eventDate: req.body.date,
        location: req.body.location,
        eventContent: req.body.description,
      },
      { new: true },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const cancelEvent = async (req, res) => {
  try {
    if (!req.body.id) throw { message: "provide ID" };
    await Event.findOneAndUpdate(
      { _id: await req.body.id },
      { active: false },
      { new: true },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  getOrganizatorEvents,
  getOneEvent,
  updateEvent,
  cancelEvent,
  getOneEvent,
};
