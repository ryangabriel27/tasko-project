import React, { useEffect, useState } from 'react';
import "../assets/css/dashboardStyle.css";
import { useNavigate } from 'react-router-dom';
import Carregando from '../components/Carregando';

const GerenciarMeusServicos = () => {
    const navigate = useNavigate();
    const [contratos, setContratos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prestador, setPrestador] = useState(null);
    const [user, setUser] = useState(null);

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
                    setUser(userData); // Atualiza o estado do usuário
                    fetchPrestadorData(userData.id); // Chama fetchPrestadorData com userId
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
                    fetchContratos(prestadorData.id); // Chama fetchContratos com prestadorId
                } else {
                    setPrestador(null);
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

        verificarAuth();
    }, [navigate]);

    const handleAction = async (id, action) => {
        try {
            const response = await fetch(`http://localhost:8080/api/contratos/${id}/${action}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                alert(`Contrato ${action === 'finalizar' ? 'finalizado' : 'cancelado'} com sucesso!`);
                setContratos(contratos.filter((contrato) => contrato.id !== id));
            } else {
                alert('Erro ao atualizar contrato.');
            }
        } catch (error) {
            console.error('Erro ao atualizar contrato:', error);
        }
    };

    if (loading) {
        return <Carregando/>
    }

    return (
        <div className="dashboard">
            <h1 className='title-dashboard'>Gerenciar Meus Serviços</h1>
            {contratos.length === 0 ? (
                <p>Nenhum serviço foi contratado ainda.</p>
            ) : (
                <ul>
                    {contratos.map((contrato) => (
                        <li key={contrato.id} className="contrato-item">
                            <p><strong>Serviço:</strong> {contrato.servico.descricao}</p>
                            <p><strong>Contratado por:</strong> {contrato.usuario.nome}</p>
                            <p><strong>Status:</strong> {contrato.status}</p>
                            <button className='button-dashboard' onClick={() => handleAction(contrato.id, 'finalizar')}>
                                Finalizar
                            </button>
                            <button className='button-dashboard' onClick={() => handleAction(contrato.id, 'cancelar')}>
                                Cancelar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GerenciarMeusServicos;
