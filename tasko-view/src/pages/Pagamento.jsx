import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../assets/css/pagamentoStyle.css";
import NavbarMenor from '../components/NavbarMenor';
import Carregando from '../components/Carregando';

const Pagamento = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [servico, setServico] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!location.state || !location.state.servico || !location.state.usuario) {
            alert("Dados insuficientes para o pagamento.");
            navigate('/'); // Redireciona para a página inicial se os dados estiverem ausentes
            return;
        }

        setServico(location.state.servico);
        setUsuario(location.state.usuario);
    }, [location, navigate]);

    const handleConfirmarPagamento = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/contratos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    servico: { id: servico.id },
                    usuario: { id: usuario.id },
                }),
            });

            if (response.ok) {
                alert("Pagamento realizado e serviço contratado com sucesso!");
                navigate('/inicio'); // Redireciona para a página inicial ou outra página
            } else {
                alert("Erro ao registrar contrato. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao processar pagamento:", error);
            alert("Erro ao processar pagamento.");
        } finally {
            setLoading(false);
        }
    };

    if (!servico || !usuario) {
        return <Carregando/>
    }

    return (
        <>
            <NavbarMenor link={`/contratar/${servico.id}`} />
            <div className="pagamento-container">
                <h1>Pagamento</h1>
                <p>Descrição do Serviço: {servico.descricao}</p>
                <p>Valor: R$ {servico.valor.toFixed(2)}</p>
                <p>Prestador: {servico.prestador.usuario.nome} {servico.prestador.usuario.sobrenome}</p>
                <button 
                    onClick={handleConfirmarPagamento} 
                    disabled={loading}
                    className="pagamento-botao">
                    {loading ? "Processando..." : "Confirmar Pagamento"}
                </button>
            </div>
        </>
    );
};

export default Pagamento;