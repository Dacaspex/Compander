import { useSelector } from 'react-redux'
import Card from './Card';
import "./board.css";
import { useDispatch } from 'react-redux';
import { removeCommander, removeCard } from '../../StoreSlices/boardSlice';

const Board = () => {
    const dispatch = useDispatch();
    const activePlayer = useSelector(state => state.board.activePlayer);
    const boards = useSelector(state => state.board.boards);

    const targetBoards = boards.filter(board => board.player === activePlayer);
    if (targetBoards.length !== 1) return null;
    const board = targetBoards[0];

    const onRemoveCommander = card => {
        dispatch(removeCommander({
            player: activePlayer,
            card: card
        }));
    }
    const onRemoveCard = card => {
        dispatch(removeCard({
            player: activePlayer,
            card: card
        }));
    }

    const commanders = board.commanders.map(card => (
        <Card 
            key={ card.id } 
            card={ card }
            onRemove={ () => onRemoveCommander(card) }/>
    ));

    const cards = board.cards.map(card => (
        <Card
            key={ card.id }
            card={ card }
            onRemove={ () => onRemoveCard(card) }/>
    ));

    return (
        <div className='main-container'>
            <h2>Cards</h2>
            <div className='board-container'>
                { cards }
            </div>
            <h2>Commander</h2>
            <div className='board-container'>
                { commanders }
            </div>
        </div>
    );
}

export default Board;
