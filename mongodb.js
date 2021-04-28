const mongodb= require('mongodb')
const {MongoClient}=mongodb

const url='mongodb://127.0.0.1:27017'
const database='task-practice'


MongoClient.connect(url,{'useUnifiedTopology':true},(error,client)=>{
    if(error)
    {
        console.log(error)
    }
    console.log('connected')
    const db =client.db(database)
    // db.collection('user').insertOne({'name':'malik',age:12}).then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{console.log})


// db.collection('user').insertMany([{'name':'ali',age:15},{'name':'ali',age:15}])
// .then((res)=>{console.log(res)})
// .catch((err)=>{console.log})

// db.collection('user').updateOne({'name':'ali'},{$set:{'age':24}})
// .then((res)=>{console.log(res)})
// .catch((err)=>console.log(err))

// db.collection('user').updateMany({'name':'ali'},{$set:{'age':24}}).then((res)=>console.log(res))
// .catch((err)=>{console.log(err)})

// db.collection('user').findOne({'age':24}).then((res)=>console.log(res))
// .catch((err)=>{console.log(err)})

// db.collection('user').find({'age':24}).toArray().then((res)=>console.log(res))
// .catch((err)=>{console.log(err)})

// db.collection('user').deleteOne({'age':15}).then((res)=>console.log(res))
// .catch((err)=>{console.log(err)})

// db.collection('user').deleteMany({'age':24}).then((res)=>console.log(res))
// .catch((err)=>{console.log(err)})



})

