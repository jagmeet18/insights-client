import Cards from "../CardsComp/Cards";
import './CollabSection.css'

const CollabSection = ({collabsList}) => {
    return ( 
        <div className="all-collabs">
            {
                collabsList.map(({img, title, ownerIcon, communityPosted}) => {
                    return <Cards
                        img={img}
                        title={title}
                        ownerIcon={ownerIcon}
                        body={communityPosted}
                    />
                })
            }
            {/* all the cards components come here */}
            {/* <Cards img="https://media.istockphoto.com/photos/heart-shape-glowing-neon-lights-abstract-background-picture-id1180473593?b=1&k=20&m=1180473593&s=170667a&w=0&h=4Ur4H6C4k6y07ylYkDrOimdVz_pvvQSdFtOrOEjNFM0="
            title="Jane's Mashup" body="Romance"/>
            <Cards img="https://stimg.cardekho.com/images/carexteriorimages/930x620/Bentley/Flying-Spur/7776/1587104359393/front-left-side-47.jpg"
            title="Mashup 2" body="Car"/>
            <Cards img="https://cdn.pixabay.com/photo/2017/08/04/13/22/hooded-man-2580085__340.jpg"
            title="Kane's Mashup" body="Thriller"/>

            <Cards img="https://media.istockphoto.com/photos/heart-shape-glowing-neon-lights-abstract-background-picture-id1180473593?b=1&k=20&m=1180473593&s=170667a&w=0&h=4Ur4H6C4k6y07ylYkDrOimdVz_pvvQSdFtOrOEjNFM0="
            title="Jane's Mashup" body="Romance"/>
            <Cards img="https://stimg.cardekho.com/images/carexteriorimages/930x620/Bentley/Flying-Spur/7776/1587104359393/front-left-side-47.jpg"
            title="Mashup 2" body="Car"/>
            <Cards img="https://cdn.pixabay.com/photo/2017/08/04/13/22/hooded-man-2580085__340.jpg"
            title="Kane's Mashup" body="Thriller"/>

            <Cards img="https://media.istockphoto.com/photos/heart-shape-glowing-neon-lights-abstract-background-picture-id1180473593?b=1&k=20&m=1180473593&s=170667a&w=0&h=4Ur4H6C4k6y07ylYkDrOimdVz_pvvQSdFtOrOEjNFM0="
            title="Jane's Mashup" body="Romance"/>
            <Cards img="https://stimg.cardekho.com/images/carexteriorimages/930x620/Bentley/Flying-Spur/7776/1587104359393/front-left-side-47.jpg"
            title="Mashup 2" body="Car"/>
            <Cards img="https://cdn.pixabay.com/photo/2017/08/04/13/22/hooded-man-2580085__340.jpg"
            title="Kane's Mashup" body="Thriller"/> */}


        </div>
     );
}

export default CollabSection;