const Event = require("../models/eventModel");

const getAllEvents = async (req, res) => {
  const allEvents = await Event.find().sort('-eventDate').populate('userId');
  res.send(allEvents);
};

const createEvent = async (req, res) => {
  console.log(req.body)
  console.log(req.file)
  // const relPath = req.file.path.replace(remove,'').replace(/\\/g, '/')
  const relPath = req.file.path.replace(/\\/g, '/')
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


const getOrganizatorEvents = async (req, res) =>{
  let events = await Event.find({userId: req.user._id}).sort('-eventDate');
  res.send(events);
}


const getOneEvent = async (req, res) =>{
  let event = await Event.find({_id: await req.body.id})
  res.send(event)
}

module.exports = {
  getAllEvents,
  createEvent,
  getOrganizatorEvents,
  getOneEvent
n
};
