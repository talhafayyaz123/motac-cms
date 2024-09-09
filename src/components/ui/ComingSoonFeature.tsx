import React from 'react';

interface ComingSoonFeatureProps {
  maxWidth?: string;
  height?: string;
  addedBorder?: boolean;
}

const ComingSoonFeature: React.FC<ComingSoonFeatureProps> = ({
  maxWidth = '500px',
  height = '50%',
  addedBorder = false,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center bg-gray-200  overflow-hidden ${addedBorder ? 'border border-[#70707069] rounded-xl' : ''}`}
      style={{
        maxWidth: maxWidth,
        height: height,
        width: '100%',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#ffffffcf] opacity-60 z-10" />

      {/* Coming Soon text */}
      <div className="relative z-20 text-center text-xs">
        Feature Coming Soon
      </div>
    </div>
  );
};

export default ComingSoonFeature;
