import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import "./App.css";

/* props 예제
function Movie({ iden ,name, rating}){
  return <div>
    <h1>I like {name} </h1>
    <h2>{iden}</h2>
    <h4>{rating}/5.0</h4>
  </div>;
}

const MovieArray = [
  { id : 1 , 
    name : "SpiderMan",
    rating : 5
  },
  { id : 2 , 
    name : "Avengers",
    rating : 4.9
  },
  { id : 3 , 
    name : "Thor",
    rating : 4.8
  },
  { id : 4 , 
    name : "IronMan",
    rating : 4.7
  }
];

// 이름은 무조건 propTypes로 해야함

Movie.propTypes = {
  name : PropTypes.string.isRequired,
  iden : PropTypes.number.isRequired,
  rating : PropTypes.number.isRequired
}; 


// 이걸 function component라 부름
function App() {
  return <div className="App">
            <h1>Hello</h1>
            {
            // !! 자바스크립트 넣을 땐 {} 안에 넣음
            //  <Movie name="spiderMan" />
            // <Movie name="Avengers" />
            // <Movie name="IronMan" />
            // <Movie name="Thor" /> 
            // 이걸 한줄로 하면
             MovieArray.map(MovieName => <Movie key = {MovieName.id} iden = {MovieName.id} name = {MovieName.name} rating = {MovieName.rating} />)
           }
          </div>;
}

*/

// class component

class App extends React.Component{
  /* class component 설명
  state = {
    count : 0
  };
  // react코드가 아닌 javascript코드, const add를 쓰지 않는 이유는 class이기 때문
  // setState를 쓰면 react는 state를 re-render함
  add = () => {
    // {count : this.state.count + 1 }은 좋은 코드가 아님. 외부 state 에 의존
    // current => ({count : current.count +  1}) 로 대체. 외부에 의존x
    this.setState(current => ({count : current.count +  1}));
  };
  minus = () => {
    // 좋지 않은 코드
    this.setState({count : this.state.count - 1});
  };
  render() {
    return <div>
      <h1>the number is : {this.state.count}</h1>
      <button onClick={this.add}>Add</button>
      <button onClick={this.minus}>Minus</button>
    </div>;
  } ;
  */
 
    state = {
      isLoading : true,
      movies : []
    };

  // async > 이 함수를 기다려라. 함수 안에서 뭘 기다려야 하는지 await로 말해줌. 이걸 하지 않으면 javascript는 function을 기다려주지 않을것
  
  getMovies = async () => {
    // axios.get은 완료되기 까지 좀 시간이 필요해 async와 await사용
    const {data : {data : {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoading :false })
    
  }
  // 처음 render를 하면 호출되는 life cycle method
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({isLoading : false})
    // }, 6000)
    this.getMovies();
  }
  render() {
    const {isLoading, movies} = this.state;
    return (
      <section className="container">
        {isLoading ? ( 
          <div className="loader">
            <span className="loader_text">Loading... </span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie 
                key = {movie.id} 
                id={movie.id} 
                year={movie.year} 
                title={movie.title} 
                summary={movie.summary} 
                poster={movie.medium_cover_image}
                genres={movie.genres}
            />
          ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;
