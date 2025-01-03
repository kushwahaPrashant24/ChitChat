import User from "../models/UserModel.js";
import Channel from "../models/ChannelModel.js";

export const createChannel = async (request, response, next) => {
    try {
      const { name ,members} = request.body;
      const userId = request.userId;

      const admin = await User.findById(userId);
      if(!admin){
        return response.status(404).send("User not found");
      }

      const validMembers = await User.find({_id: {$in: members}});


      if(validMembers.length !== members.length){
        return response.status(400).send("Invalid Members");
      }

      const newChannel = new Channel({
        name,
        members,
        admin: userId,
       
      });

      await newChannel.save();
        return response.status(201).json({channel: newChannel});
   
    } catch (error) {
      console.log({ error });
      return response.status(500).send("Internal Server Error");
    }
  };