import React, { useState, useEffect } from 'react';
import ResourceCard from './ResourceCard';

const ResourceList = ({ refreshTrigger }) => {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (category) queryParams.append('category', category);

      const res = await fetch(`http://localhost:5000/api/resources?${queryParams}`);
      const data = await res.json();
      setResources(data);
    } catch (err) {
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [refreshTrigger, search, category]);

  return (
    <div className="bg-primary-light/10 p-6 rounded-xl border border-primary-light">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-text-main">Browse Resources</h2>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search documents..."
            className="p-2 bg-primary-light border border-primary-light rounded-lg text-text-main focus:outline-none focus:border-accent-gold w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-2 bg-primary-light border border-primary-light rounded-lg text-text-main focus:outline-none focus:border-accent-gold w-full md:w-48"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Lecture Notes">Lecture Notes</option>
            <option value="Assignment">Assignment</option>
            <option value="Past Question">Past Question</option>
            <option value="Project Report">Project Report</option>
            <option value="Textbook">Textbook</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-text-muted text-center py-8">Loading resources...</p>
      ) : resources.length === 0 ? (
        <p className="text-text-muted text-center py-8">No resources found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceList;
