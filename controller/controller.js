const axios = require("axios");

const getHome = (req, res) => {
  res.render("home");
};

const postHome = async (req, res) => {
  const showName = req.body.show;

  url = "https://api.tvmaze.com/search/shows?" + "q=" + showName;

  try {
    response = await axios.get(url);
    const d = response.data;
    const result = d.filter((x) => x.show.image !== null);
    res.render("test", {
      response: result,
    });
  } catch (e) {
    console.log(`error ${e}`);
  }
};

const getShows = async (req, res) => {
  const name = req.params.topic;
  const url = "https://api.tvmaze.com/search/shows?" + "q=" + name;

  try {
    const response = await axios.get(url);
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
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getHome,
  postHome,
  getShows,
};


