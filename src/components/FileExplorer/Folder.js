import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const Folder = ({ name, children, onAddFolder, onDeleteFolder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      onAddFolder(newFolderName);
      setNewFolderName(""); // Reseta o nome da pasta
      setShowAddModal(false); // Fecha o modal
    }
  };

  const handleDeleteFolder = () => {
    onDeleteFolder();
    setShowDeleteModal(false); // Fecha o modal
  };

  return (
    <div style={{ marginLeft: 20, marginTop: 20 }}>
      <div style={{ cursor: "pointer", fontWeight: "bold" }} onClick={toggleFolder}>
        {isOpen ? "📂" : "📁"} {name}
        <Button
          variant="success"
          size="sm"
          style={{ marginLeft: 10 }}
          onClick={() => setShowAddModal(true)}
        >
          + Adicionar Estação
        </Button>
        <Button
          variant="danger"
          size="sm"
          style={{ marginLeft: 10 }}
          onClick={() => setShowDeleteModal(true)}
        >
          Excluir
        </Button>
      </div>
      {isOpen && <div style={{ marginLeft: 20 }}>{children}</div>}

      {/* Modal para adicionar pasta */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Nova Estação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Digite o nome da nova Estação"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddFolder}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmar exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja realmente excluir a Estação "{name}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteFolder}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Folder;
