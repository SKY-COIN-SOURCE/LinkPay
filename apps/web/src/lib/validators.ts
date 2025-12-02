// src/lib/validators.ts

export const Validators = {
  // Regex estricto para email
  isValidEmail: (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // Algoritmo básico de estructura IBAN (Simplificado para validación rápida)
  isValidIBAN: (iban: string) => {
    // Eliminar espacios y pasar a mayúsculas
    const cleanIban = iban.replace(/\s/g, '').toUpperCase();
    
    // Verificar longitud mínima (ej. ES es 24, pero permitimos general)
    if (cleanIban.length < 15 || cleanIban.length > 34) return false;

    // Verificar que empiece por dos letras
    if (!/^[A-Z]{2}/.test(cleanIban)) return false;

    // Validación simplificada de formato
    return /^[A-Z0-9]+$/.test(cleanIban);
  },

  // Validar dirección Crypto (ETH/BTC básico)
  isValidCrypto: (address: string) => {
    // Ethereum (0x...) o Bitcoin (1.../3.../bc1...)
    const isEth = /^0x[a-fA-F0-9]{40}$/.test(address);
    const isBtc = /^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(address);
    return isEth || isBtc;
  }
};
