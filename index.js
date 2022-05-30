import * as path from 'path';
import * as url from 'url';
import express from 'express';

const port = 10404;
const dirnameDist = path.join(url.fileURLToPath(import.meta.url), '..', 'dist');

// eslint-disable-next-line new-cap
const app = new express();

app.use(express.static(`${dirnameDist}/`));

app.get('/', (req, res) => {
    console.log('request revieved!');
    res.sendFile(`${dirnameDist}/index.html`);
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${port}`);
});
