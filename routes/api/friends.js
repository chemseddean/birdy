const express = require('express');
const router = express.Router();
const creatLocalSQLDB = require('../../config/sqlDB_manager')
const auth = require('../../middleware/auth');
const db = creatLocalSQLDB()


router.post('/add/:friend',auth, (req,res)=>{
    const username1 = req.user.username
    // console.log(req.user);
    const username2 = req.params.friend
    // console.log("req.parmas.ami :" + req.params.ami)
    const q = `insert into friends (username1,username2) values(?,?)`
    db.run(q,[username1, username2],(err,ok)=>{
        if(err)
            return console.error('errueur adding friend'+err)
        let msg = username1 + "is now friend of " + username2
        res.status(200).send(msg)
    })
})


router.get('/myfriends', auth, async (req, res) => {
    const myusername = req.user.username
    const q = `
    select username2
    from friends 
    where username1 = '${myusername}' 
    
    union 

    select username1
    from friends
    where username2 = '${myusername}'
    `
    // console.log(q);
    console.log('##########1');
    db.get(q,(err, ok) => {
        console.log('##########2');
        if (err)
            return console.error('errueur getting my  friends' + err)
        res.status(200).send(ok)
    })
    console.log('##########2');
})



router.get('/', auth, (req, res) => {
    const q = `select * from friends`
    console.log(req.user);
    // console.log('dans la requette de tous les amis');
    db.get(q, (err, ok) => {
        if (err)
            return console.log('probleme getting friends list');
        res.json(ok)
    })
})


module.exports = router



// select f.u1
// from friends f
// where f.u2 == a

// union

// select f.u2
// from friends f
// where f.u1 == a