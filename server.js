const express = require('express');
const cors = require('cors');

const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send(`
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>API</title>
                <style>
                    body {
                        margin: 0;
                        background-color: black;
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh; /* Use viewport height */
                        font-family: Arial, Helvetica, sans-serif;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div>
                    <h1>Welcome to the API Portal</h1>
                    <p>This is a placeholder page for your API interface.</p>
                </div>
            </body>
            </html>

        `);
});

app.listen(puerto,() => {
    console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});