import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaChevronUp } from 'react-icons/fa';

const FloatingButtons = () => {
  const [expanded, setExpanded] = useState(null); // 'phone' | 'whatsapp' | null

  return (
    <div className="fixed bottom-6 right-5 z-[9999] flex flex-col-reverse items-end gap-3">
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/919355580007"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn bg-[#25D366] text-white"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setExpanded('whatsapp')}
        onHoverEnd={() => setExpanded(null)}
      >
        <FaWhatsapp size={22} className="shrink-0" />
        <AnimatePresence>
          {expanded === 'whatsapp' && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap text-sm font-semibold"
            >
              WhatsApp Us
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>

      {/* Phone */}
      <motion.a
        href="tel:+919355580007"
        className="floating-btn bg-primary text-primary-foreground"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.15, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setExpanded('phone')}
        onHoverEnd={() => setExpanded(null)}
      >
        <FaPhone size={18} className="shrink-0" />
        <AnimatePresence>
          {expanded === 'phone' && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap text-sm font-semibold"
            >
              +91 9355580007
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>
    </div>
  );
};

export default FloatingButtons;
