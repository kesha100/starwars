import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/CardList.css';
import { Link, useNavigate } from "react-router-dom";
import Search from "../componets/Search"; // Ensure the correct path to Search component

export default function CardList() {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await axios.get('https://swapi.dev/api/');
                setCategories(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getCategory();
    }, []);

    const GoToCategory = async (route) => {
        try {
            const res = await axios.get(`https://swapi.dev/api/${route}/`);
            setData(res.data.results);
            setSearch(res.data.results);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const extractIdFromUrl = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 2]; // Get only the ID part
    };

    const extractCategoryFromUrl = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 3]; // Get the category part
    };

    return (
        <>
            <section className="list">
                <nav className="choosePosition">
                    {Object.entries(categories).map(([key, value]) => (
                        <div key={key}>
                            <button className="prodCategore" onClick={() => GoToCategory(key)}>
                                {key}
                            </button>
                        </div>
                    ))}
                </nav>
                <Search cards={data} setSearch={setSearch}/>

                <div className="mainCard">
                    {data.map((prod) => (
                        <div className="card" key={prod.url}>
                            <div className="up">
                                <img
                                    src={prod.thumbnail || `${process.env.PUBLIC_URL}/starwars.jpg`}
                                    alt={prod.name}
                                    className="thumbnail"
                                />
                                <span>{prod.name}</span>
                                <span className="gh">{prod.birth_year}</span>
                                <span className="gh">{prod.created}</span>
                                <span>{prod.eye_color}</span>
                                <span>{prod.gender}</span>
                                <span>{prod.climate}</span>
                                <span className="gh">{prod.diameter}</span>
                                <span className="gh">{prod.gravity}</span>
                                <span>{prod.population}</span>
                            </div>
                            <div className="down">
                                <Link to={`details/${extractCategoryFromUrl(prod.url)}/${extractIdFromUrl(prod.url)}`}>
                                    <button className="glow-on-hover">show</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
