const app = require('./app');
const {PORT} = require('./db/config');

app.listen(PORT, function () {
  console.log(`App on port ${PORT}!`);
});
