import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { strapi } from "@/services/strapi";
import { PublicTemplate } from "@/presentation/atomic/template";

const BlogDetalhe = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await strapi.get(
        `/api/artigos?filters[slug][$eq]=${slug}&populate=*`
      );

      const data = response.data.data[0];
      setPost(data);
    } catch (error) {
      console.error("Erro ao carregar artigo:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!post) return <p>Artigo não encontrado.</p>;

  return (
    <PublicTemplate>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
        <h1>{post.titulo}</h1>

        {post.imagem?.url && (
          <img
            src={`http://localhost:1337${post.imagem.url}`}
            alt={post.titulo}
            style={{ width: "100%", borderRadius: 8, margin: "20px 0" }}
          />
        )}

        <p style={{ color: "#777", marginBottom: 20 }}>
          {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
        </p>

        <div style={{ lineHeight: 1.8 }}>
          {post.conteudo}
        </div>
      </div>
    </PublicTemplate>
  );
};

export default BlogDetalhe;