import React from 'react';
import { Button, Modal, QRCode } from 'antd';
import { QrcodeOutlined, DownloadOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';

const QrCodeModal = ({ qrCodeLink }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const qrCodeRef = React.useRef();

  function downloadQrCode() {
    const image = qrCodeRef.current;
    html2canvas(image, {
      logging: true,
      letterRendering: 1,
      allowTaint: false,
      useCORS: true,
    }).then(function (canvas) {
      const base64image = canvas.toDataURL('image/png');
      var anchor = document.createElement('a');
      anchor.setAttribute('href', base64image);
      anchor.setAttribute('download', `code-${Math.floor(Math.random() * 3)}`);
      anchor.click();
      anchor.remove();
      setIsModalOpen(false);
    });
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        size="large"
        icon={<QrcodeOutlined />}
        block
      >
        Generate QrCode
      </Button>
      <Modal
        title="Scan or download QrCode"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" color="" onClick={handleCancel} danger>
            Cancel
          </Button>,
          <Button
            key="submit"
            icon={<DownloadOutlined />}
            type="primary"
            onClick={downloadQrCode}
          >
            Download
          </Button>,
        ]}
      >
        <div ref={qrCodeRef} className="flex justify-items-center w-fit">
          {' '}
          <QRCode type="svg" value={qrCodeLink} />
        </div>
      </Modal>
    </>
  );
};
export default QrCodeModal;
