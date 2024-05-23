const asyncHandler = require('express-async-handler');
const Msg = require('../models/msgmodel');

const addMsg = asyncHandler(
    async(req,res)=>{
        const {text, link_id, expiresAt} = req.body;

        if(!text || !link_id || !expiresAt){
            res.status(400).send({filled:false});
        }
        
        const linkExists = await Msg.findOne({link_id:link_id});
        if(linkExists){
            res.status(400).send({exists:true, filled:true})
            return;
        }

        const expirationDate = new Date(Date.now() + expiresAt);
        const newMessage = await Msg.create({
            text,
            link_id,
            expiresAt:expirationDate
        });

        if(newMessage){
            res.status(200).json(newMessage);
        }
        else{
            res.status(400);
            throw new Error("Error while adding the Message.");
        }
    }
);

const getMsg = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const linkExists = await Msg.findOne({link_id:id});
    if(!linkExists){
        res.status(400).send({invalid:true});
        return;
    }
    res.status(200).send({linkExists,invalid:false});
})

module.exports = {addMsg, getMsg} ;