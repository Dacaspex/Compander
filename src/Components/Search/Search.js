import SearchResultCard from "./SearchResultCard";
import './search.css';
import { useState } from 'react';
import { MtgClient } from '../../mtg';

const SearchingState = {
    NOT_STARTED: 0,
    SEARCHING: 1,
    DONE: 2
}

const Search = ({ onCardSelected, onClose }) => {
    const [results, setResults] = useState([]);
    const [searchingState, setSearchingState] = useState(SearchingState.NOT_STARTED);
    const [searchQuery, setSearchQuery] = useState('');
    
    var mtgClient = new MtgClient();

    function onInputChange(e) {
        setSearchQuery(e.target.value);
    }

    function onInputKeyDown(e) {
        if (e.key === 'Enter') {
            search();
        }
    }

    async function search() {
        setSearchingState(SearchingState.SEARCHING);
        var results = await mtgClient.cards(searchQuery);
        setResults(results);
        setSearchingState(SearchingState.DONE);
    }

    const notSearchedInfo = (
        <div className="search-info-container">
            <div>Start search</div>
        </div>
    );

    const searchingInfo = (
        <div className="search-info-container">
            <div>Searching...</div>
        </div>
    );

    const noResultsInfo = (
        <div className="search-info-container">
            <div>No results</div>
        </div>
    );

    const searchResultCards = results.map(card => {
        return (
            <SearchResultCard 
                key={ card.id } 
                card={ card }
                onClick={ () => onCardSelected(card) }/>
        )
    });

    const resultsContainer = (
        <div className="search-results-container">
            { searchResultCards }
        </div>
    )

    return (
        <div className="search-container">
            <div className="search-input-container">
                <input 
                    autoFocus
                    className="uk-input"
                    type="text"
                    placeholder="Search card"
                    onChange={ onInputChange }
                    onKeyDown={ onInputKeyDown }/>
            </div>
            { searchingState === SearchingState.NOT_STARTED ? notSearchedInfo : null }
            { searchingState === SearchingState.SEARCHING ? searchingInfo : null }
            { searchingState === SearchingState.DONE && results.length === 0 ? noResultsInfo : null }
            { searchingState === SearchingState.DONE && results.length > 0 ? resultsContainer : null }
            <button 
                className="uk-button uk-button-secondary uk-width-1-1"
                onClick={ onClose }>
                Cancel
            </button>
        </div>
    )
};

export default Search;