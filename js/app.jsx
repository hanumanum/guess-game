'use strict';
const rangeStart = 1;
const rangeEng = 100;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: {},
      lang:"en",
      langs:["en","hy","fr","ru"],
      numbers:[],
      secret:0,
      steps:0,
      response:"",
      gameover:false
    };

    this.setupGame()
    this.callbackChoosedLanguage = this.callbackChoosedLanguage.bind(this)
    this.callbackClick = this.callbackClick.bind(this)
  }
  
  componentDidMount(){
    this.translateApp()
  }

  setupGame(){
    this.state.numbers.fillRange(rangeStart,rangeEng)
    this.state.secret = this.state.numbers.rnd()
  }

  callbackChoosedLanguage(newLang){
    this.setState({lang:newLang},()=>{
      this.translateApp()
    })
   
  }

  callbackClick(newNumber, selecteds){
    if(newNumber == this.state.secret){
      this.setState({response:this.state.messages.success+" "+this.state.secret})
      this.setState({gameover:true})
    }else if(newNumber>this.state.secret){
      this.setState({response:this.state.messages.more})
    }else if(newNumber<this.state.secret){
      this.setState({response:this.state.messages.less})
    }

    this.setState((prevState, props) => ({
      steps: prevState.steps+1
    }));
   
  }

  render() {
    return <div>
            <LangList langs={this.state.langs} selected={this.state.lang} callbackFromApp={this.callbackChoosedLanguage} />
            <h1>{this.state.messages.title}</h1>
            <Paragraph text={this.state.messages.explanation} />
            <Paragraph text={this.state.messages.task} />
            <p> {this.state.steps} / 7 </p>

            
            <p className={(!this.state.gameover) ? "hint":""}>{(!this.state.gameover) ? this.state.response:""}</p>
            <p className={(this.state.gameover) ? "hintWin":""}>{(this.state.gameover) ? this.state.response:""}</p>
            <GameBoard numbers={this.state.numbers} 
                       callbackFromApp={this.callbackClick} 
                       secret={this.state.secret}
                       gameOver={this.state.gameover}
                       steps={this.state.steps}
            />
            <a className="button" href=''>{this.state.messages.newgame}</a>
          </div>;
  }

  translateApp(){
    fetch("l18n/messeges_"+this.state.lang+".json")
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

class GameBoard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        numbers:props.numbers,
        selected:[],
        last:0,
      };
      this.selectNumber = this.selectNumber.bind(this)
    }

    selectNumber(e){
      let newNumbers = this.state.selected.concat(parseInt(e.target.id));
      this.setState({
        selected: newNumbers,
        last:e.target.id
      }, this.props.callbackFromApp(e.target.id, newNumbers));
    }

    chooseClass(num){
      
      /*
      //Start help from 5th step
      if(this.props.steps>=4){
        if(!this.state.selected.has(num) && num<this.state.last && this.state.last<this.props.secret){
          return "numberAvoided"
        }
        
        if(!this.state.selected.has(num) && num>this.state.last && this.state.last>this.props.secret){
          return "numberAvoided"
        }
      }
      */
      

      if(this.state.last == num){
        return "numberLast"
      }
      if(this.props.gameOver && num === this.props.secret)
        return "numberCorrect"
      return (this.state.selected.has(num)) ? "numberSelected" : "number"
    }

    render() {
      return this.state.numbers.map((num)=>{
        return <div 
              id={num} key={num} 
              className={this.chooseClass(num)}
              onClick={(this.state.selected.has(num)) ? null: this.selectNumber}>
              {num}
            </div>
            
      }) 
    }

}


class LangList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        selected:props.selected,
        langs:props.langs
      };
      
    //TODO: clearify, WTF ???
    this.changeLanguage = this.changeLanguage.bind(this);
    }


    changeLanguage(e){
      this.setState({selected:e.target.id}) 
      e.target.removeEventListener("click",()=>{})
      this.props.callbackFromApp(e.target.id)
    }

    render() {
      return this.state.langs.map((lng)=>{
        return <div 
              id={lng} key={lng} 
              className={(this.state.selected == lng) ? "langswicherActive" : "langswicher"} 
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