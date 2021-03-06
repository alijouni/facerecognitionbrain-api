const handleRegister = (req, res,db,bcrypt) => {
    
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect Form Submission')
    }

    db.select('email').from('users').where('email'=email)
    .then(result =>{
        if(result.length!==0){
            return res.status(400).json('Email found');
        }
        else {return console.log('Email not found')}
    })
        
    
    const hash=bcrypt.hashSync(password);

    db.transaction(trx =>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            trx('users')
            .returning('*')
            .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()

            })
            .then(user => {
                res.json(user[0]);   
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
  
    .catch(err => res.status(400).json('Unable to register'))
   
}

export default handleRegister;