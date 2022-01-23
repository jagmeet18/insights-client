import "./Button.css"
import Button from "./Button.js"

const CatalogueButtonSection = ({setCatalogueState}) => {

    return ( 
        <div className="button-container">
            <Button onCLickHandler={setCatalogueState} name="collabs" />
            <Button onCLickHandler={setCatalogueState} name="communities"/>
        </div>
    );
}
 
export default CatalogueButtonSection;

// const Button = () => {
//     return (  );
// }
 
// export default Button;
