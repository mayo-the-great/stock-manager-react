
{/*affiche un produit*/}

function Produit(prop){
    return (<div className="produit-informations">  
                <h1 className="produit-nom">Nom: {prop.nom}</h1>
                <p className="produit-prix">Prix: {prop.prix.toLocaleString('fr-FR')} FCFA</p>

                <p className="produit-stock">Stock disponible: {prop.stock}</p>
                <p className="produit-categorie">Catégorie: {prop.categorie}</p>

    
            </div>);



} 

export  default Produit;
