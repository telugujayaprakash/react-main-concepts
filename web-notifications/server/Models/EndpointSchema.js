const mongoose = require('mongoose');

const EndpointSchema = new mongoose.Schema({
    endpoint: {
        type: Object,
    }
}, { timestamps: true });

const Endpoint = mongoose.model('Endpoint', EndpointSchema);
module.exports = Endpoint;
