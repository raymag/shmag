const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const yup = require('yup');
const monk = require('monk');
const { nanoid } = require('nanoid');

require('dotenv').config();

const db = monk(process.env.MONGODB_URI);
const urls = db.get('urls');
urls.createIndex({ slug: 1 }, { unique: true });

const app = express();
app.enable('trust proxy');

app.use(helmet());
app.use(morgan('common'));
app.use(express.json())
app.use(express.static('./public'))

const notFoundPath = path.join(__dirname, 'public/404.html');

const schema = yup.object().shape({
    slug: yup.string().trim().matches(/^[\w\-]+$/i),
    url: yup.string().trim().url().required()
});

app.get('/', (req, res) => {
    res.send('SHMAG shortning links for you!');
});

app.get('/:id', async (req, res, next) => {
    const { id: slug } = req.params;
    try {
        const url = await urls.findOne({ slug });
        if (url){
            return res.redirect(url.url);
        }else {
            return res.status(404).sendFile(notFoundPath);
        }
    } catch (error) {
        return res.status(404).sendFile(notFoundPath);
    }
});

app.post('/url', async (req, res, next) => {
    let { slug, url } = req.body;
    try {
        await schema.validate({slug, url});
        if ( url.includes('rmag.tk') ) {
            throw new Error('Don\'t.');
        }
        if (!slug) {
            slug = nanoid(5);
        } else {
            const existing = await urls.findOne({ slug });
            if ( existing ) {
                throw new Error('Slug already in use.');
            }
        }
        slug = slug.toLowerCase();
        const newUrl = { url, slug };
        const created = await urls.insert( newUrl );
        res.json( created );
    } catch (error) {
        next(error);
    }
});

app.use((req, res, next) => {
    res.status(404).sendFile(notFoundPath);
});

app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status);
    } else {
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? ':o' : error.stack
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
})