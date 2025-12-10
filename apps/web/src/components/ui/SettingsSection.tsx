import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface SettingsSectionProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    children: ReactNode;
    accentColor?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'cyan';
    badge?: string;
    collapsible?: boolean;
    defaultOpen?: boolean;
}

export function SettingsSection({
    icon: Icon,
    title,
    description,
    children,
    accentColor = 'blue',
    badge,
    collapsible = false,
    defaultOpen = true
}: SettingsSectionProps) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    const colors = {
        blue: { border: 'rgba(59, 130, 246, 0.3)', glow: 'rgba(59, 130, 246, 0.15)', icon: '#60a5fa' },
        green: { border: 'rgba(34, 197, 94, 0.3)', glow: 'rgba(34, 197, 94, 0.15)', icon: '#4ade80' },
        purple: { border: 'rgba(139, 92, 246, 0.3)', glow: 'rgba(139, 92, 246, 0.15)', icon: '#a78bfa' },
        orange: { border: 'rgba(249, 115, 22, 0.3)', glow: 'rgba(249, 115, 22, 0.15)', icon: '#fb923c' },
        pink: { border: 'rgba(236, 72, 153, 0.3)', glow: 'rgba(236, 72, 153, 0.15)', icon: '#f472b6' },
        cyan: { border: 'rgba(34, 211, 238, 0.3)', glow: 'rgba(34, 211, 238, 0.15)', icon: '#22d3ee' }
    };

    const c = colors[accentColor];

    return (
        <>
            <style>{sectionStyles}</style>
            <section
                className="lp-settings-section"
                style={{
                    '--section-border': c.border,
                    '--section-glow': c.glow,
                    '--section-icon': c.icon
                } as React.CSSProperties}
            >
                <header
                    className={`lp-section-header ${collapsible ? 'collapsible' : ''}`}
                    onClick={() => collapsible && setIsOpen(!isOpen)}
                >
                    <div className="lp-section-icon-wrap">
                        <Icon size={20} />
                    </div>
                    <div className="lp-section-title-block">
                        <h3 className="lp-section-title">{title}</h3>
                        {description && <p className="lp-section-desc">{description}</p>}
                    </div>
                    {badge && (
                        <span className="lp-section-badge">{badge}</span>
                    )}
                    {collapsible && (
                        <div className={`lp-section-chevron ${isOpen ? 'open' : ''}`}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                </header>

                <div className={`lp-section-content ${isOpen ? 'open' : ''}`}>
                    {children}
                </div>
            </section>
        </>
    );
}

// Sub-componente para items dentro de una sección
interface SettingsItemProps {
    children: ReactNode;
    noPadding?: boolean;
    border?: boolean;
}

export function SettingsItem({ children, noPadding = false, border = true }: SettingsItemProps) {
    return (
        <div className={`lp-settings-item ${noPadding ? 'no-padding' : ''} ${border ? 'with-border' : ''}`}>
            {children}
        </div>
    );
}

// Sub-componente para inputs con label
interface SettingsInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'url';
    helper?: string;
    disabled?: boolean;
    icon?: LucideIcon;
}

export function SettingsInput({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    helper,
    disabled = false,
    icon: Icon
}: SettingsInputProps) {
    return (
        <div className="lp-settings-input-group">
            <label className="lp-settings-input-label">{label}</label>
            <div className="lp-settings-input-wrap">
                {Icon && (
                    <div className="lp-settings-input-icon">
                        <Icon size={16} />
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`lp-settings-input ${Icon ? 'with-icon' : ''}`}
                />
            </div>
            {helper && <p className="lp-settings-input-helper">{helper}</p>}
        </div>
    );
}

const sectionStyles = `
  .lp-settings-section {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid var(--section-border);
    border-radius: 20px;
    overflow: hidden;
    backdrop-filter: blur(20px);
    box-shadow: 
      0 4px 24px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
  }

  .lp-settings-section:hover {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 24px var(--section-glow),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    border-color: var(--section-border);
  }

  .lp-section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  }

  .lp-section-header.collapsible {
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .lp-section-header.collapsible:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .lp-section-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid var(--section-border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--section-icon);
    flex-shrink: 0;
    box-shadow: 0 0 16px var(--section-glow);
  }

  .lp-section-title-block {
    flex: 1;
    min-width: 0;
  }

  .lp-section-title {
    font-size: 16px;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0;
  }

  .lp-section-desc {
    font-size: 13px;
    color: #64748b;
    margin: 4px 0 0 0;
  }

  .lp-section-badge {
    padding: 4px 10px;
    border-radius: 999px;
    background: var(--section-glow);
    border: 1px solid var(--section-border);
    font-size: 11px;
    font-weight: 700;
    color: var(--section-icon);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .lp-section-chevron {
    color: #64748b;
    transition: transform 0.3s ease;
  }

  .lp-section-chevron.open {
    transform: rotate(180deg);
  }

  .lp-section-content {
    padding: 0 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .lp-section-content:not(.open) {
    display: none;
  }

  /* Settings Item */
  .lp-settings-item {
    padding: 16px 0;
  }

  .lp-settings-item.with-border:not(:last-child) {
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  }

  .lp-settings-item.no-padding {
    padding: 0;
  }

  /* Settings Input */
  .lp-settings-input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lp-settings-input-label {
    font-size: 12px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .lp-settings-input-wrap {
    position: relative;
  }

  .lp-settings-input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    pointer-events: none;
  }

  .lp-settings-input {
    width: 100%;
    padding: 14px 16px;
    background: rgba(2, 6, 23, 0.5);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 12px;
    color: #f8fafc;
    font-size: 14px;
    font-weight: 500;
    outline: none;
    transition: all 0.2s ease;
  }

  .lp-settings-input.with-icon {
    padding-left: 44px;
  }

  .lp-settings-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15), 0 0 20px rgba(59, 130, 246, 0.1);
    background: rgba(2, 6, 23, 0.8);
  }

  .lp-settings-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .lp-settings-input::placeholder {
    color: #475569;
  }

  .lp-settings-input-helper {
    font-size: 12px;
    color: #64748b;
    margin: 0;
    line-height: 1.4;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .lp-section-header {
      padding: 16px 18px;
    }

    .lp-section-content {
      padding: 0 18px 18px;
    }

    .lp-section-icon-wrap {
      width: 36px;
      height: 36px;
    }

    .lp-section-title {
      font-size: 15px;
    }
  }
`;

export default SettingsSection;
