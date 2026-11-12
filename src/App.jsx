import { useState,useEffect } from 'react'

import './App.css'
import ListeUtilisateurs from './ListeUtilisateurs'
import ListeProduits from './ListeProduits'
import FormulaireProduits from './FormulaireProduit'
function verifierFormulaire(nom,prix,stock,categorie){
      if(nom.trim()===''|| prix==='' || stock==='' ){
        return 'Tous les champs sont obligatoires'
    }
    if (categorie===''){
      return 'Choisir une categorie'
    }
    if (Number(prix)<0||Number(stock)<0) {
     
     return("Entrez des valeurs positives pour le prix et le stock.")

    }
    if (!Number.isFinite(Number(prix))||!Number.isFinite(Number(stock))){
      
      return "Entrez un nombre valide pour le prix et le stock"
    }
    if (!Number.isInteger(Number(stock))){
      return"la valeur de stock doit etre un nombre entier"
    }
    return ''
}

function App() {
  const [utilisateurs,setUtilisateurs]=useState([]) 
  const [erreur,setErreur]=useState('')
  const [chargement,setChargement]=useState(true)
  const [erreurFormulaire,setErreurFormulaire]=useState('')
  const [recherhe,setRecherche]=useState('')
  const [filtreStock,setFiltreStock]=useState('tous')
  const [tri,setTri]=useState('aucun')
  const [categorie,setCategorie]=useState('')
  const [filtreCategorie,setFiltreCategorie]=useState('toutes')

  const [Produits, setProduits] = useState(()=>{
  const produitSauvegarde=localStorage.getItem('produits')
    return produitSauvegarde
    ?JSON.parse(produitSauvegarde)
    : [
    {id:1, nom: "PC", prix: 100000, stock: 5, categorie:"informatique" },
    {id:2, nom: "Clavier", prix: 10000, stock: 10, categorie:"informatique" },
    {id:3, nom: "Souris", prix: 5000, stock: 8, categorie:"informatique" }
];
  })
  const[nom,setNom]=useState('')
  const recupererUtilisateur=()=>{
    
    
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> {
        if(!response.ok){
          throw new Error('erreur lors de la recuperation des utilisatreurs!');
          } 
        return response.json()
    })
    .then(data=>{
      setUtilisateurs(data)
       })
    .catch(error=>{
      setErreur(error.message)
    })
    .finally(()=>
      {
        setChargement(false)

      })
 
  }
  useEffect(() => {
      recupererUtilisateur()
  },[])
  const[prix,setPrix]=useState('')
  const[stock,setStock]=useState('')
  const[produitModifie,setProduitmodifie]=useState(null)
  const ajout=()=>{
    setErreurFormulaire('')
    const erreur=verifierFormulaire(nom,prix,stock,categorie)
    if(erreur !==''){
      setErreurFormulaire(erreur)
      return 
    }
    setErreurFormulaire('')
    const nouvelid=
        Produits.length>0
        ?Math.max(...Produits.map(produit=>produit.id))+1
        : 1
    
    
    setProduits([...Produits,{
            nom:nom.trim(),
            prix:Number(prix),
            stock:Number(stock),
            categorie:categorie, 
            id:nouvelid
        }]
    )   
    setNom('')
    setPrix('')
    setStock('')
    setCategorie('')
}
  const suppress=(id)=>{
    const confirmation=window.confirm(
      'voulez-vous supprimer ce produit!?'
    );
    if(confirmation){
    setProduits(Produits.filter(produit=>produit.id!==id))
}
  }
  const update=(id)=>{
    const produit=Produits.find(
      produit=>produit.id===id
    )
    setNom(produit.nom)
    setPrix(produit.prix)
    setStock(produit.stock) 
    setCategorie(produit.categorie)
    setProduitmodifie(id)

  }
  const enregistrermodification =()=>{
    const erreur=verifierFormulaire(nom,prix,stock,categorie)
    if(erreur !==''){
      setErreurFormulaire(erreur)
      return
    }
    
    setErreurFormulaire('')

   
    setProduits(Produits.map(
      produit=>produit.id===produitModifie 
      ? {
        ...produit,             
        nom:nom,
        prix:Number(prix),
        stock:Number(stock),
        categorie:categorie
      }: produit
    ))
    setNom('')
    setPrix('')
    setStock('')
    setCategorie('')
    setProduitmodifie(null)

    
  }   
  const annulerModification=()=>{
    setNom('')
    setStock('')
    setPrix('')
    setCategorie('')
    setProduitmodifie(null)

    
  } 
  useEffect(()=>{
   localStorage.setItem('produits',JSON.stringify(Produits))
  },[Produits])
  const totalproduits=Produits.length
  const ruptureStock=Produits.filter(produit=>produit.stock===0).length
  const stockFaible=Produits.filter(produit=>produit.stock>0 && produit.stock<=2).length
  const valeurTotaleStock=Produits.reduce(
    (total,produit)=>total+produit.prix*produit.stock,
    0
  ) 
  const produitsFiltres=Produits.filter(
    produit=>{
      const correspondRecherche=produit.nom.toLowerCase().includes(recherhe.toLowerCase())
      const correspondFiltre= 
            filtreStock==='tous'||
            (filtreStock==='disponible' && produit.stock>2) ||
            (filtreStock==='faible stock' && produit.stock>0 && produit.stock<=2)||
            (filtreStock==='rupture' && produit.stock===0)
      const correspondCategorie=
            filtreCategorie==='toutes'||
            produit.categorie===filtreCategorie

            return correspondRecherche && correspondFiltre && correspondCategorie
    }
  )
  const produitsTries=[...produitsFiltres].sort((a,b)=> {

      if(tri==='nom-croissant'){
          return a.nom.localeCompare(b.nom)
      }
      if(tri==='nom-decroissant'){
          return b.nom.localeCompare(a.nom)
        
      }
      if(tri==='prix-croissant'){
          return a.prix-b.prix

      }
      if(tri==='prix-decroissant'){
          return b.prix-a.prix

      }
      if(tri==='stock-croissant'){
          return a.stock-b.stock
      }
      if(tri==='stock-decroissant'){
       
        return b.stock-a.stock
      }
      return 0
    }
        
  )
  return (
              <>
              <h2>TABLEAU DE BORD</h2>
              <div className='dashboard-stats'>
               <div className='stat-card'>
                <h3>Total des produits</h3>
                <p>{totalproduits} produits au total</p>
               </div>
               <div className='stat-card'>
                <h3>Produits en rupture:</h3>
                <p>{ruptureStock} produits en rupture</p>
               </div>
               <div className='stat-card'>
                <h3>stockfaible</h3>
                <p>{stockFaible} produits en stock faible</p>
               </div>
               <div className='stat-card'>
                <h3>STOCK TOTAL</h3>
                <p>
                  LE STOCK TOTAL EST:{valeurTotaleStock} FCFA
                </p>
               </div>
               </div> {/* Fermeture de dashboard-stats */}
              
                
             
              

               
              < ListeProduits update={update} suppress={suppress} Produits={produitsTries} stock={stock} />
               
               {chargement ?( 
               
              <p>chargement des utilisateurs.....</p>):
              erreur ? <p>{erreur}</p>:( 
               <ListeUtilisateurs utilisateurs={utilisateurs} />
        )
                    }
             
              <select
                    value={tri}
                    onChange={(e) => setTri(e.target.value)}>
                    <option value="aucun">Aucun tri</option>
                    <option value="nom-croissant">Nom (A-Z)</option>
                    <option value="nom-decroissant">Nom (Z-A)</option>
                    <option value="prix-croissant">Prix croissant</option>
                    <option value="prix-decroissant">Prix décroissant</option>
                    <option value="stock-croissant">Stock croissant</option>
                    <option value="stock-decroissant">Stock décroissant</option>
              </select>
              <select
                    value={filtreStock}
                    onChange={(e) => setFiltreStock(e.target.value)}>
                    <option value="tous">Tous les produits</option>
                    <option value="disponible">Disponibles</option>
                    <option value="faible stock">Stocks faibles</option>
                    <option value="rupture">En rupture de stock</option>
              </select>
              <FormulaireProduits filtreCategorie={filtreCategorie} setFiltreCategorie={setFiltreCategorie}  categorie={categorie} setCategorie={setCategorie} recherche={recherhe} setRecherche={setRecherche}
              setNom={setNom} setPrix={setPrix} setStock={setStock} nom={nom} prix={prix} stock={stock}
              ajout={ajout} annulerModification={annulerModification} 
              enregistrermodification={enregistrermodification} produitModifie={produitModifie}
              erreurFormulaire={erreurFormulaire}
              setErreurFormulaire={setErreurFormulaire}
              />  
                    
                  
              </>          
            )
              


}

export  default App;
