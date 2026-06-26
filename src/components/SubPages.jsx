import { useState, useEffect } from 'react';
import { X, Send, Check } from 'lucide-react';
import Magnet from './react-bits/Magnet';

function SubPages({ activePage, onClose }) {
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [visiblePage, setVisiblePage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (activePage) {
      setVisiblePage(activePage);
      const timer = setTimeout(() => setIsOpen(true), 20);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
      const timer = setTimeout(() => setVisiblePage(null), 300);
      return () => clearTimeout(timer);
    }
  }, [activePage]);

  if (!visiblePage) return null;

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const pageTitles = {
    about: 'About Aetheris',
    contact: 'Contact Node Connect',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy'
  };

  const renderContent = () => {
    switch (visiblePage) {
      case 'about':
        return (
          <div className="space-y-6 text-left font-sans text-sm text-mystic-mint/85 leading-relaxed">
            <p>
              <strong>Aetheris</strong> is a next-generation decentralized telemetry and data routing engine built for secure AI model execution at the edge. Founded under the vision of building real-time data pipelines without centralized database latency, Aetheris connects raw, high-throughput system transaction logs to localized vector environments instantaneously.
            </p>
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">Lead Systems Architect</h3>
              <p>
                The platform architecture, including the zero-copy pipeline compiler, self-healing edge schema routers, and decentralized voxel models, was designed and compiled by <strong>Alex Cristache</strong> under system reference node key <code>MP025</code>.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">Core Architecture Philosophy</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Zero Latency Leakage</strong>: All transactional data compilation and vectorization occur local to the system edge, yielding sub-2ms network routing indices.</li>
                <li><strong>Self-Healing Integrations</strong>: Upstream schema shifts are audited at the service gateway in real-time, preventing operational breaks dynamically.</li>
                <li><strong>Isolated VPC Containment</strong>: Core datasets never escape the tenant firewall. Execution environments are fully air-gapped.</li>
              </ul>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6 text-left">
            <p className="font-sans text-sm text-mystic-mint/80 leading-relaxed mb-6">
              Connect directly with our engineering nodes to request pipeline reflection audits, customized database connectors, or custom GPU scale licensing keys.
            </p>
            
            <form onSubmit={handleContactSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-mystic-mint/45 mb-1.5 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    disabled={formStatus === 'sending' || formStatus === 'success'}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ENTER_NAME"
                    className="w-full bg-nocturnal-expedition/30 border border-arctic-powder/10 focus:border-mystic-mint/55 focus:outline-none rounded px-3.5 py-2.5 text-arctic-powder transition-colors cursor-target"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-mystic-mint/45 mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    disabled={formStatus === 'sending' || formStatus === 'success'}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ENTER_EMAIL_ADDRESS"
                    className="w-full bg-nocturnal-expedition/30 border border-arctic-powder/10 focus:border-mystic-mint/55 focus:outline-none rounded px-3.5 py-2.5 text-arctic-powder transition-colors cursor-target"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-mystic-mint/45 mb-1.5 uppercase tracking-wider">
                  Request Payload Detail
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  disabled={formStatus === 'sending' || formStatus === 'success'}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="DESCRIBE_YOUR_INTEGRATION_REQUEST_PAYLOAD"
                  className="w-full bg-nocturnal-expedition/30 border border-arctic-powder/10 focus:border-mystic-mint/55 focus:outline-none rounded px-3.5 py-2.5 text-arctic-powder transition-colors resize-none cursor-target"
                />
              </div>

              <div className="pt-2">
                <Magnet padding={18} magnetStrength={10}>
                  <button
                    type="submit"
                    disabled={formStatus === 'sending' || formStatus === 'success'}
                    className="w-full sm:w-auto bg-arctic-powder text-oceanic-noir font-bold px-6 py-2.5 rounded hover:bg-mystic-mint transition-colors flex items-center justify-center gap-2 cursor-pointer cursor-target shadow-sm"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <span>TRANSMITTING...</span>
                        <div className="w-3.5 h-3.5 border-2 border-oceanic-noir border-t-transparent rounded-full animate-spin" />
                      </>
                    ) : formStatus === 'success' ? (
                      <>
                        <span>PAYLOAD DEPLOYED</span>
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT PAYLOAD</span>
                        <Send className="w-3 h-3 text-oceanic-noir" />
                      </>
                    )}
                  </button>
                </Magnet>
              </div>
            </form>

            {formStatus === 'sending' && (
              <div className="mt-4 font-mono text-[9px] text-mystic-mint/50 animate-pulse">
                &gt; encrypting handshake: secure_transmission_established...
              </div>
            )}
            {formStatus === 'success' && (
              <div className="mt-4 font-mono text-[9px] text-emerald-400">
                &gt; transmission: successful. an architecture node will verify your client token shortly.
              </div>
            )}
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6 text-left font-sans text-xs sm:text-sm text-mystic-mint/85 leading-relaxed max-h-[350px] overflow-y-auto pr-2">
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">1. Agreement to Terms</h3>
              <p>
                By booting or integrating with Aetheris AI systems (including client daemons, compilers, or local database connectors), you agree to be bound by these transaction rules.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">2. Operating License & Limits</h3>
              <p>
                Developer Sandboxes are restricted to 10,000 daily queries and 1 ingestion pipeline. Scale and Enterprise tiers are governed by active node leases. System metrics are monitored locally.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">3. Prohibited Telemetry Actions</h3>
              <p>
                You may not reverse-compile the custom WebGL isometric waves layout, execute routing reduction injections, or utilize the zero-copy compiler for malicious neural pipeline construction.
              </p>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6 text-left font-sans text-xs sm:text-sm text-mystic-mint/85 leading-relaxed max-h-[350px] overflow-y-auto pr-2">
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">1. Local VPC air-gap policy</h3>
              <p>
                Aetheris does not transmit raw database records or transaction vectors to centralized external targets. All schema vectorization and training sequences occur in your container stack.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">2. Telemetry Processing Rules</h3>
              <p>
                Aetheris only gathers anonymized system metrics (e.g. data compaction speed, system anomaly scores, edge routing times). These metadata packets are collected solely to optimize routing algorithms and ensure node health.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">3. GDPR & air-gapped compliance</h3>
              <p>
                Because all vector compilation occurs locally, you retain full ownership and control over data deletion hooks. Aetheris pipelines comply natively with international data sovereignty policies and standard GDPR regulations.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-oceanic-noir/95 backdrop-blur-md z-[999] overflow-y-auto px-6 py-20 flex flex-col justify-start items-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Subtle grid pattern background overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" aria-hidden="true" />

      <div 
        className={`max-w-2xl w-full bg-nocturnal-expedition/15 border border-arctic-powder/10 p-8 sm:p-12 rounded-lg relative z-10 shadow-2xl transition-all duration-300 delay-75 ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        }`}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <Magnet padding={12} magnetStrength={6}>
            <button 
              onClick={onClose}
              className="p-2 border border-arctic-powder/10 hover:border-arctic-powder/30 rounded text-mystic-mint hover:text-arctic-powder hover:bg-arctic-powder/5 transition-all cursor-target block shadow-sm"
              aria-label="Close page"
            >
              <img src="/SVGs/x-mark.svg" className="w-4 h-4 invert opacity-75" alt="Close" />
            </button>
          </Magnet>
        </div>

        {/* Section Header */}
        <div className="mb-10 text-left border-b border-arctic-powder/10 pb-6">
          <span className="font-mono text-[9px] tracking-[0.25em] text-mystic-mint/45 uppercase block mb-2">
            SYSTEM_SECURE_OVERLAY
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-arctic-powder uppercase leading-none">
            {pageTitles[visiblePage]}
          </h2>
        </div>

        {/* Render Content */}
        {renderContent()}

      </div>
    </div>
  );
}

export default SubPages;
