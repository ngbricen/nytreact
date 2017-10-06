import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Panel from "../../components/Panel";

class Articles extends Component {
  state = {
    articles: [],
    savedArticles: [],
    title: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  searchArticles = (title, startYear, endYear) => {    
    API.searchArticles(title, startYear, endYear)
      .then(res => this.setState({ articles: res.data.response.docs, title: "", startYear: "", endYear: "" }))
      .catch(err => console.log(err));
  };

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ savedArticles: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  saveArticle = article => {
    API.saveArticle({
        title: article.headline.main,
        date: article.pub_date,
        url: article.web_url
      })
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      this.searchArticles(this.state.title, this.state.startYear, this.state.endYear);
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-10 md-offset-1">
            <Jumbotron>
              <h1 className="text-center"><i className="fa fa-newspaper-o"></i> New York Times Scrubber</h1>
            </Jumbotron>
            <Panel icon="fa fa-list-alt" heading="Search Parameters">
              <form>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Topic"
                />
                <Input
                  value={this.state.startYear}
                  onChange={this.handleInputChange}
                  name="startYear"
                  placeholder="Start year (Optional)"
                />
                <Input
                  value={this.state.endYear}
                  onChange={this.handleInputChange}
                  name="endYear"
                  placeholder="End Year (Optional)"
                />
                <FormBtn
                  disabled={!this.state.title}
                  onClick={this.handleFormSubmit}
                >
                  Search Articles
                </FormBtn>
              </form>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <Panel icon="fa fa-table" heading="Results">
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <ListItem key={article._id}>
                      <strong><a href={article.web_url} target="_blank" > {article.headline.main}</a> </strong> <i>published on</i> {article.pub_date}
                      <SaveBtn onClick={() => this.saveArticle(article)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <Panel icon="fa fa-floppy-o" heading="Saved Articles">
              {this.state.savedArticles.length ? (
                <List>
                  {this.state.savedArticles.map(article => (
                    <ListItem key={article._id}>
                        <strong>
                          <strong><a href={article.url} target="_blank" > {article.title}</a> </strong> <i>published on</i> {article.date}
                        </strong>
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Saved Articles</h3>
              )}
            </Panel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
