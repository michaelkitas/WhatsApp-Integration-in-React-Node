import React, { useState } from "react";
import axios from "axios";
var QRCode = require("qrcode.react");

const App = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [msg, setMessage] = useState("");
  const [qrcode, setQRCode] = useState(false);

  const getQRCode = async () => {
    setLoading(true);
    const res = await axios.post("/api", { phone, msg });
    setQRCode(res.data);
    setLoading(false);
  };

  return (
    <div>
      Phone Number:
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      Message:
      <input value={msg} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={getQRCode}>Get QRCode</button>
      {!loading && qrcode && (
        <div style={{ margin: "100px" }}>
          <QRCode value={qrcode} />
        </div>
      )}
      {loading && "Waiting for QRCode..."}
    </div>
  );
};

export default App;
