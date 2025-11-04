import { Event } from "./models/events.model.js";
import { User } from "./models/user.model.js";
import { asyncHandler } from "./utils/asyncHandler.js";

const register = asyncHandler( async ( req ,res) => {
    const user = new User(req.body);
    await user.save();
    return res.status(200).send({
        success : true,
        user
    })
})

const login = asyncHandler(async (req , res) => {
    const { email , password } = req.body;
    const user = await User.findOne({email});
    if(user.password != password){
        return res.status(400).send({
            success : false,
        })
    }
    return res.status(200).send({
        message : "Login",
        success : true,
        user
    })
})

const createEvent = asyncHandler( async(req , res) => {
    const event = new Event(req.body);
    await event.save();
    return res.status(200).send({
        message : "Event Added",
        success : true,
        event
    })
});

const getEvent = asyncHandler(async (req , res) => {
    const events = await Event.find({});
    return res.status(200).send({
        message : "events",
        success : true,
        events
    })
})

const getOneEvent = asyncHandler(async (req , res) => {
    const event = await Event.findById(req.params.id);
    if(!event){
        return res.status(200).send({
            message : "No events found",
            success : false
        })
    }
    return res.status(200).send({
        message : "Event",
        success : true,
        event
    })
})

const participate = asyncHandler(async (req , res) => {
    const event = await Event.findById(req.params.id);
    const userId = req.body.user_id;
    const user = await User.findById(userId);
    if(!event){
        return res.status(200).send({
            message : "No events found",
            success : false
        })
    }
    event.participants.push(userId);
    user.events.push(req.params.id);
    await event.save();
    await user.save();
    return res.status(200).send({
        message : "Participated",
        success : true,
    })
})

const myParticipation = asyncHandler(async (req , res)=> {
    const userId = req.body.user_id;
    const user = await User.findById(userId).populate('events');
    return res.status(200).send({
        success: true,
        events: user.events
    })

})

const extraInfo = asyncHandler(async (req, res) => {
    const userId = req.body.user_id;
    
    // Get organizer's events
    const organizerEvents = await Event.find({ user_id: userId }).populate('participants');
    
    // Calculate total participants across all events
    const totalParticipants = organizerEvents.reduce((sum, event) => sum + event.participants.length, 0);
    
    // Get total number of events created
    const totalEvents = organizerEvents.length;
    
    // Calculate average participants per event
    const avgParticipantsPerEvent = totalEvents > 0 ? (totalParticipants / totalEvents).toFixed(2) : 0;
    
    // Get event with most participants
    const mostPopularEvent = organizerEvents.reduce((max, event) => 
        event.participants.length > (max?.participants.length || 0) ? event : max
    , null);
    
    // Count events by status
    const eventsByStatus = organizerEvents.reduce((acc, event) => {
        acc[event.status] = (acc[event.status] || 0) + 1;
        return acc;
    }, {});
    
    // Get recent events (last 5)
    const recentEvents = organizerEvents
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(event => ({
            id: event._id,
            title: event.title,
            participantCount: event.participants.length,
            status: event.status
        }));
    
    return res.status(200).send({
        success: true,
        message: "Dashboard stats",
        stats: {
            totalEvents,
            totalParticipants,
            avgParticipantsPerEvent: parseFloat(avgParticipantsPerEvent),
            mostPopularEvent: mostPopularEvent ? {
                id: mostPopularEvent._id,
                title: mostPopularEvent.title,
                participantCount: mostPopularEvent.participants.length
            } : null,
            eventsByStatus,
            recentEvents
        }
    })
})

export {register , login, createEvent, getEvent, getOneEvent, participate, myParticipation, extraInfo}