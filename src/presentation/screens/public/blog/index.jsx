import React, { useState, useEffect } from "react";
import { strapi } from "../../../../services/strapi";
import { PublicTemplate } from "../../../atomic/template";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const fetchBlogPosts = async () => {
        try {
            setLoading(true);

            const response = await strapi.get("/api/artigos?populate=*"); // ✅ corrigido

            const data = response.data?.data || [];

            setPosts(data);
            setFilteredPosts(data);
            console.log(response.data);
        } catch (err) {
            console.error("Erro detalhado:", err.response || err);
            setError("Erro ao carregar posts do blog");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = posts.filter((post) =>
            post.attributes?.titulo?.toLowerCase().includes(term) ||
            post.attributes?.descricao?.toLowerCase().includes(term)
        );

        setFilteredPosts(filtered);
    };

    const handleLerMais = (slug) => {
        if (!slug) return;
        navigate(`/blog/${slug}`);
    };

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const getImageUrl = (post) => {
        const image = post.attributes?.imagem?.data?.attributes?.url;

        if (!image) return "/placeholder.jpg";

        return `http://localhost:1337${image}`;
    };

    return (
        <PublicTemplate>
            <div className={styles.page}>
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <h1 className={styles.title}>Blog - Flor de Lótus</h1>
                        <p className={styles.description}>
                            O Blog do nosso consultório é atualizado toda semana com os temas
                            mais atuais nos atendimentos de psicologia clínica.
                        </p>
                        <p className={styles.description}>
                            Aqui, você pode encontrar diversos artigos que servem de aprendizado
                            e conhecimento!
                        </p>
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <input
                        type="text"
                        placeholder="Digite o que deseja procurar..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                {loading ? (
                    <div className={styles.loading}>Carregando posts...</div>
                ) : error ? (
                    <div className={styles.error}>{error}</div>
                ) : filteredPosts.length > 0 ? (
                    <div className={styles.postsGrid}>
                        {filteredPosts.map((post) => (
                            <article key={post.id} className={styles.postCard}>
                                <div className={styles.postImage}>
                                    <img
                                        src={
                                            post.imagem?.url
                                                ? `http://localhost:1337${post.imagem.url}`
                                                : "/placeholder.jpg"
                                        }
                                        alt={post.titulo}
                                    />

                                    {post.categoria && (
                                        <span className={styles.categoryBadge}>
                                            {post.categoria}
                                        </span>
                                    )}
                                </div>

                                <div className={styles.postContent}>
                                    <h3 className={styles.postTitle}>
                                        {post.titulo}
                                    </h3>

                                    <p className={styles.postDescription}>
                                        {post.conteudo?.substring(0, 180)}...
                                    </p>

                                    <div className={styles.postFooter}>
                                        <span className={styles.postDate}>
                                            {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
                                        </span>

                                        <button
                                            className={styles.readMoreBtn}
                                            onClick={() => navigate(`/blog/${post.slug}`)}
                                        >
                                            Leia mais
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}

                    </div>
                ) : (
                    <div className={styles.noResults}>
                        Nenhum post encontrado para "{searchTerm}"
                    </div>
                )}
            </div>
        </PublicTemplate>
    );
};

export default Blog;