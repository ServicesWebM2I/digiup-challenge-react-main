import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const FormulaireRecherche = ({setFilteredProducts}) => {
  const [totalProduits, setTotalProduits] = useState(10);
  const [prixMinimum, setPrixMinimum] = useState(0);
  const [prixMaximum, setprixMaximum] = useState(100);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (totalProduits <= 0 || prixMinimum < 0 || prixMaximum < 0 || prixMaximum < prixMinimum) {
      toast.error('Veuillez corriger les erreurs dans le formulaire.');
      return;
    }

    try {
      const response = await axios.get('https://fakestoreapi.com/products?limit=50');
      const allProducts = response.data;

      // Filter
      const filteredProducts = allProducts
          .slice(0, totalProduits)
          .filter((product) => product.price >= prixMinimum && product.price <= prixMaximum);
      setFilteredProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching or filtering products:', error);
      toast.error('Une erreur s\'est produite lors de la recherche.');
    }
  };
  return (
    <div className="flex items-center bg-gray-100 text-gray-900 p-4">
      <form className="flex space-x-24 items-center justify-center flex-1">
        <div className="flex space-x-4 items-center">
          <label className="font-lg font-bold" htmlFor="totalProduits">
            Nombre de produits :{' '}
          </label>
          <input
            value={totalProduits}
            id="totalProduits"
            className="h-8 rounded-md w-24 text-black text-xl font-semibold text-center"
            name="totalProduits"
          />
        </div>
        <div className="flex space-x-20">
          <div className="flex space-x-1 items-center">
            <label className="font-lg font-bold" htmlFor="prixMinimum">
              Prix minimum
            </label>
            <button
              className="w-8 h-8 bg-orange-400 text-xl rounded-md font-extrabold"
              type="button"
              onClick={() => setPrixMinimum(prixMinimum - 10)}
            >

              -
            </button>
            <input
              id="prixMinimum"
              value={prixMinimum}
              className="h-8 rounded-md bg-white w-24 p-2 text-xl text-center"
              name="prixMinimum"
            />
            <button
              className="w-8 h-8 bg-orange-500 text-xl rounded-md font-extrabold"
              type="button"
              onClick={() => setPrixMinimum(prixMinimum + 10)}
            >
              +
            </button>
          </div>
          <div className="flex space-x-1 items-center">
            <label className="font-lg font-bold" htmlFor="prixMaximum">
              Prix Maximum
            </label>
            <button
              className="w-8 h-8 bg-orange-400 text-2xl rounded-md font-extrabold"
              type="button"
              onClick={() => setprixMaximum(prixMaximum - 10)}
            >
              -
            </button>
            <input
              id="prixMaximum"
              value={prixMaximum}
              className="h-8 bg-white rounded-md w-24 p-2 text-xl text-center "
              name="prixMaximum"
            />
            <button
              className="w-8 h-8 bg-orange-500 text-2xl rounded-md font-extrabold"
              type="button"
              onClick={() => setprixMaximum(prixMaximum + 10)}
            >
              +
            </button>
          </div>
        </div>

        <input
          className="px-4 cursor-pointer font-bold py-1 text-white text-xl bg-green-600 rounded-lg"
          value="Rechercher"
          type="submit"
        />
      </form>
    </div>
  );
};

export default FormulaireRecherche;
