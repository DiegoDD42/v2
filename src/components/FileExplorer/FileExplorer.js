import React, { useState } from "react";
import Folder from "./Folder";

const FileExplorer = () => {
  const [folderTree, setFolderTree] = useState({
    name: "Estação Central",
    children: [],
  });

  const addFolder = (path, folderName) => {
    const addToTree = (node, path) => {
      if (path.length === 0) {
        node.children.push({ name: folderName, children: [] });
        return node;
      }

      const [nextFolder, ...remainingPath] = path;
      const child = node.children.find((child) => child.name === nextFolder);

      if (child) {
        const updatedChild = addToTree(child, remainingPath);
        return {
          ...node,
          children: node.children.map((c) =>
            c.name === nextFolder ? updatedChild : c
          ),
        };
      }
      return node;
    };

    setFolderTree((prevTree) => addToTree({ ...prevTree }, path));
  };

  const deleteFolder = (path) => {
    console.log("Caminho para deleção:", path);

    const removeFromTree = (node, path) => {
      if (path.length === 1) {
        // Remove o nó filho correspondente
        return {
          ...node,
          children: node.children.filter((child) => child.name !== path[0]),
        };
      }
  
      const [nextFolder, ...remainingPath] = path;
  
      return {
        ...node,
        children: node.children.map((child) =>
          child.name === nextFolder
            ? removeFromTree(child, remainingPath)
            : child
        ),
      };
    };
  
    setFolderTree((prevTree) => {
      const updatedTree = removeFromTree(prevTree, path);
      console.log("Árvore atualizada após remoção:", JSON.stringify(updatedTree, null, 2));
      return updatedTree;
    });
  };
  

  const renderTree = (node, path = []) => (
    <Folder
      key={node.name}
      name={node.name}
      onAddFolder={(folderName) => addFolder(path, folderName)}
      onDeleteFolder={() => deleteFolder(path)} // Apenas passe o path atual
    >
      {node.children.map((child) => renderTree(child, [...path, child.name]))}
    </Folder>
  );
  
  
  return <div>{renderTree(folderTree)}</div>;
};

export default FileExplorer;
