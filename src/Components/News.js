import React, { Component, useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  //using only the below function 'updateNews' inplace of  didMount,handlePreviousClick,handleNextClick
  const updateNews = async () => {
    props.setProgress(0); //loading bar start position

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a6431e456cc840fa950aa7f751a7b8a3&page=${page}&pageSize=${props.pageSize}`
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(20);
    let parsedData = await data.json();
    props.setProgress(60);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100); //loading bar end position
  };

  useEffect(() => {
    updateNews();
  }, []);

  const handlePreviousClick = async () => {
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   props.country
    // }&category=${
    //   props.category
    // }&apiKey=962f603a690c4815a41e19f530fe3656&page=${
    //   this.state.page - 1
    // } &pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });

    //for class component
    // await this.setState({ page: this.state.page - 1 });
    //this.updateNews();
    
    setPage(page - 1);
    updateNews();
  };

  const handleNextClick = async () => {
    // console.log("Next");
    // if (
      // !(
    //     this.state.page +  1 >
    //     Math.ceil(this.state.totalResults / props.pageSize)//this.state.totalResults / props.pageSize -> no of pages that can  be obtained
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     props.country
    //   }&category=${
    //     props.category
    //   }&apiKey=962f603a690c4815a41e19f530fe3656&page=${
    //     this.state.page + 1
    //   }&pageSize=${props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false, //when entire thing is loaded we change loading to false
    //   });
    // }

    //for class component
    // await this.setState({ page: this.state.page + 1 }); //added awaited since we should wait until all the executions are performed
    //this.updateNews();

    setPage(page + 1);
    updateNews();
  };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a6431e456cc840fa950aa7f751a7b8a3&page=${page + 1}&pageSize=${props.pageSize}`
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));//keep concatinating new loaded results/news with the already displayed news
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className="container my-4">
      <h2
        className="text-center"
        style={{ margin: "25px 0px", marginTop: "90px" }}
      >
        NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {/* {this.state.loading && <Spinner />} */} {/*If site is loading i.e. loading variabel is true then only spinner will be shown*/}

      <InfiniteScroll
        //dataLength={this.state.articles.length}
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles !== totalResults}//this should be true to scroll more
        loader={<Spinner />}//here, we can also write some text like -> Loading...
      >
        <div className="container">
          <div className="row" style={{margin:"0 15px"}}>
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url} style={{ marginTop:"15px"}}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
        
      {/* Instead of hard coding like the below, we did the above using map function.
      Also instead using two buttons:previous and next, we created an Infinite scroll component for infinite scroll*/}
        {/* <div className="row">
        <div className="col-md-3">
          <NewsItem title="myTitle" description="myDesc"/>
        </div>
        <div className="col-md-3">
          <NewsItem title="myTitle" description="myDesc"/>
        </div>
        <div className="col-md-3">
          <NewsItem title="myTitle" description="myDesc"/>
        </div>
        </div> */}

{/*We created a previous as well as next button but hten replced it with infinite scroll*/}
      {/* <div className="container d-flex justify-content-between my-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-secondary"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;



//the below commented part is, if we want to code class based News component
//import React, {Component} from 'react'; //for class based component

// class based News component
// export class News extends Component{

//   static defaultProps = {
//   country: "in",
//   pageSize: 8,
//   category: "general",
// };
// PropTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// };

// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

// constructor(props){
//   super(props);
//   this.state={
//     article:[],
//     loading:false,
//     page:1
//   };

//   document.title=`${this.capitalizeFirstLetter(
//     this.props.category
//   )} - NewsApp`;
// }

// async  updateNews(){
//   this.props.setProgress(0); //loading bar start position

//   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a6431e456cc840fa950aa7f751a7b8a3&page=${page}&pageSize=${props.pageSize}`
//   this.setLoading({loading:true});
//   let data = await fetch(url);
//   this.props.setProgress(20);
//   let parsedData = await data.json();
//   this.props.setProgress(60);
//   console.log(parsedData);
//   this.setState({
//   articles:parsedData.articles,
//   totalResults:parsedData.totalResults,
//   loading:false
//   });

//   this.props.setProgress(100); //loading bar end position
// };

// //for class based component
//   async componentDidMount() {
//   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a6431e456cc840fa950aa7f751a7b8a3&page=${page}&pageSize=${props.pageSize}`
//   for class based component
//   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6431e456cc840fa950aa7f751a7b8a3&page=${this.state.page}&pageSize=${this.props.pageSize}`
//   this.setState({ loading: true });
//   let data = await fetch(url);
//   let parsedData = await data.json();
//   console.log(parsedData);
//   this.setState({
//     articles: parsedData.articles,
//     totalResults: parsedData.totalResults,
//     loading: false,
//   });
//   this.updateNews();
//   }


// }