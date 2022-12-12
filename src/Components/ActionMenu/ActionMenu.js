import './actionMenu.css';

const ActionMenu = ({ children, title, subTitle, onCancel }) => {
    return (
        <div className="action-menu">
            <div className='action-menu-action-header'>
                <div className='action-menu-action-title'>
                    { title }
                </div>
                <div className='action-menu-action-subtitle'>
                    { subTitle }
                </div>
            </div>
            
            <div className='action-menu-button-container'>
                { children }
                <button 
                    className="uk-button uk-button-secondary uk-width-1-1"
                    onClick={ onCancel }>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default ActionMenu;
