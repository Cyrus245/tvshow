const express = require('express');
const axios = require('axios');
const bodyparser = require('body-parser');

const app = express();


app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');


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
            const image = response.data[0].show.image.original;
            const rating = response.data[0].show.rating.average;
            const summary = response.data[0].show.summary;
            const withoutTag = summary.replace(/(<([^>]+)>)/gi, "");



            // res.write(`<h1>Show Name:-${sName}</h1>`);
            // res.write(`<h2>Genre:-${genre}</h2>`);
            // res.write(`<p>Rating:${rating}</p>`);
            // res.write(`<img src ="${image}">`);
            // res.send();

            options = {

                showName: sName,
                genre: genre,
                image: image,
                rating: rating,
                summary: withoutTag,

            }


            res.render('response', options)


        })


        .catch(e => {

            console.log(`error ${e}`);
        })




})


app.post("/response", (req, res) => {

    res.redirect("/")

})

app.listen(process.env.PORT || 3000, () => {

    console.log("server started on port 3000");



})