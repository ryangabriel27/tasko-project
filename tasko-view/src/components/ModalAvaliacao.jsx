import React, { useState } from 'react';

const ModalAvaliacao = ({ userId, contrato, onSubmit, onClose }) => {
    const [nota, setNota] = useState(0);
    const [comentario, setComentario] = useState('');


    const handleSubmit = () => {
        onSubmit({
            nota,
            comentario,
            userId: contrato.usuario.id,  // Pega o ID do usuário do contrato
            prestadorId: contrato.servico.prestador.id  // Pega o ID do prestador do contrato
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Avaliar Serviço</h2>
                <label>
                    Nota (0 a 5):
                    <input
                        type="number"
                        min="0"
                        max="5"
                        value={nota}
                        onChange={(e) => setNota(Number(e.target.value))}
                    />
                </label>
                <label>
                    Comentário:
                    <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        
                    />
                </label>
                <div className="modal-buttons">
                    <button onClick={handleSubmit}>Enviar Avaliação</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalAvaliacao;
