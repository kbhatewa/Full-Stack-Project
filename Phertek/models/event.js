const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Volunteer', 'Paid', 'Community', 'Professional', 'Other']
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    host: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

// const events = [
//     {
//         id: 1,
//         category: 'Volunteer',
//         title: 'Digital Health Literacy Workshop',
//         host: 'Phertek',
//         start: '2024-04-12T10:00',
//         end: '2024-04-12T12:00',
//         details: 'Learn about digital health tools and resources.',
//         location: 'Charlotte Convention Center, Charlotte, NC',
//         image: '/images/event1.png'
//     },
//     {
//         id: 2,
//         category: 'Volunteer',
//         title: 'Medical Resource Mapping Drive',
//         host: 'Charlotte Health Alliance',
//         start: '2024-04-13T09:00',
//         end: '2024-04-13T11:00',
//         details: 'Help map medical resources in the community.',
//         location: 'Charlotte Convention Center, Charlotte, NC',
//         image: '/images/event2.jpg'
//     },
//     {
//         id: 3,
//         category: 'Volunteer',
//         title: 'Community Health Advocacy Summit',
//         host: 'NC Medical Society',
//         start: '2024-04-14T10:00',
//         end: '2024-04-14T16:00',
//         details: 'A summit to advocate for community health.',
//         location: 'Charlotte Convention Center, Charlotte, NC',
//         image: '/images/event3.png'
//     },
//     {
//         id: 4,
//         category: 'Paid',
//         title: 'Healthcare Data Analytics Workshop',
//         host: 'Phertek',
//         start: '2024-04-15T09:00',
//         end: '2024-04-15T12:00',
//         details: 'Workshop on healthcare data analytics.',
//         location: 'Charlotte Convention Center, Charlotte, NC',
//         image: '/images/event4.png'
//     },
//     {
//         id: 5,
//         category: 'Paid',
//         title: 'Tech for Health & Finance Expo',
//         host: 'Phertek',
//         start: '2024-04-16T10:00',
//         end: '2024-04-16T16:00',
//         details: 'Expo showcasing tech solutions for health and finance.',
//         location: 'Charlotte Convention Center, Charlotte, NC',
//         image: '/images/event5.png'
//     },
//     {
//         id: 6,
//         category: 'Paid',
//         title: 'Health & Finance Digital Marketing Masterclass',
//         host: 'Phertek',
//         start: '2024-04-17T09:00',
//         end: '2024-04-17T12:00',
//         details: 'Masterclass on digital marketing for health and finance.',
//         location: 'Charlotte Convention Center, Charlotte, NC',
//         image: '/images/event6.png'
//     }
// ];

// module.exports = events;