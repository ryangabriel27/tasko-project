import React, { useEffect, useState } from 'react';
import "../assets/css/dashboardStyle.css";
import { useNavigate } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Navbar';
import ContratoCard from '../components/ContratoCard';

const GerenciarMeusServicos = () => {
    const navigate = useNavigate();
    const [contratos, setContratos] = useState([]); // Todos os contratos carregados
    const [filteredContratos, setFilteredContratos] = useState([]); // Contratos exibidos com base na aba
    const [loading, setLoading] = useState(true);
    const [prestador, setPrestador] = useState(null);
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('PENDENTE'); // Estado para a aba ativa

    useEffect(() => {
        const verificarAuth = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/current', {
                    credentials: 'include'
                });

                if (!response.ok) {
                    navigate('/');
                    return;
                }

                const userData = await response.json();
                if (response.ok) {
                    setUser(userData);
                    fetchPrestadorData(userData.id);
                }
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
                navigate('/');
            }
        };

        const fetchPrestadorData = async (userId) => {
            try {
                const response = await fetch(`http://localhost:8080/api/prestadores/usuario/${userId}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const prestadorData = await response.json();
                    setPrestador(prestadorData);
                    fetchContratos(prestadorData.id);
                } else {
                    setPrestador(null);
                    navigate("/inicio");
                }
            } catch (error) {
                console.error("Erro ao buscar prestador:", error);
            }
        };

        const fetchContratos = async (prestadorId) => {
            try {
                const response = await fetch(`http://localhost:8080/api/contratos/prestador/${prestadorId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setContratos(data); // Armazena todos os contratos
                    filterContratos(data, activeTab); // Filtra contratos pela aba ativa
                } else {
                    console.error('Erro ao carregar contratos');
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
            } finally {
                setLoading(false);
            }
        };

        verificarAuth();
    }, [navigate]);

    const filterContratos = (allContratos, status) => {
        const filtered = allContratos.filter((contrato) => contrato.status === status);
        setFilteredContratos(filtered);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        filterContratos(contratos, tab); // Atualiza os contratos filtrados
    };


    const handleAction = async (id, action) => {
        try {
            const response = await fetch(`http://localhost:8080/api/contratos/${id}/status?acao=${action}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                alert(`Contrato ${action === 'finalizar' ? 'finalizado' : action === 'cancelar' ? 'cancelado' : action === 'aceitar' ? 'aceito' : 'recusado'} com sucesso!`);
                setContratos(contratos.filter((contrato) => contrato.id !== id));
            } else {
                alert('Erro ao atualizar contrato.');
            }
        } catch (error) {
            console.error('Erro ao atualizar contrato:', error);
        }
    };

    if (loading) {
        return <Carregando />
    }

    return (
        <>
            <Header />
            
            {/* Se tirar isso fode tudo, tmj */}
            <main style={{ marginTop: "60px" }}>

            </main>
            <div className="dashboard">
                <h1 className='title-dashboard'>Gerenciar Meus Serviços</h1>

                {/* Abas */}
                <div className="tabs">
                    {['PENDENTE', 'EM ANDAMENTO', 'CONCLUIDO', 'FINALIZADO'].map((tab) => (
                        <button
                            key={tab}
                            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => handleTabChange(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Conteúdo */}
                {filteredContratos.length === 0 ? (
                    <p>Nenhum serviço para esta categoria.</p>
                ) : (
                    <ul>
                        {filteredContratos.map((contrato) => (
                            <ContratoCard
                                key={contrato.id}
                                className="card-contrato"
                                contrato={contrato}
                                onAction={handleAction}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default GerenciarMeusServicos;
