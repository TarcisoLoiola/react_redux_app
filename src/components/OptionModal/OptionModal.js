import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) =>
    (
        <Modal
            isOpen={!!props.selectedOption}
            contentLabel='This Is What You Should Do!'
            onRequestClose={props.handleNotOkay}
            ariaHideApp={false}
        >
            <h3>This Is What You Should Do!</h3>
            {props.selectedOption && <p>{props.selectedOption}</p>}
            <button onClick={props.handleOkay}>Let's Do It!</button>
            <button onClick={props.handleNotOkay}>Not!!</button>
        </Modal>
    );

export default OptionModal;
