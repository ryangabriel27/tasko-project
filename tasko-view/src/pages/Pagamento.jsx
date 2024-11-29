import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../assets/css/pagamentoStyle.css";
import NavbarMenor from '../components/NavbarMenor';
import Carregando from '../components/Carregando';
import QRCodePix from '../assets/img/qrcode-pix.png';

const Pagamento = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [servico, setServico] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formaPagamento, setFormaPagamento] = useState(''); // Estado para controlar a forma de pagamento selecionada

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

    const handleFormaPagamentoChange = (event) => {
        setFormaPagamento(event.target.value);
    };

    if (!servico || !usuario) {
        return <Carregando />;
    }

    return (
        <>
            <NavbarMenor link={`/contratar/${servico.id}`} />
            <div className="pagamento-container">
                <h1>Pagamento</h1>
                <p>Descrição do Serviço: {servico.descricao}</p>
                <p>Valor: R$ {servico.valor.toFixed(2)}</p>
                <p>Prestador: {servico.prestador.usuario.nome} {servico.prestador.usuario.sobrenome}</p>
                <h3>Forma de pagamento</h3>
                <input
                    type="radio"
                    id="pix"
                    name="formaPagamento"
                    value="Pix"
                    onChange={handleFormaPagamentoChange}
                />
                <label htmlFor="pix">Pix</label><br />
                <input
                    type="radio"
                    id="cartaoDebito"
                    name="formaPagamento"
                    value="Cartão de débito"
                    onChange={handleFormaPagamentoChange}
                />
                <label htmlFor="cartaoDebito">Cartão de débito</label><br />
                <input
                    type="radio"
                    id="cartaoCredito"
                    name="formaPagamento"
                    value="Cartão de crédito"
                    onChange={handleFormaPagamentoChange}
                />
                <label htmlFor="cartaoCredito">Cartão de crédito</label><br />
                
                {formaPagamento === 'Pix' && (
                    <div className='imgQrcode'>
                        <p>QRCode para pagamento:</p>
                        <img src={QRCodePix} alt="Imagem Pix" />
                    </div>
                )}

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
