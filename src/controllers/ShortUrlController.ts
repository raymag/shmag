const ShortUrl = require('../models/ShortUrl');

const yup = require('yup');
const { nanoid } = require('nanoid');

const newUrlSchema = yup.object().shape({
    slug: yup.string().trim().matches(/^[\w\-]+$/i),
    url: yup.string().trim().url().required()
});

const hello = (req, res) => {
    res.send('SHMAG shortening URLs for you since 2020 ;)');
}

const redirect = async (req, res) => {
    const {id:slug} = req.params;
    try {
        const url = await ShortUrl.findOne({slug});
        if (url) {
            return res.redirect(url.url);
        } else {
            return res.status(404).send({message:'invalid url'});
        }
    } catch(error) {
        return res.status(404).send({message:'invalid url'});
    }
}

const store = async (req, res, next) => {
    let { slug, url } = req.body;
    try {
        await newUrlSchema.validate({slug, url});
        if ( url.includes('shmag.') ) {
            throw new Error('Invalid url');
        }
        if (!slug) {
            slug = nanoid(5);
        } else {
            const existing = ShortUrl.findOne({slug});
            if (existing) {
                throw new Error('Slug already in use');
            }
        }
        slug = slug.toLowerCase();
        const newUrl = {slug, url};
        const created = await ShortUrl.create(newUrl);
        res.json(created);
    } catch (error) {
        next(error);
    }
}

module.exports = { store, redirect, hello }