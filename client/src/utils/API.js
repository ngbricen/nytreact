import axios from "axios";

var queryURL;

export default {
  // Gets all books
  getArticles: function() {
    return axios.get("/api/articles");
  },

  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },

  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },

  // Gets all articles
  searchArticles: function(searchPhrase,startYear,endYear) {
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=2b4651d960804b78b84df443fd1f236b&q=" 
                + searchPhrase;

    if (startYear !== ""){
      queryURL = queryURL + "&begin_date=" + startYear + "0101";
    }

    if (endYear !== ""){
      queryURL = queryURL + "&end_date=" + endYear + "1231";
    }
    return axios.get(queryURL);
  }

};
