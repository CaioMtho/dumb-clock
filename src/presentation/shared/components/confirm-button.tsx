export interface ConfirmButtonProps {
    text : string;
    onClick : () => void;
}

export function ConfirmButton(props : ConfirmButtonProps) {
    return (
        <button 
            className="btn btn-primary" 
            onClick={props.onClick}>
        
        {props.text}
        </button>
    )
}