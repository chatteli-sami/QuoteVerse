import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name required!"],
        },
        lastName: {
            type: String,
            required: [true, "Last Name required!"],
        },
        email: {
            type: String,
            required: [true, "Email required!"],
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Invalid Email!"
            }
        },

        profileImageUrl: {
            type: String,
            required: [true, "Profile Image required!"],
        },
        password: {
            type: String,
            required: [true, "Password required!"],
            minlength: [8, "Password must be 8 characters or longer"]
        },
        likedQuotes: [{
            type: Schema.Types.ObjectId,
            ref: 'Quote'
        }],
    },{timestamps: true}
)

// ! Define a 'confirmPassword' field that won't be saved in the database!
UserSchema.virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });


// ! Add a custom validation method to make sure the passwords match!
UserSchema.pre('validate', function(next) {
    if (this.password !== this._confirmPassword)
        this.invalidate("confirmPassword" , "Passwords must match!");

    next();
});

// ! Makes sure the password is hashed before being saved in the database!
UserSchema.pre('save' , function(next){
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
})

const User = model('User', UserSchema);

export default User;