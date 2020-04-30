// Create express app
var express = require("express");
var app = express();
const DBTemp = require('./js/DBTemp')
const UserDao = require('./js/dao/Usuario')
const CustomerDao = require('./js/dao/Cliente')
const MoveDao = require('./js/dao/Movimiento')

// Server port
var HTTP_PORT = 3000;


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});


// Admin Users
app.get("/user", (req, res, next) => {
    const dao = new DBTemp('./database.sqlite3')
    const user = new UserDao(dao)

    user.getAll().then((data) => {
        console.log(data)
        res.json(data);
    }).catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    })
});

app.get("/user/:name", (req, res, next) => {
    const dao = new DBTemp('./database.sqlite3')
    const user = new UserDao(dao)

    if (!req.params.name) {
        es.status(400).json({ "error": "Nombre no informado" });
        return;
    }
    user.getByName(req.params.name).then((data) => {
        if (!data) {
            res.status(400).json({ "error": "No Existe usuario con ese nombre" });
            throw new Error('No Existe Usuario');
        }
        res.json(data);
    }).catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    })
});

app.post("/user", (req, res, next) => {
    console.log("Se agregara un usuario")
    var errors = []
    console.log("Usuario: " + req.body.userName);
    if (!req.body.userName) {
        errors.push("No name specified");
    }
    console.log("Usuario: " + req.body.password);
    if (!req.body.password) {
        errors.push("No password specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    const dao = new DBTemp('./database.sqlite3')
    const user = new UserDao(dao)
    user.getByName(req.body.userName).then((data) => {
        console.log(data)
        if (data) {
            res.status(400).json({ "error": "Nombre de Usuario Existente" });
            throw new Error('Nombre de Usuario Existente');
        }
    }).then(() => user.insert(req.body.userName, req.body.password).then((data) => {
        console.log(data)
        res.json(data);
    }).catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    }))
});

app.delete("/user/:id", (req, res, next) => {
    if (!req.params.id) {
        es.status(400).json({ "error": "ID No informado" });
        return;
    }

    const dao = new DBTemp('./database.sqlite3')
    const user = new UserDao(dao)

    user.delete(req.params.id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    })

});


//Metodos para los movimientos
app.get("/moves/:customerid", (req, res, next) => {
    const dao = new DBTemp('./database.sqlite3')
    const move = new MoveDao(dao)

    if (!req.params.customerid) {
        es.status(400).json({ "error": "Nombre no informado" });
        return;
    }
    move.getByCustomer(req.params.customer).then((data) => {
        if (!data) {
            res.status(400).json({ "error": "No Existen movimientos para Usuario" });
            throw new Error('No Existen movimientos para Usuario');
        }
        res.json(data);
    }).catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    })
});

app.post("/moves/:customerid", (req, res, next) => {
    console.log("Se agregara un cliente")
    var errors = []
    if (!req.params.customerid) {
        errors.push("No name specified");
    }
    if (!req.body.name) {
        errors.push("No last name specified");
    }
    if (!req.body.description) {
        errors.push("No last direccion specified");
    }
    if (!req.body.import) {
        errors.push("No last email specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    const dao = new DBTemp('./database.sqlite3')
    const move = new MoveDao(dao)
    move.insert(req.params.customerid, req.body.description, req.body.import, req.params.customerid).then((data) => {
        console.log(data)
        res.json(data);
    }).catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    })
});

app.post("/moves/:customerid", (req, res, next) => {
    var errors = []
    if (!req.params.customerid) {
        errors.push("No name specified");
    }
    if (!req.body.name) {
        errors.push("No last name specified");
    }
    if (!req.body.description) {
        errors.push("No last direccion specified");
    }
    if (!req.body.import) {
        errors.push("No last email specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    const dao = new DBTemp('./database.sqlite3')
    const move = new MoveDao(dao)
    move.insert(req.params.customerid, req.body.description, req.body.import, req.params.customerid).then((data) => {
        console.log(data)
        res.json(data);
    }).catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    })
});

app.get("/moves/:id", (req, res, next) => {
    if (!req.params.id) {
        es.status(400).json({ "error": "ID No informado" });
        return;
    }
    const dao = new DBTemp('./database.sqlite3')
    const move = new MoveDao(dao)

    move.findById(req.params.id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    })
});

app.patch("/moves/:id", (req, res, next) => {
    var errors = []
    if (!req.params.customerid) {
        errors.push("No name specified");
    }
    if (!req.body.name) {
        errors.push("No last name specified");
    }
    if (!req.body.description) {
        errors.push("No last direccion specified");
    }
    if (!req.body.import) {
        errors.push("No last email specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    const dao = new DBTemp('./database.sqlite3')
    const move = new MoveDao(dao)
    move.update(req.params.customerid, req.body.description, req.body.import, req.params.customerid).then((data) => {
        console.log(data)
        res.json(data);
    }).catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    })
});

//Metodos para los Clientes
app.post("/customer", (req, res, next) => {
    console.log("Se agregara un cliente")
    var errors = []
    if (!req.body.name) {
        errors.push("No name specified");
    }
    if (!req.body.lastname) {
        errors.push("No last name specified");
    }
    if (!req.body.direccion) {
        errors.push("No last direccion specified");
    }
    if (!req.body.email) {
        errors.push("No last email specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    const dao = new DBTemp('./database.sqlite3')
    const customer = new CustomerDao(dao)
    customer.findByName(req.body.name).then((data) => {
        console.log(data)
        if (data) {
            res.status(400).json({ "error": "El CLiente Existe Existente" });
            throw new Error('El Cliente Ya existe');
        }
    }).then(() => customer.insert(req.body.name, req.body.lastname, req.body.direccion, req.body.email).then((data) => {
        console.log(data)
        res.json(data);
    }).catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    }))
});

app.get("/customer/:id", (req, res, next) => {
    if (!req.params.id) {
        es.status(400).json({ "error": "ID No informado" });
        return;
    }

    const dao = new DBTemp('./database.sqlite3')
    const customer = new CustomerDao(dao)

    customer.findById(req.params.id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    })

});

app.delete("/customer/:id", (req, res, next) => {
    if (!req.params.id) {
        es.status(400).json({ "error": "ID No informado" });
        return;
    }

    const dao = new DBTemp('./database.sqlite3')
    const customer = new CustomerDao(dao)

    customer.delete(req.params.id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    })

});

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});



function main() {
    const dao = new DBTemp('./database.sqlite3')
    const user = new UserDao(dao)
    const customer = new CustomerDao(dao)
    const moves = new MoveDao(dao)

    user.createTable()
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        })

    customer.createTable()
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        })

    moves.createTable()
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        })
}

main()