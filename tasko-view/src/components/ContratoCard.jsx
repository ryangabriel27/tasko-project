import React from "react";

const ContratoCard = ({ contrato, onAction }) => {
    // Renderização condicional dos botões
    const renderButtons = () => {
        switch (contrato.status) {
            case "PENDENTE":
                return (
                    <>
                        <button
                            className="button-dashboard"
                            onClick={() => onAction(contrato.id, "aceitar")}
                        >
                            Aceitar
                        </button>
                        <button
                            className="button-dashboard"
                            onClick={() => onAction(contrato.id, "recusar")}
                        >
                            Recusar
                        </button>
                    </>
                );
            case "EM ANDAMENTO":
                return (
                    <>
                        <button
                            className="button-dashboard"
                            onClick={() => onAction(contrato.id, "finalizar")}
                        >
                            Finalizar
                        </button>
                        <button
                            className="button-dashboard"
                            onClick={() => onAction(contrato.id, "cancelar")}
                        >
                            Cancelar
                        </button>
                    </>
                );
            case "CONCLUIDO":
                return null; // Sem botões para contratos concluídos
            case "CANCELADO":
                return null;
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
                <strong>Contratado por:</strong> {contrato.usuario.nome} {contrato.usuario.sobrenome} - ({contrato.usuario.email})
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

export default ContratoCard;
