import { useState } from "react";
import { moveToZone, removeCard, switchFace, Zones } from "../../StoreSlices/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import ActionMenu from '../ActionMenu/ActionMenu';

const Card = ({ card, onRemove }) => {
    const dispatch = useDispatch();
    const activePlayer = useSelector(state => state.board.activePlayer);

    const [fullSizeVisible, setFullSizeVisible] = useState(false);
    const [editMenuOpen, setEditMenuOpen] = useState(false);
    const [zoneMenuOpen, setZoneMenuOpen] = useState(false);

    const onOpenView = () => setFullSizeVisible(true);
    const onCloseView = () => setFullSizeVisible(false);
    const onEdit = () => setEditMenuOpen(true);
    const onEditMenuCancel = () => setEditMenuOpen(false);
    const onRemoveClick = () => {
        setEditMenuOpen(false);
        onRemove();
    }
    const onFlipCard = () => {
        setEditMenuOpen(false);
        dispatch(switchFace({
            player: activePlayer,
            card: card,
            faceIndex: (card.activeFace + 1) % 2
        }));
    }
    const onMoveToZoneClick = () => {
        setEditMenuOpen(false);
        setZoneMenuOpen(true);
    }
    const onZoneMenuCancel = () => setZoneMenuOpen(false);
    const onMoveCardToZone = zone => {
        setZoneMenuOpen(false);
        dispatch(moveToZone({
            player: activePlayer,
            card: card,
            zone: zone
        }));
    }

    const artwork = card.faces[card.activeFace].artwork;

    const fullSizeView = (
        <div className="card-fullsize-view" onClick={ onCloseView }>
            <img 
                src={ artwork.large }
                alt="a magic card" />
        </div>
    );

    const isMultiFace = card.faces.length > 1;

    const flipFaceButtonJsx = (
        <button
            className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom"
            onClick={ onFlipCard }>
            Flip face
        </button>
    )

    const editMenuJsx = (
        <ActionMenu title="Edit card" subTitle={ card.name } onCancel={ onEditMenuCancel }>
            <button
                className="uk-button uk-button-danger uk-width-1-1 uk-margin-small-bottom"
                onClick={ onRemoveClick }>
                Remove
            </button>
            { isMultiFace ? flipFaceButtonJsx : null }
            <button
                className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom"
                onClick={ onMoveToZoneClick }>
                Move to zone
            </button>
        </ActionMenu>
    );

    const zoneMenuJsx = (
        <ActionMenu title="Move card to zone" subTitle={ card.name } onCancel={ onZoneMenuCancel }>
            <button
                className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom"
                onClick={ () => onMoveCardToZone(Zones.Exile) }>
                Exile
            </button>
            <button
                className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom"
                onClick={ () => onMoveCardToZone(Zones.Graveyard) }>
                Graveyard
            </button>
        </ActionMenu>
    );

    return (
        <>
            <div className="card-container">
                <img 
                    src={ artwork.small }
                    alt="a magic card"
                    onClick={ onOpenView }/>
                <div className="card-container-action-row">
                    <button
                        className="uk-button uk-button-default uk-button-small uk-width-1-1"
                        onClick={ onEdit }>
                        Edit
                    </button>
                </div>
            </div>
            { fullSizeVisible ? fullSizeView : null }
            { editMenuOpen ? editMenuJsx : null }
            { zoneMenuOpen ? zoneMenuJsx : null }
        </>
    );
};

export default Card;