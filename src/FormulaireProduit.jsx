function FormulaireProduits({filtreCategorie,setFiltreCategorie,categorie,setCategorie,setRecherche,recherche,produitModifie,nom,prix,stock,setNom,setPrix,setStock,ajout,enregistrermodification,annulerModification,erreurFormulaire}){
        return (
            <>
                  <input 
                        type="text"
                        placeholder="rechercher un produit"
                        value={recherche}
                        onChange={(e)=>setRecherche(e.target.value)}
                   />
                  <select 
                        value={categorie}
                        onChange={(e)=> setCategorie(e.target.value)}>
                        <option value="">selectionnez une categorie</option>
                        <option value="informatique">informatique</option>
                        <option value="electromenager">electromenager</option>

                        <option value="alimentation">alimentation</option>

                        <option value="boisson">boisson</option>
   s
                  </select>
                  <select value={filtreCategorie}
                          onChange={(e)=> setFiltreCategorie(e.target.value)}
                          >
                        <option value="toutes">Toutes les categories</option>
                        <option value="informatique">informatique</option>
                        <option value="alimentation">alimentation</option>
                        <option value="boisson">boisson</option>
                        <option value="electromenager">electromenager</option>


                  </select>
                   
                  <input 
                        placeholder="nom"
                        type='text' 
                        value={nom}
                        onChange={(e)=>setNom(e.target.value)}
                        required
                        
                  />
                  <input 
                        placeholder='stock'
                        value={stock}
                        onChange={(e)=>setStock(e.target.value)}
                        min='0'
                        step='1'
                        required
                        
                    
                  />
                  <input 
                    placeholder='prix'
                    value={prix}
                    onChange={(e)=>setPrix(e.target.value)} 
                    min='0'
                    step='0.01'
                   
                  />
                  {produitModifie===null &&
                    <button onClick={ajout}>AJOUTER</button>
                     }
                      {
                            erreurFormulaire && (
                            <p style={{ color: 'red' }}>
                             {erreurFormulaire}
                            </p>
)
                        }
                     
                 {produitModifie!==null &&
                   ( <>  
                       
                        <button onClick={enregistrermodification}>
                         ENREGISTRER MODIFICATION
                        </button>
                        <button onClick={annulerModification}>ANNULER</button>

                      
                    </>)
                  }
                  </>

        )
}
export default FormulaireProduits