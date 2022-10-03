const express = require("express");
const axios = require("axios");
const bodyparser = require("body-parser");
const { reset } = require("nodemon");

const app = express();

app.use(express.static("public"));
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/shows/:topic", (req, res) => {
  const name = req.params.topic;

  const url = "https://api.tvmaze.com/search/shows?" + "q=" + name;
  axios.get(url).then((response) => {
    const d = response.data;
    const result = d.filter((x) => x.show.name === name);

    result.map((x) => {
      const showName = x.show.name;
      const genre = x.show.genres;
      const image = x.show.image.original;
      const rating = x.show.rating.average;
      const summary = x.show.summary;
      const withoutTag = summary.replace(/(<([^>]+)>)/gi, "");
      const language = x.show.language;
      const netFlix = x.show.officialSite;

      options = {
        showName,
        genre,
        image,
        rating,
        summary: withoutTag,
        language,
        netFlix,
      };

      res.render("response", options);
    });
  });
});

app.post("/", (req, res) => {
  const showName = req.body.show;

  url = "https://api.tvmaze.com/search/shows?" + "q=" + showName;

  axios
    .get(url)

    // .then((response) => {
    //   const sName = response.data[0].show.name;
    //   const genre = response.data[0].show.genres;
    //   const image = response.data[0].show.image.original;
    //   const rating = response.data[0].show.rating.average;
    //   const summary = response.data[0].show.summary;
    //   const withoutTag = summary.replace(/(<([^>]+)>)/gi, "");
    //   const lang = response.data[0].show.language;
    //   const nFlix = response.data[0].show.officialSite;

    //   // res.write(`<h1>Show Name:-${sName}</h1>`);
    //   // res.write(`<h2>Genre:-${genre}</h2>`);
    //   // res.write(`<p>Rating:${rating}</p>`);
    //   // res.write(`<img src ="${image}">`);
    //   // res.send();

    //   options = {
    //     showName: sName,
    //     genre: genre,
    //     image: image,
    //     rating: rating,
    //     summary: withoutTag,
    //     language: lang,
    //     netFlix: nFlix,
    //   };

    //   res.render("response", options);
    // })

    .then((response) => {
      const d = response.data;

      // for ([i, x] of d.entries()) {
      //   if (x.show.image === null) {
      //     continue;
      //   }

      //   console.log(i, x.show.image.medium);
      // }

      const result = d.filter((x) => x.show.image !== null);

      res.render("test", {
        response: result,
      });
    })

    .catch((e) => {
      console.log(`error ${e}`);
    });
});

app.post("/response", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server started on port 3000");
});
