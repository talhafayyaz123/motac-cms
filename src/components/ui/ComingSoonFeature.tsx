import React from 'react';

interface ComingSoonFeatureProps {
  maxWidth?: string;
  height?: string;
  addedBorder?: boolean;
  minHeight?: string;
}

const ComingSoonFeature: React.FC<ComingSoonFeatureProps> = ({
  maxWidth = '500px',
  height = '50%',
  addedBorder = false,
  minHeight = '90px',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${addedBorder ? 'border border-gray-100 rounded-xl' : ''}`}
      style={{
        maxWidth: maxWidth,
        height: height,
        minHeight: minHeight,
        width: '100%',
        background: 'radial-gradient(ellipse, #364EA2 0%, white 100%)',
      }}
    >
      {/* Overlay background */}
      <div className="absolute inset-0 bg-white opacity-60 z-10" />

      <div className="relative z-20 text-center text-sm font-medium">
        Feature Coming Soon
      </div>
    </div>
  );
};

export default ComingSoonFeature;
