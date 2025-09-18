import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AiModal = ({ show, handleClose }) => (
  <Modal
    show={show}
    onHide={handleClose}
    centered
    size="lg"
    dialogClassName="modal-90w"
    contentClassName="bg-black text-white"
  >
 <Modal.Header
  style={{
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "none", // removes the default border
    padding: "1rem 1.5rem" // optional: adjust spacing if needed
  }}
>
  <Modal.Title className="text-white">Chat with AI-Bot</Modal.Title>
  <button
    type="button"
    onClick={handleClose}
    aria-label="Close"
    style={{
      background: "transparent",
      border: "none",
      color: "gray",
      fontSize: "2rem", // bigger cross
      cursor: "pointer",
      lineHeight: 1
    }}
  >
    &times;
  </button>
</Modal.Header>



    <Modal.Body style={{ padding: 0 }}>
      <iframe
        title="Botpress Webchat"
        src="https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/08/28/02/20250828021207-KNIVPRG8.json"
        style={{ width: "100%", height: "80vh", border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </Modal.Body>
  </Modal>
);

export default AiModal;
