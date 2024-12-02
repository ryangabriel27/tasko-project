import React, { useEffect, useState } from 'react';
import "../assets/css/dashboardStyle.css";
import { useNavigate } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Navbar';
import ContratoUserCard from '../components/ContratoUserCard';
import ModalAvaliacao from '../components/ModalAvaliacao';

const MeusServicosContratados = () => {
    const navigate = useNavigate();
    const [contratos, setContratos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [abaAtiva, setAbaAtiva] = useState('PENDENTE');
    const [modalAvaliacao, setModalAvaliacao] = useState(null); // Estado para controlar o modal

    useEffect(() => {
        const verificarAuth = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/current', {
                    credentials: 'include',
                });

                if (!response.ok) {
                    navigate('/');
                    return;
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
                navigate('/');
            }
        };

        if (user) {
            const fetchContratos = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/contratos/usuario/${user.id}`, {
                        method: 'GET',
                        credentials: 'include',
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setContratos(data);
                    } else {
                        console.error('Erro ao carregar contratos');
                    }
                } catch (error) {
                    console.error('Erro na requisição:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchContratos();
        }

        verificarAuth();
    }, [navigate, user]);

    const handleAction = async (contrato, action) => {
        if (action === "avaliar") {
            console.log(contrato);
            setModalAvaliacao({ contrato }); // Abre o modal para avaliação
        } else {
            try {
                const response = await fetch(`http://localhost:8080/api/contratos/${contrato.id}/status?acao=${action}`, {
                    method: 'POST',
                    credentials: 'include',
                });

                if (response.ok) {
                    alert(`Contrato ${action === 'finalizar' ? 'finalizado' : action === 'cancelar' ? 'cancelado' : action === 'aceitar' ? 'aceito' : 'recusado'} com sucesso!`);
                    setContratos(contratos.filter((c) => c.id !== contrato.id));
                } else {
                    alert('Erro ao atualizar contrato.');
                }
            } catch (error) {
                console.error('Erro ao atualizar contrato:', error);
            }
        }

    };

    const handleSubmitAvaliacao = async (avaliacao) => {
        if (!avaliacao.nota || !avaliacao.comentario || !avaliacao.userId || !avaliacao.prestadorId) {
            console.log(avaliacao);
            alert('Todos os campos são obrigatórios');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8080/api/avaliacoes`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nota: avaliacao.nota,
                    comentario: avaliacao.comentario,
                    usuario: { id: avaliacao.userId },
                    prestador: { id: avaliacao.prestadorId },
                }),
            });
    
            if (response.ok) {
                alert('Avaliação enviada com sucesso!');
                setModalAvaliacao(null); // Fecha o modal
            } else {
                alert('Erro ao enviar avaliação.');
            }
        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
        }
    };

    if (loading) {
        return <Carregando />;
    }

    // Filtros para os contratos
    const filteredContratos = contratos.filter(
        (contrato) => contrato.status === abaAtiva
    );

    return (
        <>
            <Header />

            {/* Se tirar isso fode tudo, tmj */}
            <main style={{ marginTop: "60px" }}>

            </main>
            <div className="dashboard">
                <h1>Meus Serviços Contratados</h1>

                <div className="tabs">
                    <button
                        className={`tab-button ${abaAtiva === 'PENDENTE' ? 'active' : ''}`}
                        onClick={() => setAbaAtiva('PENDENTE')}
                    >
                        Pendente
                    </button>
                    <button
                        className={`tab-button ${abaAtiva === 'EM ANDAMENTO' ? 'active' : ''}`}
                        onClick={() => setAbaAtiva('EM ANDAMENTO')}
                    >
                        Em Andamento
                    </button>
                    <button
                        className={`tab-button ${abaAtiva === 'CONCLUIDO' ? 'active' : ''}`}
                        onClick={() => setAbaAtiva('CONCLUIDO')}
                    >
                        Concluído
                    </button>
                    <button
                        className={`tab-button ${abaAtiva === 'FINALIZADO' ? 'active' : ''}`}
                        onClick={() => setAbaAtiva('FINALIZADO')}
                    >
                        Finalizado
                    </button>
                </div>

                {filteredContratos.length === 0 ? (
                    <p>Não há serviços com o status "{abaAtiva}".</p>
                ) : (
                    <ul className="contratos-lista">
                        {filteredContratos.map((contrato) => (
                            <ContratoUserCard
                                key={contrato.id}
                                contrato={contrato}
                                onAction={handleAction}
                            />
                        ))}
                    </ul>
                )}

                {modalAvaliacao && (
                    <ModalAvaliacao
                        contrato={modalAvaliacao.contrato}
                        onSubmit={handleSubmitAvaliacao}
                        onClose={() => setModalAvaliacao(null)}
                    />
                )}
            </div>
        </>
    );
};

export default MeusServicosContratados;
