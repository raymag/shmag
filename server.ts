const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const yup = require('yup');
const nanoid = require('nanoid');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(morgan('common'));
app.use(express.json())
app.use(express.static('./public'))
app.use(cors());

const schema = yup.object().shape({
    slug: yup.string().trim().matches(/^[\w\-]+$/i),
    url: yup.string().trim().url().required()
});

app.get('/', (req, res) => {
    res.send('Code is Pika')
});

// app.post('/url', async (req, res) => {
//     let { slug, url } = req.body;
//     try {
//         await schema.validate({slug, url});
//         if(url.includes('rmag.tk')){
//             throw new Error('Don\'t.');
//         }
//         if(!slug){
//             slug = nanoid(5);
//         }else{
//             const existing = await.
//         }

//     } catch (error) {
        
//     }
// });



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
})