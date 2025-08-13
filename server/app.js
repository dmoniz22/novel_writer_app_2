const express = require('express');
const cors = require('cors');
const { supabase } = require('./src/config/supabaseConfig');
const MindsDBService = require('./src/api/mindsdbService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize MindsDB service
const mindsdb = new MindsDBService(process.env.MINDSDB_API_KEY);

// API Routes
app.use('/api', require('./src/api/routes')(supabase, mindsdb));

app.listen(PORT, () => {
  console.log(Server, running, on, port,);
});
