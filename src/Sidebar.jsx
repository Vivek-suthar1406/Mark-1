export default function Sidebar({ setActiveTool, database }) {
    // Grab all the tool names directly from our MongoDB database object
    const allTools = Object.keys(database || {});
  
    return (
      <nav id="nav">
        <div className="innertube">
          
          <h3 className="head" style={{ fontSize: '1.2rem', marginBottom: '15px', marginTop: '10px' }}>All Tools</h3>
          <ul>
            {allTools.map((tool) => (
              <li key={tool}>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTool(tool);
                  }} 
                  style={{ cursor: 'pointer' }}
                >
                  {tool}
                </a>
              </li>
            ))}
          </ul>
  
        </div>
      </nav>
    );
  }