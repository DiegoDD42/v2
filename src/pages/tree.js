import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

// representação do nó
const TreeNode = ({ node, onAddChild, onDelete, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(node.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    node.name = newName;
    setIsEditing(false);
  };

  return (
    <div className="tree-node mb-2">
      {/* Botão para expandir/colapsar a árvore */}
      {node.children.length > 0 && (
        <button className="btn btn-link p-0" onClick={() => onToggle(node)}>
          {node.isExpanded ? '🔽' : '▶️'}
        </button>
      )}
      {/* Se estiver em modo de edição, exibe um campo de entrada */}
      {isEditing ? (
        <>
          <input
            type="text"
            className="form-control d-inline w-50"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="btn btn-primary btn-sm ms-2" onClick={handleSave}>Salvar</button>
        </>
      ) : (
        <>
          <span className="fw-bold">{node.name}</span>
          <button className="btn btn-info btn-sm ms-2" onClick={handleEdit}>Editar</button>
          <button className="btn btn-danger btn-sm ms-2" onClick={() => onDelete(node)}>Excluir</button>
          <button className="btn btn-success btn-sm ms-2" onClick={() => onAddChild(node)}>Adicionar Filho</button>
        </>
      )}
      {/* Renderiza os filhos do nó, se estiver expandido */}
      {node.isExpanded && node.children.length > 0 && (
        <div className="ms-3">
          {node.children.map((child, index) => (
            <TreeNode
              key={index}
              node={child}
              onAddChild={onAddChild}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Componente principal da árvore
const Tree = () => {
  const [treeData, setTreeData] = useState({
    name: 'C:',
    children: [
      {
        name: 'Documentos',
        isExpanded: false,
        children: [
          { name: 'Relatório.docx', isExpanded: false, children: [] },
          { name: 'Resumo.pdf', isExpanded: false, children: [] }
        ]
      },
      {
        name: 'Imagens',
        isExpanded: false,
        children: [
          { name: 'Foto1.jpg', isExpanded: false, children: [] },
          { name: 'Foto2.png', isExpanded: false, children: [] }
        ]
      },
      {
        name: 'Música',
        isExpanded: false,
        children: [
          { name: 'Canção.mp3', isExpanded: false, children: [] }
        ]
      }
    ]
  });

  // Função para adicionar um filho a um nó pai
  const addChild = (parent) => {
    const name = prompt('Digite o nome do novo nó:');
    if (name) {
      const newChild = { name, isExpanded: false, children: [] };
      parent.children.push(newChild);
      setTreeData({ ...treeData });
    }
  };

  // Função para deletar um nó da árvore
  const deleteNode = (nodeToDelete) => {
    const deleteRecursively = (node) => {
      node.children = node.children.filter((child) => child !== nodeToDelete);
      node.children.forEach(deleteRecursively);
    };

    deleteRecursively(treeData);
    setTreeData({ ...treeData });
  };

  // Função para alternar a expansão de um nó
  const toggleNode = (node) => {
    node.isExpanded = !node.isExpanded;
    setTreeData({ ...treeData });
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Funciona krai</h5>
      </div>
      <div className="card-body">
        <TreeNode node={treeData} onAddChild={addChild} onDelete={deleteNode} onToggle={toggleNode} />
      </div>
    </div>
  );
};

export default Tree;
