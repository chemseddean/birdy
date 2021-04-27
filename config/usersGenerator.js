const axios = require('axios')
const users = [
    {
        "firstName": "Stark",
        "lastName": "Golden",
        "username": "nulla",
        "email": "stark.golden@gmail.com",
        "password": "stark.golden"
    },
    {
        "firstName": "Keisha",
        "lastName": "Whitaker",
        "username": "consequat",
        "email": "keisha.whitaker@gmail.com",
        "password": "keisha.whitaker"
    },
    {
        "firstName": "Flynn",
        "lastName": "Finch",
        "username": "amet",
        "email": "flynn.finch@gmail.com",
        "password": "flynn.finch"
    },
    {
        "firstName": "Stein",
        "lastName": "Ashley",
        "username": "non",
        "email": "stein.ashley@gmail.com",
        "password": "stein.ashley"
    },
    {
        "firstName": "Vang",
        "lastName": "Albert",
        "username": "ea",
        "email": "vang.albert@gmail.com",
        "password": "vang.albert"
    },
    {
        "firstName": "Muriel",
        "lastName": "Small",
        "username": "mollit",
        "email": "muriel.small@gmail.com",
        "password": "muriel.small"
    },
    {
        "firstName": "Burnett",
        "lastName": "Turner",
        "username": "duis",
        "email": "burnett.turner@gmail.com",
        "password": "burnett.turner"
    },
    {
        "firstName": "Lora",
        "lastName": "Powell",
        "username": "occaecat",
        "email": "lora.powell@gmail.com",
        "password": "lora.powell"
    },
    {
        "firstName": "Stacey",
        "lastName": "Bishop",
        "username": "esse",
        "email": "stacey.bishop@gmail.com",
        "password": "stacey.bishop"
    },
    {
        "firstName": "Estelle",
        "lastName": "Ayers",
        "username": "mollit",
        "email": "estelle.ayers@gmail.com",
        "password": "estelle.ayers"
    }
]


const profiles = [
    {
        "username": "anes",
        "location": " Martell, Michigan ",
        "status": "L2",
        "intrests": "adipisicing commodo culpa",
        "bio": "excepteur incididunt sit nulla ex laborum ut"
    },
    {
        "username": "anes",
        "location": " Alfarata, Missouri ",
        "status": "L1",
        "intrests": "aliquip laboris consectetur",
        "bio": "aliqua pariatur reprehenderit tempor id labore anim"
    },
    {
        "username": "anes",
        "location": " Rushford, Tennessee ",
        "status": "L1",
        "intrests": "veniam in nisi",
        "bio": "in aliquip occaecat qui sunt eu anim"
    },
    {
        "username": "anes",
        "location": " Westwood, Washington ",
        "status": "l3",
        "intrests": "in incididunt minim",
        "bio": "officia consequat proident est proident ea culpa"
    },
    {
        "username": "anes",
        "location": " Vaughn, Oregon ",
        "status": "l3",
        "intrests": "non exercitation tempor",
        "bio": "incididunt nostrud exercitation aute consequat Lorem cupidatat"
    },
    {
        "username": "anes",
        "location": " Linganore, Connecticut ",
        "status": "L2",
        "intrests": "nisi reprehenderit deserunt",
        "bio": "cupidatat magna non ex exercitation non duis"
    },
    {
        "username": "anes",
        "location": " Warsaw, Marshall Islands ",
        "status": "L1",
        "intrests": "dolore officia ullamco",
        "bio": "duis quis culpa labore ad ut mollit"
    }
]


function generateUsers() {
    console.log("DEBUT DE CREATION DE USERS")
    let headers =  {
        'Content-Type': 'application/json'
    }
    for (const u of users) {
        axios.post('http://localhost:5000/api/users/register', u, { headers })
        .catch((e) => console.log('probleme axios' + e))
        .then(console.log(u.firstName,'has been created'))
    }
    console.log("FIN CREATION DE USERS")
}


module.exports = generateUsers