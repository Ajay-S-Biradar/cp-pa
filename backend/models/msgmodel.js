const mongoose = require('mongoose');

const msgModel = new mongoose.Schema(
    {
        text:{
            type:String,
            required:true,
        },
        link_id:{
            type:String,
            required:true
        },
        expiresAt: {
            type: Date,
            required: true
        }
    }
)
msgModel.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Msg = mongoose.model('Msg',msgModel);

module.exports = Msg;