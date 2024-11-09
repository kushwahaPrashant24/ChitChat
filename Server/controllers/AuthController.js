import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { renameSync, unlinkSync} from  "fs";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};

export const signup = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("Email and Password is required");
    }
    const user = await User.create({ email, password });
    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};


export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("Email and Password is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).send("User with given email and Password is not found");
    }

    const auth = await compare (password, user.password);
    if(!auth) {
      return response.status(400).send("Password is incorrect");
    }

    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (request, response, next) => {
  try {
   console.log(request.userId);
     const userData = await User.findById(request.userId);
     if(!userData) {
      return response.status(404).send("User with given id is not found");
     }
    return response.status(200).json({
     
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
      
    }); 
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

export const updateProfle = async (request, response, next) => {
  try {
    const { userId } = request;
     const {firstName, lastName, color} = request.body;
   
     
     if(!firstName || !lastName ) {
      return response.status(400).send("First Name , Laat Name, and Color Sould be required");
     }

     const userData = await  User.findByIdAndUpdate(userId, {
      firstName,lastName,color,profileSetup:true
     }, {new:true, runValidators:true });


    return response.status(200).json({
     
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
      
    }); 
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};



export const addProfileImage = async (request, response, next) => {
  try {
    // Check if file exists in the request
    if (!request.file) {
      return response.status(400).send("File is required");
    }

    // Get the original filename and create a new path for it
    const date = Date.now();
    const fileName = `uploads/profiles_${date}_${request.file.originalname}`; // Corrected `originalname`
    
    // Move the file from the temp path to the new path
    renameSync(request.file.path, fileName);

    // Update user document with new file path
    const updatedUser = await User.findByIdAndUpdate(
      request.userId,
      { image: fileName },
      { new: true, runValidators: true }
    );

    // Send response with updated image path
    return response.status(200).json({
      image: updatedUser.image,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};



export const removeProfileImage = async (request, response, next) => {
  try {
    const { userId } = request;
     const {firstName, lastName, color} = request.body;
   
     
     if(!firstName || !lastName ) {
      return response.status(400).send("First Name , Laat Name, and Color Sould be required");
     }

     const userData = await  User.findByIdAndUpdate(userId, {
      firstName,lastName,color,profileSetup:true
     }, {new:true, runValidators:true });


    return response.status(200).json({
     
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
      
    }); 
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};