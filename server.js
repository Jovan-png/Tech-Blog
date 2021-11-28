const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path');
const sequelize = require('./config/connection');
const routes = require('./routes')
const app = express();
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create({})


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

app.use(routes);

sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, ()=> console.log('SERVER RUNNING'))
})
