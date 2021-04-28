const {buildSchema}=require('graphql')

module.exports=buildSchema(`
input taskQueryInputData
{
    _id:ID!
}


type user
{
    _id:ID!
    name:String!
    email:String!
    token:String!
}
type Task
{
    _id:ID!
    desc:String!
    completed:Boolean!
    createdAt:String!
    updatedAt:String!

}
input userInputData
{
    
    name:String!
    email:String!
    password:String!
}
input updateUserInputData
{
    
    name:String
    email:String
    password:String
}
type updatedUser
{
    _id:ID!
    name:String!
    email:String!   
    
}

input taskInputData
{
    desc:String!
    completed:Boolean!
    
}
type message
{
    text:String
}
type rootQuery
{
    getTask(taskQueryInput:taskQueryInputData):Task!
    getTasks:[Task!]!
    login(email:String,password:String):user!
    
    
    
    
}
type rootmutation
{
    createUser(userInput:userInputData):user!
    logout:user
    logoutAll:user
    updateProfile(userInput:updateUserInputData):updatedUser!
    createTask(taskInput:taskInputData):Task!
    updateTask(id:ID!,taskInput:taskInputData):Task!
    deleteTask(id:ID!):Task!
}
schema
{   
    query:rootQuery
    mutation:rootmutation
}

`)


