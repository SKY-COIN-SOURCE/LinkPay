import { motion } from "framer-motion";

interface PremiumLoaderProps {
    size?: 'small' | 'medium' | 'large';
    text?: string;
    subtext?: string;
    fullScreen?: boolean;
}

/**
 * Premium Animated Loader - "Obra de Arte" loading component
 * Use across all pages for consistent premium feel
 */
export function PremiumLoader({
    size = 'medium',
    text = 'LINKPAY',
    subtext = 'Cargando...',
    fullScreen = true
}: PremiumLoaderProps) {

    const sizeConfig = {
        small: { orb: 60, ring1: 60, ring2: 50, fontSize: 'text-lg', gap: 3 },
        medium: { orb: 80, ring1: 80, ring2: 65, fontSize: 'text-2xl', gap: 4 },
        large: { orb: 100, ring1: 100, ring2: 82, fontSize: 'text-3xl', gap: 5 }
    };

    const config = sizeConfig[size];

    const content = (
        <motion.div
            className={`flex items-center justify-center flex-col gap-${config.gap}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Premium Animated Logo */}
            <motion.div
                className="relative flex items-center justify-center"
                style={{ width: config.orb, height: config.orb }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {/* Outer ring - rotating gradient */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: config.ring1,
                        height: config.ring1,
                        background: 'conic-gradient(from 0deg, rgba(34, 211, 238, 0.6), rgba(168, 85, 247, 0.4), rgba(34, 197, 94, 0.3), transparent)',
                        WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px))`,
                        mask: `radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px))`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner ring - counter-rotating */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: config.ring2,
                        height: config.ring2,
                        background: 'conic-gradient(from 180deg, rgba(59, 130, 246, 0.5), rgba(249, 115, 22, 0.3), transparent)',
                        WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 1px))`,
                        mask: `radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 1px))`,
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Center orb - pulsing glow */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: config.orb * 0.6,
                        height: config.orb * 0.6,
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(99, 102, 241, 0.1) 60%, transparent 80%)',
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Logo text - LP */}
                <motion.span
                    className={`${config.fontSize} font-bold relative z-10`}
                    style={{
                        background: 'linear-gradient(135deg, #22d3ee, #818cf8, #a855f7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                >
                    LP
                </motion.span>
            </motion.div>

            {/* Loading text */}
            {text && (
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                >
                    <motion.p
                        className="text-slate-300 text-xs font-semibold tracking-[0.25em] uppercase"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        {text}
                    </motion.p>
                    {subtext && (
                        <motion.p
                            className="text-slate-500 text-[10px] mt-1 tracking-wider"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            transition={{ delay: 0.4 }}
                        >
                            {subtext}
                        </motion.p>
                    )}
                </motion.div>
            )}
        </motion.div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center z-50">
                {content}
            </div>
        );
    }

    return content;
}

/**
 * Mini splash loader for quick transitions
 */
export function MiniLoader() {
    return (
        <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className="w-12 h-12 rounded-full"
                style={{
                    background: 'conic-gradient(from 0deg, #22d3ee, #818cf8, #a855f7, transparent)',
                    WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px))`,
                    mask: `radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px))`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>
    );
}

export default PremiumLoader;
