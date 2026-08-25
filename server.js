const app = require('./app');
const dotenv = require('dotenv');
//console.log(process.env);
const port = process.env.PORT||3000;

dotenv.config({ path: './config.env'});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});