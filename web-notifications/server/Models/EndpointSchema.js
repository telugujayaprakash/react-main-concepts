const mongoose = require('mongoose');

const EndpointSchema = new mongoose.Schema({
    endpoint: {
        type: Object,
    }
});

const Endpoint = mongoose.model('Endpoint', EndpointSchema);
module.exports = Endpoint;
