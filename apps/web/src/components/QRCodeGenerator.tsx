import React from 'react';
import { Download } from 'lucide-react';

interface QRCodeGeneratorProps {
    url: string;
    username: string;
    accentColor?: string;
}

export function QRCodeGenerator({ url, username, accentColor = '#6366f1' }: QRCodeGeneratorProps) {
    // Use QR Server API for real, scannable QR codes
    const safeColor = (accentColor || '#6366f1').replace('#', '');
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&color=${safeColor}&bgcolor=FFFFFF&margin=10`;

    // Extract display URL from the actual URL passed
    const displayUrl = (() => {
        try {
            const urlObj = new URL(url);
            return `${urlObj.host}${urlObj.pathname}`;
        } catch {
            return url;
        }
    })();

    const downloadQR = async () => {
        try {
            const response = await fetch(qrApiUrl);
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `linkpay-${username}-qr.png`;
            link.href = downloadUrl;
            link.click();
            URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading QR:', error);
        }
    };

    return (
        <div className="lp-qr-container">
            <div className="lp-qr-preview">
                <img
                    src={qrApiUrl}
                    alt={`QR Code for ${username}`}
                    style={{ width: 150, height: 150, borderRadius: 8 }}
                />
            </div>
            <div className="lp-qr-info">
                <p className="lp-qr-url">{displayUrl}</p>
                <button className="lp-btn-basic lp-btn-secondary" onClick={downloadQR}>
                    <Download size={14} />
                    Descargar PNG
                </button>
            </div>
        </div>
    );
}

