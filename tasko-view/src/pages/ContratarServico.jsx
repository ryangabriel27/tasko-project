import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../assets/css/contratarStyle.css";
import NavbarMenor from '../components/NavbarMenor';

const ContratarServico = () => {
    const { id } = useParams(); // Captura o ID do serviço da URL
    const navigate = useNavigate();
    const [servico, setServico] = useState(null);
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState(null); // Estado para o usuário autenticado

    useEffect(() => {
        const verificarAuth = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/current', {
                    credentials: 'include',
                });

                if (!response.ok) {
                    navigate('/'); // Redireciona para login se não autenticado
                    return;
                }

                const userData = await response.json();
                setUsuario(userData); // Salva o usuário autenticado
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
                navigate('/'); // Redireciona para login em caso de erro
            }
        };

        const fetchServico = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/servicos/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setServico(data);
                } else {
                    console.error('Erro ao carregar serviço:', response.status);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
            } finally {
                setLoading(false);
            }
        };

        verificarAuth(); // Verifica se o usuário está autenticado
        fetchServico(); // Busca os dados do serviço
    }, [id, navigate]);

    const handlePagamento = () => {
        if (!usuario) {
            alert('Usuário não autenticado.');
            return;
        }

        if (servico.prestador.usuario.id === usuario.id) {
            alert('Você não pode contratar o próprio serviço');
            return;
        }

        // Redireciona para a página de pagamento com os dados do serviço
        navigate(`/pagamento/${id}`, {
            state: {
                servico,
                usuario,
            },
        });
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!servico) {
        return <div>Serviço não encontrado.</div>;
    }

    return (
        <>
            <NavbarMenor link={`/perfil-prestador/${servico.prestador.id}`} />
            <div className="contratar-servico">
                <h1>{servico.descricao}</h1>
                <p>Valor: R$ {servico.valor.toFixed(2)}</p>
                <p>Prestador: {servico.prestador.usuario.nome} {servico.prestador.usuario.sobrenome}</p>
                <button onClick={handlePagamento}>Ir para Pagamento</button>
            </div>
        </>
    );
};

export default ContratarServico;
