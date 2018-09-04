class Lang extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selected:props.selected,
        id:props.selected
      };
  
      //TODO: clearify WTF ???
      this.toggleLanguage = this.toggleLanguage.bind(this);
    }
  
    toggleLanguage(){
      this.setState(prevState=>({
          selected:this.state.id
        })
      )
      this.props.callbackFromApp(this.props.lng)
      //console.log(this.state)
      
    }
    
    render() {
      return <div 
                id={this.props.id} data-selected = {this.state.selected}  className={(this.state.id != this.state.selected) ? "langswicherActive" : "langswicher"} 
                onClick={this.toggleLanguage}>
                {this.props.lng}
              </div>
    }
  }