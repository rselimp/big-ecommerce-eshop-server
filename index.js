
const express =require('express')
const cors = require('cors')
const app = express();
const port = process.env.PORT ||5000
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId, MongoAWSError } = require('mongodb');

app.use(cors())
app.use(express.json())


const products = require('./data/products.json')
const anyProducts = require('./data/anyproducts.json')



const uri = "mongodb+srv://big_esupershop:vgN5haDDhPXEO4PM@cluster0.rrnpcbx.mongodb.net/?retryWrites=true&w=majority";
//console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{

    const productsCollection = client.db('big-esupershop').collection('products')
    const orderCollection = client.db('big-esupershop').collection('orders')
    
      app.get('/products', async(req,res) =>{
        const query ={}
        const products= await productsCollection.find(query).toArray();
        res.send(products)
    })

        app.get('/chairProducts', async(req,res) =>{
            const query ={}
            const chairProducts = await productsCollection.find(query).toArray();
            const filterProducts = chairProducts.filter((item) =>item.category ==='chair')
            res.send(filterProducts)
        })
        
        app.get('/sofaProducts', async(req,res) =>{
            const query ={}
            const sofaProducts = await productsCollection.find(query).toArray()
            const fiterProducts = sofaProducts.filter((item) =>item.category ==='sofa')
            res.send(fiterProducts)
        })

        app.get('/mobileProducts', async(req,res) =>{
            const query ={}
            const mobileProducts = await productsCollection.find(query).toArray();
            const filterProducts = mobileProducts.filter((item) =>item.category ==='mobile')
            res.send(filterProducts)
        })

        app.get('/allProducts', async(req,res) =>{
            const query ={}
            const allProducts = await productsCollection.find(query).toArray()
            const filterProducts = allProducts.filter((item) =>item.stock ==='all')
            res.send(filterProducts)
           
        })

        app.get('/products/:id', async(req, res) =>{
            const id= req.params.id;
            const query = { _id:ObjectId(id)}
            const result =  await productsCollection.findOne(query)
            res.send(result)
        })

        //orders api

        app.get('/allorders', async(req,res) =>{
            let query ={};
            if(req.query.email){
                query={
                    email: req.query.email
                }
            }
            const orders =  await orderCollection.find(query).toArray()
            res.send(orders)

        })  

       app.post('/orders', async(req,res) =>{
        const order = req.body;
        const result = await orderCollection.insertOne(order)
        res.send(result)
       })
       
       app.post ('/products', async(req,res) =>{
        const product = req.body;
        const result = await productsCollection.insertOne(product)
        res.send(result)
       })




            // const query ={}
            // const products= await productsCollection.find(query).toArray();
            // res.send(products)
    



        
  


    }
    finally{

    }

}
run().catch(console.log)


app.get('/', (req, res ) =>{
    res.send('big esupershop is running')
})

app.get('/products', (req,res) =>{
    res.send(products);
})

app.get('/anyProducts', (req,res) =>{
    res.send(anyProducts)
})

app.get('/anyProducts/:id', (req, res) =>{
    const id = req.params.id;
    const anyProduct = anyProducts.find(p =>p.id ===id)
    res.send(anyProduct)
})

app.get('/products/:id' ,(req, res) =>{
    const id = req.params.id;
    const product = products.find(p =>p.id ===id)
    req.send(product)

})

app.listen(port, () =>{
    console.log(`big esupershop is running on ${port}`)
})  