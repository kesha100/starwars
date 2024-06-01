import { Route, Routes } from "react-router-dom";
import CardList from "../pages/CardList";
import CardDetail from "../pages/CardDetail";

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<CardList />} />
            <Route path="details/:category/:id" element={<CardDetail />} />
        </Routes>
    );
}
