import React from 'react';
import QRCode from 'qrcode.react';

function QRCodeGenerator({ url }) {
  return (
    <div>
      <QRCode value={url} />
    </div>
  );
}

export default QRCodeGenerator;
