import React from "react";

const ContratoUserCard = ({ contrato, onAction }) => {
    // Renderização condicional dos botões
    const renderButtons = () => {
        switch (contrato.status) {
            case "CONCLUIDO":
                return (
                    <>
                        <button
                            className="button-dashboard"
                            onClick={() => onAction(contrato, "avaliar")}
                        >
                            Avaliar
                        </button>
                        <button
                            className="button-dashboard"
                            onClick={() => onAction(contrato, "encerrar")}
                        >
                            Encerrar
                        </button>
                    </>
                );
            default:
                return null;
        }
    };

    // Formatar a data
    const formatarData = (dataISO) => {
        const data = new Date(dataISO);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };


    return (
        <li className="contrato-item">
            <p>
                <strong>Serviço:</strong> {contrato.servico.titulo}
            </p>
            <p>
                <strong>Feito por:</strong> {contrato.servico.prestador.usuario.nome} {contrato.servico.prestador.usuario.sobrenome} - ({contrato.servico.prestador.usuario.email})
            </p>
            <p>
                <strong>Status:</strong> {contrato.status}
            </p>
            <p>
                <strong>Data:</strong> {formatarData(contrato.dataContratacao)}
            </p>

            {renderButtons()}
        </li>
    );
};

export default ContratoUserCard;
