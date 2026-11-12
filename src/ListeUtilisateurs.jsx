function ListeUtilisateurs({utilisateurs}){
    return (
        <>
            {
                utilisateurs.map(utilisateur=>(
                    <p key={utilisateur.id}>
                       {utilisateur.id} {utilisateur.name}
                    </p>
                ))
            }
        </>
    )
}
export default ListeUtilisateurs