/*'use strict'; */
const rangeStart = 20;
const rangeEng = 100;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: {},
      lang:"en",
      langs:["en","hy","ru","fr"],
      numbers:[]
    };

    this.setupGame()
    this.callbackChoosedLanguage = this.callbackChoosedLanguage.bind(this)
  }
  
  componentDidMount(){
    this.translateApp()
  }

  setupGame(){
    this.state.numbers.fillRange(rangeStart,rangeEng)
    this.secret = this.state.numbers.rnd()
  }

  callbackChoosedLanguage(newLang){
    this.setState({lang:newLang},()=>{
      this.translateApp()
    })
    
    
  }

  render() {
    //const langlist = this.generateLanguagesLits();
    return <div>
            <LangList langs={this.state.langs} selected={this.state.lang} callbackFromApp={this.callbackChoosedLanguage} />
            <h1>{this.state.messages.title}</h1>
            <Paragraph text={this.state.messages.explanation} />
            <Paragraph text={this.state.messages.task} />
          </div>;
  }

  translateApp(){
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

class LangList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        selected:props.selected,
        langs:props.langs
      };
      
      //TODO: clearify WTF ???
    this.changeLanguage = this.changeLanguage.bind(this);
    }


    changeLanguage(e){
      this.setState({selected:e.target.id}) 
      this.props.callbackFromApp(e.target.id)
    }

    render() {
      return this.state.langs.map((lng)=>{
        return <div 
              id={lng} key={lng} data-selected = {this.state.selected}  className={(this.state.selected == lng) ? "langswicherActive" : "langswicher"} 
              onClick={this.changeLanguage}>
              {lng}
            </div>
      })
      
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



const e = React.createElement;
const app = <App/>;
ReactDOM.render(
  app,
  document.getElementById('app')
);