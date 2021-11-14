import mongoose from 'mongoose';
const regexForEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Message should be required'],
            minlength: [0, 'Username should be greater than 0 characters'],
            maxlength: [50, 'Username should be less than 15 characters'],
        },
        email: {
            type: String,
            match: [regexForEmail, 'Please fill a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },

        profilePicture: {
            type: String,
        },

        forgetPassHash: {
            type: String,
        },
        emailVerificationHash: {
            type: String,
        },
        forgetPassCreatedAt: {
            type: String,
        },

    },
    { timestamps: true }
);
userSchema.path('email').validate(async (email) => {
    const countUser = await mongoose.models.users.countDocuments({ email });
    return !countUser;
}, 'This email already exist');

userSchema.path('username').validate(async (username) => {
    const countUser = await mongoose.models.users.countDocuments({ username });
    return !countUser;
}, 'This username already exist');

const userModel = mongoose.model('users', userSchema);
export default userModel;
