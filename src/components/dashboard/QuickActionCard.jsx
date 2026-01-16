import React from 'react';

const QuickActionCard = ({ title, description, icon: Icon, iconColor = 'bg-blue-100 text-blue-600', onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow p-4 text-left hover:shadow-md transition-shadow"
    >
      {Icon && (
        <div className={`${iconColor} p-3 rounded-lg w-fit mb-3`}>
          <Icon className="h-5 w-5" />
        </div>
      )}
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-600 mt-1">{description}</p>
    </button>
  );
};

export default QuickActionCard;
