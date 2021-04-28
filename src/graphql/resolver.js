const { parseType, parseValue } = require('graphql')
const Task = require('../models/task')
const { findOne } = require('../models/user')
const User=require('../models/user')

const mongoose=require('mongoose')
module.exports={
    // hell(){
    //     return {
    //         text:'hello',
    //         val:123
    //     }
    // }


    createUser:async function({userInput}, req)
    {
        //{userInput} or
        //const data=args.userInput
        const isExist= await User.findOne({email:userInput.email})
        if(isExist)
        {
            const error=new Error('use another email')
            error.code=400
            return error
        }

        const user=new User({
            name:userInput.name,
            email:userInput.email,
            password:userInput.password
        }) 
        const token=await user.generateJWT()
        await user.save()

        return({_id:user._id.toString(),name:user.name,email:user.email,token})

    },

    createTask:async function({taskInput},req)
    {
        
        if(!req.isAuth)
        {
            const error=new Error('unauthorized')
            error.code=401
            throw error
        }
    
            
            const task=new Task({
                desc:taskInput.desc,
                completed:taskInput.completed,
                user_id:req.user._id
            })
            await task.save()
            return({_id:task._id.toString(),desc:task.desc,completed:task.completed})
    },

    getTask: async function({taskQueryInput},req)
    {  
        
        if(!req.isAuth)
        {
            const error=new Error('unauthorized')
            error.code=401
            throw error
        }

        const task=await Task.findOne({_id:taskQueryInput._id,user_id:req.user._id})
        if(!task)
        {
            const error=new Error('not found')
            error.code=404
            throw error
        }

        return({_id:task._id.toString(),desc:task.desc,completed:task.completed})
    },
    getTasks: async function(args,req)
    {  
        
        if(!req.isAuth)
        {
            const error=new Error('unauthorized')
            error.code=401
            throw error
        }

        const tasks=await Task.find({user_id:req.user._id})
        if(!tasks)
        {
            const error=new Error('not found')
            error.code=404
            throw error
        }
        

        return(tasks)
            
    },
    deleteTask:async function({id},req)
    {
        
        if(!req.isAuth)
        {
            const error=new Error('unauthorized')
            error.code=401
            throw error
        }
        console.log(id)
        const task=await Task.findOneAndDelete({_id:id,user_id:req.user._id})
        if(!task)
        {
            const error=new Error('nothing available')
            error.code=500
            throw error
        }
        
        return({_id:task._id.toString(),desc:task.desc,completed:task.completed})
    },
    updateTask:async function({id,taskInput},req)
    {
        
        if(!req.isAuth)
        {
            const error=new Error('unauthorized')
            error.code=401
            throw error
        }

        const task=await Task.findOne({_id:id,user_id:req.user._id})
        if(!task)
        {
            const error=new Error('nothing available')
            error.code=404
            throw error
        }
        task.desc=taskInput.desc
        task.completed=taskInput.completed
        await task.save()
        return({_id:task._id.toString(),desc:task.desc,completed:task.completed})
    },
    login: async function({email,password},req)
    {
        const user= await User.findByCredidentials(email,password)
        //console.log(user)
        if(!user)
        {
            const error=new Error('bad crededentials')
            error.code=400
            throw error
        }
        const token=await user.generateJWT()
        return({_id:user._id.toString(),name:user.name,email:user.email,token:token})
    },
    logoutAll:async function(args,req)
    {
        if(!req.isAuth)
        {
            const error=new Error('unauthorized')
            error.code=401
            throw error
        }
        req.user.tokens=[]
        await req.user.save()
        return({_id:req.user._id.toString()})

    },
    logout:async function(args,req)
    {
        if(!req.isAuth)
        {
            const error=new Error('unauthorized')
            error.code=401
            throw error
        }
        req.user.tokens=req.user.tokens.filter((token)=>token.token!=req.token)
        await req.user.save()
        return({_id:req.user._id.toString()})

    },
    updateProfile:async function({userInput}, req)
    {
        if(!req.isAuth)
        {
            const error=new Error('unauthorized')
            error.code=401
            throw error
        }
        // const isMatch= await bcrypt.compare(userInput.password,req.user.password)
        //     if(!isMatch)
        //     {
        //         throw new Error('invalid username./password')
        //     }
            if(userInput.name)
            {
                req.user.name=userInput.name 
            }
            if(userInput.email)
            {
                req.user.email=userInput.email   
            }
            if(userInput.password)
            {
                req.user.password=userInput.password
            }

        // req.user.name=userInput.name,
        // req.user.email=userInput.email,
        // req.user.password=userInput.password 
        await req.user.save()
        
        return({_id:req.user._id.toString(),name:req.user.name,email:req.user.email})

    }
}
