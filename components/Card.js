import styles from "./../styles/Card.module.css"
import Image from 'next/image'
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

const Card = ({ pizza }) => {
    return (
        <div className={styles.cardContainer}>

            <Link href={`/pizza/${encodeURIComponent(pizza.id)}`} passHref>
                <a><h3>{pizza.name}</h3>
                    <Image
                        src={`/${pizza.imageUrl}`}
                        layout="responsive"
                        width="100%"
                        height="100%"
                        alt={pizza.name}
                        placeholder='blur'
                        blurDataURL={`/${pizza.imageUrl}`}
                    />
                </a>
            </Link>

            <div className={styles.priceWrapper}>
                <span>Rs. {pizza.price}</span>
                <AddToCartButton id={pizza.id} />
            </div>

        </div>
    );
}

export default Card;