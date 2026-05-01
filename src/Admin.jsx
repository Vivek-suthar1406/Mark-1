import { useState } from 'react';

export default function Admin({ database, refreshDatabase }) {
  // State for our new tool form
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    features: '' // We will accept features as a comma-separated string
  });

  // Handle typing in the inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submitting the new tool
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert the comma-separated string back into an array for MongoDB
    const newTool = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim())
    };

    try {
      const response = await fetch('http://localhost:5000/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTool)
      });

      if (response.ok) {
        alert('Tool added successfully!');
        setFormData({ name: '', title: '', description: '', features: '' }); // Clear form
        refreshDatabase(); // Tell App.jsx to fetch the new data
      } else {
        alert('Error adding tool. Make sure the name is unique.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle deleting a tool
  const handleDelete = async (toolName) => {
    if (!window.confirm(`Are you sure you want to delete ${toolName}?`)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/tools/${toolName}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        refreshDatabase(); // Tell App.jsx to fetch the updated data
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Convert the database object into an array so we can list them out
  const toolsList = Object.values(database || {});

  return (
    <main style={{ padding: '40px', color: 'white' }}>
      <h1>Admin Dashboard</h1>
      <hr style={{ borderColor: '#444', marginBottom: '30px' }} />

      <div style={{ display: 'flex', gap: '50px' }}>
        {/* Left Side: Add Tool Form */}
        <div style={{ flex: 1, background: '#222', padding: '20px', borderRadius: '8px' }}>
          <h3>Add a New Tool</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Tool Name (e.g. Figma)" required style={{ padding: '8px' }} />
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Display Title (e.g. Figma)" required style={{ padding: '8px' }} />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description..." required style={{ padding: '8px', height: '80px' }} />
            <input name="features" value={formData.features} onChange={handleChange} placeholder="Features (comma-separated)" required style={{ padding: '8px' }} />
            <button type="submit" style={{ padding: '10px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Save to Database</button>
          </form>
        </div>

        {/* Right Side: Manage Existing Tools */}
        <div style={{ flex: 1, background: '#222', padding: '20px', borderRadius: '8px' }}>
          <h3>Manage Tools</h3>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
            {toolsList.map((tool) => (
              <li key={tool.name} style={{ display: 'flex', justifyContent: 'space-between', background: '#333', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
                <span>{tool.name}</span>
                <button onClick={() => handleDelete(tool.name)} style={{ background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}