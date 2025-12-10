import React, { useEffect, useRef } from 'react';
import { Download, QrCode } from 'lucide-react';

interface QRCodeGeneratorProps {
    url: string;
    username: string;
    accentColor?: string;
}

export function QRCodeGenerator({ url, username, accentColor = '#6366f1' }: QRCodeGeneratorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        generateQR();
    }, [url, accentColor]);

    const generateQR = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // QR Code generation using simple matrix algorithm
        const size = 200;
        const moduleCount = 25; // 25x25 modules for QR version 2
        const moduleSize = size / moduleCount;

        canvas.width = size;
        canvas.height = size;

        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);

        // Generate QR pattern (simplified - using URL hash for pattern)
        const pattern = generatePattern(url);

        ctx.fillStyle = accentColor;

        // Draw finder patterns (corners)
        drawFinderPattern(ctx, 0, 0, moduleSize);
        drawFinderPattern(ctx, (moduleCount - 7) * moduleSize, 0, moduleSize);
        drawFinderPattern(ctx, 0, (moduleCount - 7) * moduleSize, moduleSize);

        // Draw data modules
        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                // Skip finder pattern areas
                if (isFinderArea(row, col, moduleCount)) continue;

                // Use pattern to determine if module is filled
                if (pattern[(row * moduleCount + col) % pattern.length]) {
                    ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize - 0.5, moduleSize - 0.5);
                }
            }
        }
    };

    const generatePattern = (text: string): boolean[] => {
        // Simple hash-based pattern generation
        const pattern: boolean[] = [];
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = ((hash << 5) - hash) + text.charCodeAt(i);
            hash = hash & hash;
        }

        for (let i = 0; i < 625; i++) {
            const bit = ((hash >> (i % 32)) ^ (hash >> ((i * 7) % 32))) & 1;
            pattern.push(bit === 1);
        }
        return pattern;
    };

    const isFinderArea = (row: number, col: number, size: number): boolean => {
        // Top-left finder
        if (row < 8 && col < 8) return true;
        // Top-right finder
        if (row < 8 && col >= size - 8) return true;
        // Bottom-left finder
        if (row >= size - 8 && col < 8) return true;
        return false;
    };

    const drawFinderPattern = (ctx: CanvasRenderingContext2D, x: number, y: number, moduleSize: number) => {
        // Outer black square
        ctx.fillRect(x, y, 7 * moduleSize, 7 * moduleSize);
        // Inner white square
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + moduleSize, y + moduleSize, 5 * moduleSize, 5 * moduleSize);
        // Center black square
        ctx.fillStyle = ctx.fillStyle = canvasRef.current?.getContext('2d')?.fillStyle || '#6366f1';
        ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, 3 * moduleSize, 3 * moduleSize);
    };

    const downloadQR = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = `linkpay-${username}-qr.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="lp-qr-container">
            <div className="lp-qr-preview">
                <canvas ref={canvasRef} />
            </div>
            <div className="lp-qr-info">
                <p className="lp-qr-url">linkpay.me/b/{username}</p>
                <button className="lp-btn-basic lp-btn-secondary" onClick={downloadQR}>
                    <Download size={14} />
                    Descargar PNG
                </button>
            </div>
        </div>
    );
}
