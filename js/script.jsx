'use strict';
const numbers = [];
const lang = "en";

numbers.fillRange(1,100)
const n = numbers.rnd()
const e = React.createElement;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: {},
      lang:"en",
      langs:["en","hy","ru","fr"]
    };
  }
  
  componentDidMount(){
    this.translateApp("en")
  }

  render() {

    const languageList = this.state.langs.map((lng)=>{
      return <Lang 
                key={lng.toString()}
                id={lng} 
                lng={lng}
                selected={ (lng===this.state.lang) ? true : false}
                />
    })

    return <div>
            {languageList}
            <h1>{this.state.messages.title}</h1>
            <Paragraph text={this.state.messages.explanation} />
            <Paragraph text={this.state.messages.task} />
          </div>;
  }

  translateApp(lang){
    fetch("/l18n/messeges_"+this.state.lang+".json")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          messages: result,
        });
      }
      
    )
  }
}


class Paragraph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text:props.text,
    };
  }

  render() {
    return <p>{this.props.text}</p>;
  }
}

class Lang extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected:props.selected,
    };

    //TODO: clearify WTF ???
    this.toggleLanguage = this.toggleLanguage.bind(this);
  }

  toggleLanguage(){
    this.setState(prevState=>({
        selected:!prevState.selected
      })
    )
  }
  
  render() {
    return <div id={this.props.id} className={(this.state.selected) ? "langswicherActive" : "langswicher"} onClick={this.toggleLanguage}>{this.props.lng}</div>
  }


}

const app = <App/>;
ReactDOM.render(
  app,
  document.getElementById('app')
);


/*class NumberList extends React.Component(){
}*/




/*
class NumberBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                   selected:false
                  ,number:props.number
                  ,issecret:props.issecret
                };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      <div>{this.state.number}</div>,
      { onClick: () => this.setState({ selected: true }) },
      this.state.number
    );
  }
}

const domContainer = document.querySelector('#app')
//const nb = new NumberBlock({number:5,issecret:false})

ReactDOM.render(e(NumberBlock), domContainer);

numbers.forEach(n => {
   
});
*/

