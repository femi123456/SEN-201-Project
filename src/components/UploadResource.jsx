import React, { useState } from 'react';

const UploadResource = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Lecture Notes');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    // uploader would come from auth context in a real app

    try {
      const res = await fetch('http://localhost:5000/api/resources', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      setMessage('Upload successful!');
      setTitle('');
      setDescription('');
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      console.error(err);
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="bg-primary-light/30 p-6 rounded-xl border border-primary-light mb-8">
      <h2 className="text-2xl font-bold mb-4 text-accent-gold">Upload New Resource</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-text-muted font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full p-3 bg-primary-light border border-primary-light rounded-lg text-text-main focus:outline-none focus:border-accent-gold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., Introduction to Software Engineering"
          />
        </div>

        <div>
          <label className="block text-text-muted font-medium mb-1">Category</label>
          <select
            className="w-full p-3 bg-primary-light border border-primary-light rounded-lg text-text-main focus:outline-none focus:border-accent-gold"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Lecture Notes">Lecture Notes</option>
            <option value="Assignment">Assignment</option>
            <option value="Past Question">Past Question</option>
            <option value="Project Report">Project Report</option>
            <option value="Textbook">Textbook</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-text-muted font-medium mb-1">Description</label>
          <textarea
            className="w-full p-3 bg-primary-light border border-primary-light rounded-lg text-text-main focus:outline-none focus:border-accent-gold"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the content..."
          ></textarea>
        </div>

        <div>
          <label className="block text-text-muted font-medium mb-1">File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 bg-primary-light border border-dashed border-primary-light rounded-lg text-text-muted"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-accent-gold text-primary px-6 py-2 rounded-lg hover:bg-yellow-400 transition duration-300 font-bold"
        >
          Upload Resource
        </button>

        {message && (
          <p className={`mt-2 ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default UploadResource;
