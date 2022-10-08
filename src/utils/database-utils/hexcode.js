export function validator(input) {
    return /#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})/g.test(input)
    
}
export default function hexcode(){
    return '#'+Math.floor(Math.random()*16777215).toString(16).toUpperCase();
}