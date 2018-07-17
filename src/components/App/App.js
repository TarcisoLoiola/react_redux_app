
import React from 'react';
import AddOption from '../AddOption';
import Header from '../Header';
import Action from '../Action';
import Options from '../Options';
import OptionModal from '../OptionModal';

class App extends React.Component {
    state = {
        options: this.props.options,
        selectedOption: undefined,
    };
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [], }));
    };
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    };
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({ selectedOption: option }));
    };
    handleAddOption = (option) => {

        if (!option) {
            return 'Enter Value item'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option alrady exist';
        };
        this.setState((prevState) => ({ options: prevState.options.concat(option), }))
    };
    handleOkay = () => {
        this.handleDeleteOption(this.state.selectedOption);
        this.setState(() => ({ selectedOption: undefined }));
    };
    handleNotOkay = () => {
        this.setState(() => ({ selectedOption: undefined }));
    };
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options }));
            };
        } catch (error) {
            // console.log(error);
        };

    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        };
    };
    componentWillUnmount() {
        console.log('CWU')
    };

    render() {

        return (
            <div>
                <Header title={this.state.title} subtitle={this.state.subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleOkay={this.handleOkay}
                    handleNotOkay={this.handleNotOkay}
                />
            </div>
        );
    };
};

App.defaultProps = {
    options: [],
};

export default App;