import Produit from './Produit'
{/*parcours et affiche tous les produits*/}
function ListeProduits({ Produits,suppress,update}){
  
    return (
        <div className='produits-container'>
            {Produits.length===0?
            <p className='Aucun-produit'>Aucun produit trouvé. </p>:
                (
                Produits.map(produit=>{
                   
                        
                            let statut
                            if(produit.stock===0){
                                statut="Rupture de stock"
                            }
                            else if(produit.stock<=2){

                                statut='Stock faible'
                            }
                            else{
                                statut="Disponible"
                            }
                       return( 
                        <div key={produit.id} className='produit-card'>
                            <Produit 
                            categorie={produit.categorie||'non classé'}
                            nom={produit.nom}  
                            stock={produit.stock}
                            prix={produit.prix}  

                        />
                        <p className={`badge-statut ${    produit.stock === 0
                            ? 'rupture'
                            : produit.stock <= 2
                            ? 'faible'
                            : 'disponible'}`}
                                    >
                            STATUT:{statut}
                        </p>
                        <div className='produit-actions'>
                            <button 
                                className='btn-supprimer'
                                onClick={()=>suppress(produit.id)}>
                                SUPPRIMER
                            </button>
                            <button 
                                className='btn-modifier'
                                
                                onClick={()=>update(produit.id)}>
                                MODIFIER
                            </button>
                        </div>
                         </div>)
                   
                })
               )
            }
        </div>
    )
}
export default ListeProduits