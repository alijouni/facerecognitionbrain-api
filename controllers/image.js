import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: "1cf7d49421e1474caa34a9293f3d0592",
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
    .catch(err=>res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
    .catch(err=>res.status(400).json('Unable to get entries'))
    
}
export { handleApiCall, handleImage };