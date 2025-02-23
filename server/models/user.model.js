import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        // required: true
        required: [true,"Email is required"],
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address",
        ],
    },
    password: {
        type: String,
        // required: true
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        // validate: {
        //   validator: function (value) {
            // return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        //   },
        //   message:
            // "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        // },
      },
})

const user = mongoose.model('user',userSchema);
export default user;