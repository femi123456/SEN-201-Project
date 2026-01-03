import React from 'react';

const ResourceCard = ({ resource }) => {
  const getIcon = (type) => {
    return (
      <svg className="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    );
  };

  return (
    <div className="bg-primary-light/20 rounded-lg border border-primary-light p-4 hover:border-accent-gold transition-colors duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getIcon(resource.fileType)}
            <span className="text-xs font-semibold px-2 py-1 bg-primary-light text-accent-gold rounded-full border border-primary-light">
              {resource.category}
            </span>
          </div>
          <span className="text-xs text-text-muted">
            {new Date(resource.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-lg font-bold text-text-main mb-1 line-clamp-1" title={resource.title}>{resource.title}</h3>
        <p className="text-sm text-text-muted mb-4 line-clamp-2" title={resource.description || ''}>
          {resource.description || 'No description provided.'}
        </p>
      </div>

      <div className="mt-2 text-center">
        <a
          href={`http://localhost:5000${resource.fileUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full bg-primary-light text-text-main py-2 rounded-lg hover:bg-accent-gold hover:text-primary transition duration-300 font-medium border border-primary-light hover:border-accent-gold"
        >
          Download / View
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;
