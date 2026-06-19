const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const USERNAME = process.env.AUTH_USER || 'admin';
const PASSWORD = process.env.AUTH_PASS || 'password';

app.get('/health', (req, res) => res.send('ok'));

app.use((req, res, next) => {
  const auth = req.headers['authorization'];
  if (auth) {
    const [, encoded] = auth.split(' ');
    const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':');
    if (user === USERNAME && pass === PASSWORD) return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="RPM v2"');
  res.status(401).send('Unauthorised');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Roster Run HiFi v2.html'));
});

app.use(express.static(path.join(__dirname)));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
