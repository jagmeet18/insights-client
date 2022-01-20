import './Cards.css'

const Cards = (props) => {
    return ( 
        
        // <div className="card">
        //     <div className="card-body">
        //         <img className ="photo" src= {props.img}/>
        //         <h2 className="card-title">{props.title}</h2>
        //         <p className="card-desc">{props.description}</p>
        //     </div>
        //     <button className="card-btn">View Collab</button>
        // </div>

        <div className="card-container">
            <div className="image-container">
                <img src={props.img}/>
            </div>
            <div className="card-content">
                <div className="card-title">
                    <h3>{props.title}</h3>
                </div>
                <div className="card-body">
                    <p>{props.body}</p>
                </div>
            </div>
           
            <div className="btn">
                <button>
                    <a href="/">
                        View Collab
                    </a>
                </button>
            </div>


        </div>
    
     );
}
 
export default Cards;