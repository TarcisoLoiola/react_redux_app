
class Counter extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            title: props.title,
            subtitle: props.subtitle,
            count: 0,
            add: props.add,
            subtract: props.subtract,
            reset: props.reset,
        }
    }
    componentDidMount(){
        try {
            const count = parseInt(localStorage.getItem('count'));
            if(!isNaN(count)) this.setState({ count });
        } catch (error) { 
            //Do Nothing 
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.count !== this.state.count){
            localStorage.setItem('count', this.state.count);
        }
    }

    handleAddOne() {
        this.setState((prevState)=>{
            return{
                count: prevState.count +1,
            };
        });
    }

    handleMinusOne() {
        this.setState((prevState)=>{
            return{
                count: prevState.count -1,
            }
        })
    }

    handleReset(){
        this.setState(()=>{
            return {
                count: 0,
            }
        })
    }
    render(){
        
        return(
            <div>
                <Header 
                title = {this.state.title}
                subtitle = {this.state.subtitle}
                count = {this.state.count}
                />
                <Button onClick={this.handleAddOne}>{this.state.add}</Button>
                <Button onClick={this.handleReset}>{this.state.reset}</Button>
                <Button onClick={this.handleMinusOne}>{this.state.subtract}</Button>
            </div>
        )
    }
}
Counter.defaultProps ={
    title: 'Counter App',
    // subtitle: 'Great React Redux App!',
    add: '+',
    subtract: '-',
    reset: 'reset'
}

const Header = (props) => {
    return(
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h3>{props.subtitle}</h3>}
            <h3>Counter: {props.count}</h3>
        </div>
    )
}

// const Buttons = (props) => {
//         return(
//             <div>
//                 <Button onClick={this.handleAddOne}>{props.add}</Button>
//                 <Button>{props.reset}</Button>
//                 <Button>{props.subtract}</Button>
//             </div>
//         )
// }
// Buttons.defaultProps ={
//     add: '+',
//     subtract: '-',
//     reset: 'reset'
// }

const Button = (props) =>{
    return (
        <button {...props}/>
    )
}


ReactDOM.render(<Counter />, document.getElementById('app'));