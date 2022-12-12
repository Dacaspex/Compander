import './createButton.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ActionMenu from './ActionMenu/ActionMenu';
import Search from './Search/Search';
import { addCard, addCommander } from '../StoreSlices/boardSlice';

const CreateButton = () => {
    const dispatch = useDispatch();
    const activePlayer = useSelector(store => store.board.activePlayer);

    const [actionMenuOpen, setActionMenuOpen] = useState(false);
    const [searchNormalCardOpen, setSearchNormalCardOpen] = useState(false);
    const [searchCommanderOpen, setSearchCommanderOpen] = useState(false);

    const disabled = activePlayer === null;

    const onClick = () => setActionMenuOpen(true);
    const onSearchCard = () => {
        setSearchNormalCardOpen(true);
        setActionMenuOpen(false);
    }
    const onSearchCommander = () => {
        setSearchCommanderOpen(true);
        setActionMenuOpen(false);
    }
    const onCreateToken = () => { /* TODO */ };
    const onActionMenuCancel = () => setActionMenuOpen(false);
    const onNormalCardSelected = card => {
        dispatch(addCard({ player: activePlayer, card: card,}));
        setSearchNormalCardOpen(false);
    }
    const onCommanderSelected = card => {
        dispatch(addCommander({ player: activePlayer, card: card,}));
        setSearchCommanderOpen(false);
    }

    const actionMenuJsx = (
        <ActionMenu title="Add new card" onCancel={ onActionMenuCancel }>
            <button
                className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom"
                onClick={ onSearchCommander }>
                Search commander
            </button>
            <button
                className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom"
                onClick={ onCreateToken }>
                Create token
            </button>
            <button
                className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom"
                onClick={ onSearchCard }>
                Search card
            </button>
        </ActionMenu>
    );

    const searchNormalCardJsx = (
        <Search
            onCardSelected={ onNormalCardSelected }
            onClose={ () => setSearchNormalCardOpen(false) }/>
    );

    const searchCommanderJsx = (
        <Search
            onCardSelected={ onCommanderSelected }
            onClose={ () => setSearchCommanderOpen(false) }/>
    );

    return (
        <>
            <div className='create-button-container'>
                <button
                    disabled={ disabled }
                    className="uk-button uk-button-primary "
                    onClick={ onClick }>
                    Add card
                </button>
            </div>
            { actionMenuOpen ? actionMenuJsx : null }
            { searchNormalCardOpen ? searchNormalCardJsx : null }
            { searchCommanderOpen ? searchCommanderJsx : null }
        </>
    )
};

export default CreateButton;