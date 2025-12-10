import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'cyan';
  label?: string;
  description?: string;
}

export function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  color = 'blue',
  label,
  description
}: ToggleSwitchProps) {
  const sizes = {
    sm: { track: { width: 36, height: 20 }, thumb: 14, translate: 16 },
    md: { track: { width: 44, height: 24 }, thumb: 18, translate: 20 },
    lg: { track: { width: 52, height: 28 }, thumb: 22, translate: 24 }
  };

  const colors = {
    blue: { active: '#3b82f6', glow: 'rgba(59, 130, 246, 0.5)' },
    green: { active: '#22c55e', glow: 'rgba(34, 197, 94, 0.5)' },
    purple: { active: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.5)' },
    orange: { active: '#f97316', glow: 'rgba(249, 115, 22, 0.5)' },
    pink: { active: '#ec4899', glow: 'rgba(236, 72, 153, 0.5)' },
    cyan: { active: '#06b6d4', glow: 'rgba(6, 182, 212, 0.5)' }
  };

  const s = sizes[size];
  const c = colors[color];

  return (
    <>
      <style>{toggleStyles}</style>
      <div className={`lp-toggle-wrapper ${disabled ? 'disabled' : ''}`}>
        {(label || description) && (
          <div className="lp-toggle-content">
            {label && <span className="lp-toggle-label">{label}</span>}
            {description && <span className="lp-toggle-description">{description}</span>}
          </div>
        )}
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          className={`lp-toggle-track ${checked ? 'active' : ''}`}
          style={{
            width: s.track.width,
            height: s.track.height,
            '--toggle-active-color': c.active,
            '--toggle-glow': c.glow,
            '--toggle-translate': `${s.translate}px`,
            '--toggle-thumb-size': `${s.thumb}px`
          } as React.CSSProperties}
        >
          <span className="lp-toggle-thumb" />
        </button>
      </div>
    </>
  );
}

const toggleStyles = `
  .lp-toggle-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .lp-toggle-wrapper.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .lp-toggle-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }

  .lp-toggle-label {
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
  }

  .lp-toggle-description {
    font-size: 12px;
    color: #64748b;
    line-height: 1.4;
  }

  .lp-toggle-track {
    position: relative;
    border-radius: 999px;
    border: none;
    background: rgba(71, 85, 105, 0.5);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
  }

  .lp-toggle-track:hover {
    background: rgba(71, 85, 105, 0.7);
  }

  .lp-toggle-track:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  .lp-toggle-track.active {
    background: var(--toggle-active-color);
    box-shadow: 0 0 20px var(--toggle-glow);
  }

  .lp-toggle-thumb {
    position: absolute;
    top: 50%;
    left: 3px;
    width: var(--toggle-thumb-size);
    height: var(--toggle-thumb-size);
    border-radius: 50%;
    background: white;
    transform: translateY(-50%);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .lp-toggle-track.active .lp-toggle-thumb {
    transform: translateY(-50%) translateX(var(--toggle-translate));
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  /* Hover effect on thumb */
  .lp-toggle-track:hover .lp-toggle-thumb {
    transform: translateY(-50%) scale(1.05);
  }

  .lp-toggle-track.active:hover .lp-toggle-thumb {
    transform: translateY(-50%) translateX(var(--toggle-translate)) scale(1.05);
  }
`;

export default ToggleSwitch;
