import React from 'react';

interface ComingSoonFeatureProps {
  maxWidth?: string;
  height?: string;
  addedBorder?: boolean;
  topBorder?: boolean;
  leftBorder?: boolean;
  minHeight?: string;
}

const ComingSoonFeature: React.FC<ComingSoonFeatureProps> = ({
  maxWidth = '500px',
  height = '50%',
  addedBorder = false,
  minHeight = '90px',
  leftBorder = false,
  topBorder = false,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden  ${topBorder ? 'border-t-2 border-t-gray-200 rounded-xl border border-transparent' : addedBorder ? 'border border-gray-100 rounded-xl' : leftBorder ? 'rounded-xl border-transparent' : ''}`}
      style={{
        borderLeftWidth: leftBorder ? '2px' : '',
        borderLeftColor: leftBorder ? 'rgb(229 231 235 )' : '',
        maxWidth: maxWidth,
        height: height,
        minHeight: minHeight,
        width: '100%',
        background:
          'radial-gradient(ellipse at center, rgba(118,136,235,0.3) 0%, rgba(255,255,255,1) 70%)', // Updated gradient based on the image
      }}
    >
      {/* Overlay background */}
      <div className="absolute inset-0 bg-white opacity-60 z-10" />

      <div className="relative z-20 text-center text-xs font-extralight">
        Feature Coming Soon
      </div>
    </div>
  );
};

export default ComingSoonFeature;
