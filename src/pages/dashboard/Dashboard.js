import styles from './Dashboard.module.css'

//APIs e Hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

import Swal from 'sweetalert2'


import { Link } from 'react-router-dom'

const Dashboard = () => {
  //autenticação para captura do id unico do usuario
  const { user } = useAuthValue();
  const uid = user.uid;

  //API dos posts
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid)

  const { deleteDocument } = useDeleteDocument("posts")



  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                    Editar
                  </Link>
                  <button onClick={() => {
                    Swal.fire({
                      title: 'Tem certeza disso?',
                      text: "Você não pode desfazer essa ação.",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Sim, excluir!',
                      cancelButtonText: 'Cancelar'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteDocument(post.id)
                        Swal.fire(
                          'Excluido!',
                          'Seu post foi excluido com sucesso.',
                          'success'
                        )
                      }
                    })
                  }} className="btn btn-outline btn-danger">
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}


    </div>
  )
}

export default Dashboard