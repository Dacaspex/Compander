const SearchResultCard = ({ card, onClick }) => {
    const frontFace = card.faces[0];

    return (
        <div className='search-result' onClick={ onClick }>
            <div className='search-result-information'>
                <div><strong>{ card.name }</strong></div>
                <div>{ frontFace.manaCost }</div>
            </div>
            <div className='search-result-artwork'>
                <div className='artwork'>
                    <img src={ frontFace.artwork.small } alt="a magic card" />
                </div>
            </div>
        </div>
    );
};

export default SearchResultCard;