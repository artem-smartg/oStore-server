require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models')
const PORT = process.env.PORT || 5000;
const cors = require('cors')
const fileUpLoad = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const __dirname2 = path.resolve()

const app = express();
app.use(cors())
app.use(express.json())


// app.use(fileUpLoad({}))


app.use('/static', express.static('static'));
app.use('/api/uploads', express.static(path.join(__dirname2, '/static/')))
app.use('/api', router)

// handling error last middleware
app.use(errorHandler)


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server start at port ${PORT}`))
    }
    catch(e){
        console.log(e)
    }
}
start()










