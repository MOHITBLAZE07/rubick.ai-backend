const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Products = require('./model/Products');
require('./helper');

app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/products', async( req, res ) => {
    const limit = 5;
    const {page} = req.query;
    const data = await Products.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Products.countDocuments();

    res.send({data, totalPages: Math.ceil(count / limit)});
})

app.post('/products',async(req,res)=>{
    const { code,name,quantity,price,status } = req.body;
    // console.log(req.body)
    const product = new Products({
        code: code,
        name : name,
        quantity : quantity,
        price :price,
        status : status, 
    })
    try{
        // check if product already exist
        const item = await Products.exists({code:code});
        if(item){
            res.status(200).send({message:"present"})
            return;
        }
        // if the product doesn't exist, insert into the database
        await product.save()
        res.status(201).send({message : "ok"})
    }catch(err){
        console.log(err);
        res.send({message:"error",err})
    } 
})

app.listen(4000, ()=>{console.log("server listening to 4000 port!")})