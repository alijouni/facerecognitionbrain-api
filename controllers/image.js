import Clarifai from 'clarifai';
// import {useEffect} from 'react';

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI_KEY,
});

const useEffect = (callback, dependencies) => {
    // Calling it first time since there are no dependency
    if (dependencies === undefined) {
      return callback();
    }
  
    // Creating proxy for setters
    return new Proxy(dependencies, {
      set: function (target, key, value) {
        Reflect.set(target, key, value);
        callback();
      },
    });
  };
useEffect(()=>{const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
            console.log(data);
        })
    .catch(err=>res.status(400).json('Unable to work with API'))
}},[req.body.input])


const handleApiCall64 = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
    .catch(err=>res.status(400).json('Unable to work with API'))
    // useEffect(() => {
        
        
    //     app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    //     .then(data => {
    //         res.json(data);
    //     })
    // .catch(err=>res.status(400).json('Unable to work with API'))
    
    
    
    // }, [req.body.input]);

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
export { handleApiCall, handleImage,handleApiCall64 };