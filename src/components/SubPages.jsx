import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Check } from 'lucide-react';
import Magnet from './react-bits/Magnet';

function SubPages({ activePage, onClose }) {
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!activePage) return null;

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
    switch (activePage) {
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
              <div>
                <label className="block text-mystic-mint/55 mb-1.5 uppercase tracking-wider">FULL_NAME</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ENTER_FULL_NAME" 
                  disabled={formStatus === 'sending' || formStatus === 'success'}
                  className="bg-nocturnal-expedition/30 border border-arctic-powder/10 hover:border-arctic-powder/30 focus:border-mystic-mint/50 focus:outline-none rounded px-4 py-3 text-arctic-powder w-full transition-colors cursor-target"
                />
              </div>

              <div>
                <label className="block text-mystic-mint/55 mb-1.5 uppercase tracking-wider">EMAIL_ADDRESS</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ENTER_EMAIL_ADDRESS" 
                  disabled={formStatus === 'sending' || formStatus === 'success'}
                  className="bg-nocturnal-expedition/30 border border-arctic-powder/10 hover:border-arctic-powder/30 focus:border-mystic-mint/50 focus:outline-none rounded px-4 py-3 text-arctic-powder w-full transition-colors cursor-target"
                />
              </div>

              <div>
                <label className="block text-mystic-mint/55 mb-1.5 uppercase tracking-wider">MESSAGE_PAYLOAD</label>
                <textarea 
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="COMPOSE_MESSAGE_PAYLOAD..." 
                  disabled={formStatus === 'sending' || formStatus === 'success'}
                  className="bg-nocturnal-expedition/30 border border-arctic-powder/10 hover:border-arctic-powder/30 focus:border-mystic-mint/50 focus:outline-none rounded px-4 py-3 text-arctic-powder w-full transition-colors cursor-target resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                {formStatus === 'success' ? (
                  <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1.5 animate-pulse">
                    <Check className="w-3.5 h-3.5" />
                    &gt; PAYLOAD: SENT_SUCCESSFULLY. CONNECTING_AGENT...
                  </span>
                ) : formStatus === 'sending' ? (
                  <span className="text-mystic-mint/60 font-mono text-[10px] animate-pulse">
                    &gt; connection: transmitting_payload...
                  </span>
                ) : (
                  <span className="text-mystic-mint/35 font-mono text-[9px]">
                    &gt; ready: secure_node_connection
                  </span>
                )}

                <Magnet padding={15} magnetStrength={8}>
                  <button 
                    type="submit"
                    disabled={formStatus === 'sending' || formStatus === 'success'}
                    className="bg-arctic-powder text-oceanic-noir px-6 py-3 rounded font-bold hover:bg-mystic-mint transition-colors flex items-center justify-center gap-2 cursor-pointer cursor-target flex-shrink-0"
                  >
                    <span>SEND_MESSAGE</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </Magnet>
              </div>
            </form>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6 text-left font-sans text-sm text-mystic-mint/80 leading-relaxed max-h-[60vh] overflow-y-auto pr-4">
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">1. Agreement to Terms</h3>
              <p>
                By provisioning a cluster key or connecting a data daemon to the Aetheris AI engine, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, do not access our endpoints or model pools.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">2. Ingestion & Model License</h3>
              <p>
                Aetheris grants you a localized, revocable, non-exclusive license to deploy edge nodes and process database logs using compile node frameworks. You retain full proprietary rights to all unstructured inbound system logs ingested through the platform.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">3. Service Levels & Limitations</h3>
              <p>
                Aetheris services are provided "as-is" and "as available". We do not guarantee continuous uptime in case of hardware-level VPC node disruptions. You are solely responsible for setting compaction thresholds and validating custom routing pipelines.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">4. Core Indemnification</h3>
              <p>
                You agree to indemnify Aetheris and its systems architect, Alex Cristache, from any operational damages, data corruption, or network fees incurred due to misconfigured schema definitions or unauthorized server node exposures.
              </p>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6 text-left font-sans text-sm text-mystic-mint/80 leading-relaxed max-h-[60vh] overflow-y-auto pr-4">
            <div>
              <h3 className="font-mono text-xs text-arctic-powder uppercase tracking-wider mb-2">1. Localized Zero-Leakage Architecture</h3>
              <p>
                Privacy is built natively into our technical layout. Aetheris operates on an air-gapped ingestion model. Raw log files, API transaction vectors, and database schema mappings remain completely inside your private virtual cloud firewall. We do not store or transmit tenant logs to centralized clusters.
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
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-oceanic-noir/95 backdrop-blur-md z-[999] overflow-y-auto px-6 py-20 flex flex-col justify-start items-center"
      >
        {/* Subtle grid pattern background overlay */}
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" aria-hidden="true" />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-2xl w-full bg-nocturnal-expedition/15 border border-arctic-powder/10 p-8 sm:p-12 rounded-lg relative z-10 shadow-2xl"
        >
          {/* Close Button */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <Magnet padding={12} magnetStrength={6}>
              <button 
                onClick={onClose}
                className="p-2 border border-arctic-powder/10 hover:border-arctic-powder/30 rounded text-mystic-mint hover:text-arctic-powder hover:bg-arctic-powder/5 transition-all cursor-target block shadow-sm"
                aria-label="Close page"
              >
                <X className="w-4 h-4" />
              </button>
            </Magnet>
          </div>

          {/* Section Header */}
          <div className="mb-10 text-left border-b border-arctic-powder/10 pb-6">
            <span className="font-mono text-[9px] tracking-[0.25em] text-mystic-mint/45 uppercase block mb-2">
              SYSTEM_SECURE_OVERLAY
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-arctic-powder uppercase leading-none">
              {pageTitles[activePage]}
            </h2>
          </div>

          {/* Render Content */}
          {renderContent()}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SubPages;
