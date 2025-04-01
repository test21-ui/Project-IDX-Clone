import './EditorButton.css';
import {useState} from "react";

export const EditorButton = ({isActive}) => {

    const [bgcolor, setBgColor]= useState(isActive ? '#142534' : '#30495f');

    function onClickHandler() {
        // TODO: 
        // change the button background
        if(!isActive){
            setBgColor('#142534');
        }
    }

    return ( 
                
        <button
             className="editor-button"
             style={{
                color: isActive ? 'white' : '#b0c4de',
                backgroundColor: isActive ? '#142534' : '#30495f',
                borderTop: isActive ? '3px solid magenta' : '3px solid #30495f',
                marginBottom: isActive ? '0px' : '1px',
             }}
             onClick={onClickHandler}
        >
                file.js 
        </button>    
    )
}