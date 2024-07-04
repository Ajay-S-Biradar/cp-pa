const asyncHandler = require('express-async-handler');
const Msg = require('../models/msgmodel');

const addMsg = asyncHandler(
    async(req,res)=>{
        const {text, link_id, expiresAt} = req.body;

        if(!text || !link_id || !expiresAt){
            res.send({filled:false});
        }
        
        const linkExists = await Msg.findOne({link_id:link_id});
        if(linkExists){
            res.send({exists:true, filled:true})
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
        res.send({invalid:true});
        return;
    }
    res.status(200).send({linkExists,invalid:false});
})

const updateMsg = asyncHandler(async (req,res)=>{
    const {text, expiresAt} = req?.body;
    const {id} = req.params;

    console.log(id);

    if(!text || !id || !expiresAt){
        res.send({filled:false});
    }

    const expirationDate = new Date(Date.now() + expiresAt);

    const UpdateLink = await Msg.updateOne({link_id:id},{
        text,
        link_id:id,
        expiresAt:expirationDate
    });
    if(UpdateLink){
        res.send({Update:"Success",UpdateLink});
    }
    else{
        res.send({Error:"Database didnt get updated"})
    }
})

const deleteMsg = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const deletion = await Msg.deleteOne({link_id:id});
    if(deletion){
        res.send({delete:"success"});
    }
    else{
        res.send({Error:"unable to delete"});
    }
});

module.exports = {addMsg, getMsg, updateMsg, deleteMsg} ;