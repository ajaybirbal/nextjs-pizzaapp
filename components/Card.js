import styles from "./../styles/Card.module.css"
import Image from 'next/image'

const Card = ({pizza}) => {
    return (
        <div className={styles.cardContainer}>
            <p>{pizza.name}</p>
            <Image
                src="/margherita.jpg"
                layout="responsive"
                width="100%" 
                height="100%"
                alt={pizza.name}
            />
            <div className={styles.priceWrapper}>
                <span>Rs. {pizza.price}</span>
                <button className="addToCartButton">Add</button>
            </div>
        </div>
    );
}

export default Card;