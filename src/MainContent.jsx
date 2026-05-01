import { motion, AnimatePresence } from 'framer-motion'; // 1. Imported AnimatePresence

export default function MainContent({ activeTool, database }) {
  const data = database[activeTool];

  if (!data) {
    return (
      <main style={{ padding: '40px', textAlign: 'left' }}>
        <h1 className="innertube">P-1</h1>
        <p style={{ marginLeft: '40px' }}>Content for {activeTool} is coming soon!</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '40px', textAlign: 'left' }}>
      
      {/* 2. Wrap the animation in AnimatePresence with mode="wait" */}
      <AnimatePresence mode="wait">
        
        <motion.div
          key={activeTool} 
          initial={{ opacity: 0, y: 20 }}     // Starts invisible and slightly lower
          animate={{ opacity: 1, y: 0 }}      // Glides up into place
          exit={{ opacity: 0, y: -20 }}       // Glides UP and fades out when leaving!
          transition={{ duration: 0.3, ease: "easeOut" }} 
        >
          <h1 className="innertube">P-1</h1>
          <h2 className="innertube">
            <i className="fa-solid fa-caret-right" style={{ color: 'rgb(122, 138, 255)', marginRight: '10px' }}></i>
            {data.title}
          </h2>
          
          <div className="content" style={{ marginLeft: '40px' }}>
            <p>{data.description}</p>
            <br />
            
            <h3 className="innertube" style={{ marginLeft: '-15px' }}>Key Features:</h3>
            
            <ul style={{ listStylePosition: 'inside', paddingLeft: '0' }}>
              {data.features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }} // Staggered delay
                  style={{ marginBottom: '10px' }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

      </AnimatePresence>
    </main>
  );
}