import React, { useEffect, useState } from 'react';
import "../assets/css/dashboardStyle.css";
import { useNavigate } from 'react-router-dom';
import Carregando from '../components/Carregando';

const MeusServicosContratados = () => {
    const navigate = useNavigate();
    const [contratos, setContratos] = useState([]);
    const [loading, setLoading] = useState(true);
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
                setUser(userData);
                fetchContratos();
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
                navigate('/');
            }
        };

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

        verificarAuth();
        fetchContratos();
    }, [navigate]);

    if (loading) {
        return <Carregando/>
    }

    return (
        <div className="dashboard">
            <h1>Meus Serviços Contratados</h1>
            {contratos.length === 0 ? (
                <p>Você ainda não contratou nenhum serviço.</p>
            ) : (
                <ul>
                    {contratos.map((contrato) => (
                        <li key={contrato.id} className="contrato-item">
                            <p><strong>Serviço:</strong> {contrato.servico.descricao}</p>
                            <p><strong>Prestador:</strong> {contrato.servico.prestador.usuario.nome}</p>
                            <p><strong>Status:</strong> {contrato.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MeusServicosContratados;
