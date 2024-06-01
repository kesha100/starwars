import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/CardDetail.css';
function CardDetail(props) {
    const { category, id } = useParams();
    const [cardDetails, setCardDetails] = useState();

    useEffect(() => {
        const getCard = async () => {
            try {
                const res = await axios.get(`https://swapi.dev/api/${category}/${id}/`);
                setCardDetails(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getCard();
    }, [category, id]);

    return (
        <div className="detail-container">
            <h1>Name: {cardDetails?.name}</h1>
            <h3>Height: {cardDetails?.height}</h3>
            <h3>Mass: {cardDetails?.mass}</h3>
            <h3>Hair Color: {cardDetails?.hair_color}</h3>
            <h3>Birth Year: {cardDetails?.birth_year}</h3>
            {/* Render additional details as needed */}
        </div>
    );
}

export default CardDetail;
