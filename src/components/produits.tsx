import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProduitItem from './ProduitItem.jsx';
const Produits = () => {
    const [produits, setProduits] = useState([]);
    const [sortOrder, setSortOrder] = useState(''); // 'asc' or 'desc'
    const fetchProduits = async () => {
        const response = await axios.get('https://fakestoreapi.com/products?limit=12');
        setProduits(response.data);
    };

    useEffect(() => {
        fetchProduits();
    }, []);

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

// Utilisez la fonction de tri dans le rendu
    const sortedProduits = produits.slice().sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else if (sortOrder === 'desc') {
            return b.price - a.price;
        } else {
            return 0;
        }
    });

    return (
        <div>
            <div className="flex justify-end pr-12 pt-6">
                <form>
                    <select
                        className="px-2 border border-black text-black text-xl"
                        onChange={handleSortChange}
                    >
                        <option value="">Trier par :</option>
                        <option value="asc">Prix croissant</option>
                        <option value="desc">Prix décroissant</option>
                    </select>
                </form>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-16">
                {sortedProduits.map((produit) => (
                    <ProduitItem key={produit.id} produit={produit} />
                ))}
            </div>
        </div>
    );
};

export default Produits;
