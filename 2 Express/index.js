const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
const port=8000

app.get('/users', (req, res) => {
  const user = [
    { name: 'Rahul', city :'Bhopal',age:33},
    { name:'Ravi',city:'Patna', age:22},
  ];
  res.send(user);
});
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
