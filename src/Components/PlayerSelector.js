import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addPlayer, removePlayer, setActivePlayer } from '../StoreSlices/boardSlice';
import './playerSelector.css';

const PlayerSelector = () => {
    const dispatch = useDispatch();
    const [newPlayerFormOpen, setNewPlayerFormOpen] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState('');
    const players = useSelector(state => state.board.players);
    const activePlayer = useSelector(state => state.board.activePlayer);

    function onSetActivePlayer(player) {
        dispatch(setActivePlayer(player));
    }

    function onAdd() {
        setNewPlayerFormOpen(true);
    }

    function onRemove() {
        dispatch(removePlayer(activePlayer));
    }

    function onConfirm() {
        dispatch(addPlayer(newPlayerName));
        setNewPlayerFormOpen(false);
    }

    function onCancel() {
        setNewPlayerFormOpen(false);
        setNewPlayerName('');
    }

    function onChange(e) {
        setNewPlayerName(e.target.value);
    }

    const newPlayerForm = (
        <div className='player-selector-new-player'>
            <span>Adding new player</span>
            <input
                autoFocus
                className="uk-input" 
                type="text" 
                placeholder="Player name"
                onChange={onChange}/>
            <div className='player-selector-new-player-actions'>
                <button
                    className="uk-button uk-button-primary uk-width-1-1"
                    onClick={onConfirm}>
                    Confirm
                </button>
                <button
                    className="uk-button uk-button-secondary uk-width-1-1"
                    onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );

    const playerButtons = players.map(player => {
        const className = player === activePlayer
            ? 'uk-button uk-button-primary uk-button-small'
            : 'uk-button uk-button-default uk-button-small'
        
        return (
            <button
                key={ player }
                className={ className }
                onClick={ () => onSetActivePlayer(player) }>
                { player }
            </button>
        )
    });

    const noPlayers = (
        <div className='player-selector-no-players'>
            <span>No players</span>
        </div>
    );

    return (
        <div className='main-container player-selector-container'>
            <div className="player-selector">
                { players.length > 0 ? playerButtons : noPlayers }
                <div className='player-selector-divider'></div>
                <button 
                    className="uk-button uk-button-default uk-button-small"
                    onClick={onAdd}>
                    Add
                </button>
                <button
                    className="uk-button uk-button-default uk-button-small"
                    disabled= { activePlayer === null }
                    onClick={onRemove}>
                    Remove
                </button>
            </div>
            { newPlayerFormOpen ? newPlayerForm : null }
        </div>
    )
};

export default PlayerSelector;