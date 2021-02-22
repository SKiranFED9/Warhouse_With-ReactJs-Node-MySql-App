const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
  });

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'warehouseProducts'
    // database: 'employeesystem'
});


// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.post('/create', (req, res) => {
    const product_name = req.body.product_name;
    const product_description = req.body.product_description;
    db.query('INSERT INTO products (product_name, product_description) VALUES (?, ?)', 
    [product_name, product_description], (err, result) => {
        if(err){
            console.log(err);
        }else {
            res.send("product data Inserted");
        }
    }
    );
    // const name = req.body.name;
    // const age = req.body.age;
    // const country = req.body.country;
    // const position = req.body.position;
    // const wage = req.body.wage;

    // db.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)', 
    // [name, age, country, position, wage], (err, result) => {
    //     if(err){
    //         console.log(err);
    //     }else {
    //         res.send("values Inserted");
    //     }
    // }
    // );

});

app.get("/products", (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
            if(err){
                console.log(err);
            }else {
                res.send(result);
            }
        }
    );

});

app.put("/product_update", (res, req) =>{
    const product_id = req.body.product_id;
    console.log(product_id);
    const product_name = req.body.product_name;
    const sqlUpdate = "UPDATE products SET product_name = ? WHERE product_id = ?";
    // `name`=[value-2],`age`=[value-3],`country`=[value-4],`position`=[value-5],`wage`=[value-6]
    // const config = { headers: {'Content-Type': 'application/json'} }; 
    db.query(sqlUpdate, [product_name, product_id], (err, result) =>{
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.delete("/product_delete/:product_id", (req, res) => {
    const product_id = req.params.product_id;
    console.log(product_id);
    db.query("DELETE FROM products WHERE product_id = ?", product_id, (err, result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

// app.get("/employees", (req, res) => {
//     db.query('SELECT * FROM employees', (err, result) => {
//             if(err){
//                 console.log(err);
//             }else {
//                 res.send(result);
//             }
//         }
//     );

// });

// app.put("/update", (res, req) =>{
//     const id = req.body.id;
//     console.log(id);
//     const wage = req.body.wage;
//     const sqlUpdate = "UPDATE employees SET wage = ? WHERE id = ?";
//     // `name`=[value-2],`age`=[value-3],`country`=[value-4],`position`=[value-5],`wage`=[value-6]
//     // const config = { headers: {'Content-Type': 'application/json'} }; 
//     db.query(sqlUpdate, [wage, id], (err, result) =>{
//         if(err){
//             console.log(err);
//         }else {
//             res.send(result);
//         }
//     });

// });

// app.delete("/delete/:id", (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
//         if(err){
//             console.log(err);
//         }else {
//             res.send(result);
//         }
//     });
// });

app.listen(3001, () => {
    console.log("server running");
});
