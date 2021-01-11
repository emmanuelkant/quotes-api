const { createService } = require('./quote-service.js');

const app = createService();

app.listen(3000);
