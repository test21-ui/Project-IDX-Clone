import './EditorButton.css';

export const EditorButton = ({isActive}) => {

    function onClickHandler() {
        // TODO: 
        
        console.log("Button clicked");
    }

    return (
        <button
             className="editor-button"
             style={{
                color: isActive ? 'white' : '#b0c4de',
                backgroundColor: isActive ? '#142534' : '#30495f',
                borderTop: isActive ? '3px solid magenta' : '3px solid #30495f',
                marginBottom:isActive ? 'none' : '1px',
             }}
             onClick={onClickHandler}
        >
                file.js 
        </button>    
    )
}