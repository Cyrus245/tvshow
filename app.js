const express = require('express');
const axios = require('axios');
const bodyparser = require('body-parser');

const app = express();


app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended: true
}));



app.get("/", (req, res) => {



    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {



    const showName = req.body.show;

    url = "https://api.tvmaze.com/search/shows?" + "q=" + showName;




    axios.get(url)

        .then(response => {

            const sName = response.data[0].show.name;
            const genre = response.data[0].show.genres;
            const image = response.data[0].show.image.medium;
            const rating = response.data[0].show.rating.average;


            res.write(`<h1>Show Name:-${sName}</h1>`);
            res.write(`<h2>Genre:-${genre}</h2>`);
            res.write(`<p>Rating:${rating}</p>`);
            res.write(`<img src ="${image}">`);
            res.send();


        })
        .catch(e => {

            console.log(`error ${e}`);
        })




})

app.listen(3000, () => {


    console.log(`server started on port 3000`);
})