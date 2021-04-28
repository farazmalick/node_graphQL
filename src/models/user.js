const mongoose= require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('../models/task')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,  
    },
    email:
    {
        type:String,
        reuired:true,
        trim:true,
        lowercase:true     
    },
    password:
    {
        type:String,
        required:true,
        trim:true,
        minLength:7
    },
    age:
    {
        type:Number,
        default:0
    
    },
    tokens:
    [
        {
            token:
            {
                type:String
            }
        }
    ]

},{timestamps:true})

userSchema.pre('save',async function(next)
{
   
    const user=this
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

userSchema.statics.findByCredidentials= async (email,password)=>
{
    const user=await User.findOne({email})
    //console.log(password)
    if(!user)
    {
        throw new Error('invalid username')
    } 
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error('invalid username./password')
    }
    return user

}

userSchema.methods.generateJWT=async function( )
{
    const user=this
    const token=await jwt.sign({_id:user._id.toString()},'jwtsecret')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}

userSchema.methods.toJSON=function()
{
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'user_id'
})

const User= mongoose.model('User',userSchema)


module.exports=User
