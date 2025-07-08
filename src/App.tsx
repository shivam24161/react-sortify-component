import React, { useState } from 'react';
import Sortable, { sortableArray } from './Sortable/Sortable';
import './App.css';

// Sample data for different demos
const imageItems = [
  { id: 1, imageUrl: "https://picsum.photos/id/254/200/300" },
  { id: 2, imageUrl: "https://picsum.photos/id/239/200/300" },
  { id: 3, imageUrl: "https://picsum.photos/id/233/200/300" },
  { id: 4, imageUrl: "https://picsum.photos/id/235/200/300" },
  { id: 5, imageUrl: "https://picsum.photos/id/231/200/300" },
  { id: 6, imageUrl: "https://picsum.photos/id/230/200/300" },
];

const cardItems = [
  { id: 1, title: "Card 1", description: "This is the first card" },
  { id: 2, title: "Card 2", description: "This is the second card" },
  { id: 3, title: "Card 3", description: "This is the third card" },
  { id: 4, title: "Card 4", description: "This is the fourth card" },
  { id: 5, title: "Card 5", description: "This is the fifth card" },
  { id: 6, title: "Card 6", description: "This is the sixth card" },
];

const listItems = [
  { id: 1, text: "Item 1" },
  { id: 2, text: "Item 2" },
  { id: 3, text: "Item 3" },
  { id: 4, text: "Item 4" },
  { id: 5, text: "Item 5" },
];

// Code examples
const codeExamples = {
  basic: `import React, { useState } from 'react';
import Sortable, { sortableArray } from 'your-package-name';

const BasicExample = () => {
  const [data, setData] = useState<sortableArray>([
    { id: 1, content:<div/>Item 1</div>; },
    { id: 2, content:<div/>Item 2</div>; },
    { id: 3, content:<div/>Item 3</div>; },
  ]);

  return (
    <Sortable
      data={data}
      onChange={(newData) =&gt; setData(newData)}
    />;
  );
};`,

  withDragHandle: `import React, { useState } from 'react';
import Sortable, { sortableArray } from 'your-package-name';

const DragHandleExample = () => {
  const [data, setData] = useState<sortableArray>([
    { id: 1, content:<div/>Item 1</div>; },
    { id: 2, content:<div/>Item 2</div>; },
    { id: 3, content:<div/>Item 3</div>; },
  ]);

  return (
    <Sortable
      data={data}
      onChange={(newData) =&gt; setData(newData)}
      dragHandle={&lt;span&gt;⋮⋮&lt;/span&gt;}
    />;
  );
};`,

  customStyling: `import React, { useState } from 'react';
import Sortable, { sortableArray } from 'your-package-name';

const CustomStylingExample = () => {
  const [data, setData] = useState<sortableArray>([
    { id: 1, content:<div/>Item 1</div>; },
    { id: 2, content:<div/>Item 2</div>; },
    { id: 3, content:<div/>Item 3</div>; },
  ]);

  return (
    <Sortable
      data={data}
      onChange={(newData) =&gt; setData(newData)}
      customClass="my-custom-sortable"
      sortableItemClass="my-sortable-item"
      animationDuration={500}
    />;
  );
};`,

  disabled: `import React, { useState } from 'react';
import Sortable, { sortableArray } from 'your-package-name';

const DisabledExample = () => {
  const [data, setData] = useState<sortableArray>([
    { id: 1, content:<div/>Item 1</div>; },
    { id: 2, content:<div/>Item 2</div>; },
    { id: 3, content:<div/>Item 3</div>; },
  ]);

  return (
    <Sortable
      data={data}
      onChange={(newData) =&gt; setData(newData)}
      isSortable={false}
    />;
  );
};`
};

function App() {
  const [activeTab, setActiveTab] = useState('demo');
  const [activeDemo, setActiveDemo] = useState('basic');

  // State for different demos
  const [imageData, setImageData] = useState<sortableArray>(
    imageItems.map(item => ({
      content: <img src={item.imageUrl} alt={`Image ${item.id}`} style={{ width: 150, height: 150, objectFit: 'cover' }} />,
      id: item.id
    }))
  );

  const [cardData, setCardData] = useState<sortableArray>(
    cardItems.map(item => ({
      content: (
        <div className="demo-card">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ),
      id: item.id
    }))
  );

  const [listData, setListData] = useState<sortableArray>(
    listItems.map(item => ({
      content: <div className="demo-list-item">{item.text}</div>,
      id: item.id
    }))
  );

  const [dragHandleData, setDragHandleData] = useState<sortableArray>(
    cardItems.slice(0, 3).map(item => ({
      content: (
        <div className="demo-card-with-handle">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ),
      id: item.id
    }))
  );

  const renderDemo = () => {
    switch (activeDemo) {
      case 'basic':
        return (
          <div className="demo-section">
            <h3>Basic Sortable List</h3>
            <p>Drag and drop to reorder items:</p>
            <div className="demo-container">
              <Sortable
                data={listData}
                onChange={(newData) => setListData(newData)}
              />
            </div>
          </div>
        );
      
      case 'images':
        return (
          <div className="demo-section">
            <h3>Sortable Images</h3>
            <p>Reorder images by dragging them:</p>
            <div className="demo-container">
              <Sortable
                data={imageData}
                onChange={(newData) => setImageData(newData)}
                customClass="image-sortable"
              />
            </div>
          </div>
        );
      
      case 'cards':
        return (
          <div className="demo-section">
            <h3>Sortable Cards</h3>
            <p>Drag cards to reorder them:</p>
            <div className="demo-container">
              <Sortable
                data={cardData}
                onChange={(newData) => setCardData(newData)}
                customClass="card-sortable"
              />
            </div>
          </div>
        );
      
      case 'dragHandle':
        return (
          <div className="demo-section">
            <h3>Sortable with Drag Handle</h3>
            <p>Only drag using the handle icon:</p>
            <div className="demo-container">
              <Sortable
                data={dragHandleData}
                onChange={(newData) => setDragHandleData(newData)}
                dragHandle={<span className="drag-handle">⋮⋮</span>}
                customClass="handle-sortable"
              />
            </div>
          </div>
        );
      
      case 'disabled':
        return (
          <div className="demo-section">
            <h3>Disabled Sortable</h3>
            <p>Sorting is disabled (isSortable=false):</p>
            <div className="demo-container">
              <Sortable
                data={listData}
                onChange={(newData) => setListData(newData)}
                isSortable={false}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderCodeView = () => {
    const codeMap = {
      basic: codeExamples.basic,
      images: codeExamples.basic,
      cards: codeExamples.basic,
      dragHandle: codeExamples.withDragHandle,
      disabled: codeExamples.disabled
    };

    return (
      <div className="code-section">
        <h3>Code Example</h3>
        <pre className="code-block">
          <code>{codeMap[activeDemo as keyof typeof codeMap]}</code>
        </pre>
      </div>
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Sortable Component</h1>
        <p>A powerful, customizable drag-and-drop sortable component for React</p>
      </header>

      <nav className="app-nav">
        <button 
          className={activeTab === 'demo' ? 'active' : ''} 
          onClick={() => setActiveTab('demo')}
        >
          Demo
        </button>
        <button 
          className={activeTab === 'code' ? 'active' : ''} 
          onClick={() => setActiveTab('code')}
        >
          Code Examples
        </button>
        <button 
          className={activeTab === 'docs' ? 'active' : ''} 
          onClick={() => setActiveTab('docs')}
        >
          Documentation
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'demo' && (
          <div className="demo-tab">
            <div className="demo-nav">
              <button 
                className={activeDemo === 'basic' ? 'active' : ''} 
                onClick={() => setActiveDemo('basic')}
              >
                Basic
              </button>
              <button 
                className={activeDemo === 'images' ? 'active' : ''} 
                onClick={() => setActiveDemo('images')}
              >
                Images
              </button>
              <button 
                className={activeDemo === 'cards' ? 'active' : ''} 
                onClick={() => setActiveDemo('cards')}
              >
                Cards
              </button>
              <button 
                className={activeDemo === 'dragHandle' ? 'active' : ''} 
                onClick={() => setActiveDemo('dragHandle')}
              >
                Drag Handle
              </button>
              <button 
                className={activeDemo === 'disabled' ? 'active' : ''} 
                onClick={() => setActiveDemo('disabled')}
              >
                Disabled
              </button>
            </div>
            {renderDemo()}
          </div>
        )}

        {activeTab === 'code' && (
          <div className="code-tab">
            <div className="code-nav">
              <button 
                className={activeDemo === 'basic' ? 'active' : ''} 
                onClick={() => setActiveDemo('basic')}
              >
                Basic Usage
              </button>
              <button 
                className={activeDemo === 'dragHandle' ? 'active' : ''} 
                onClick={() => setActiveDemo('dragHandle')}
              >
                With Drag Handle
              </button>
              <button 
                className={activeDemo === 'customStyling' ? 'active' : ''} 
                onClick={() => setActiveDemo('customStyling')}
              >
                Custom Styling
              </button>
              <button 
                className={activeDemo === 'disabled' ? 'active' : ''} 
                onClick={() => setActiveDemo('disabled')}
              >
                Disabled
              </button>
            </div>
            {renderCodeView()}
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="docs-tab">
            <h2>API Documentation</h2>
            
            <section className="api-section">
              <h3>Props</h3>
              <div className="prop-table">
                <div className="prop-row">
                  <div className="prop-name">data</div>
                  <div className="prop-type">sortableArray</div>
                  <div className="prop-required">Required</div>
                  <div className="prop-description">Array of objects with id and content properties</div>
                </div>
                <div className="prop-row">
                  <div className="prop-name">onChange</div>
                  <div className="prop-type">(newData: sortableArray)</div>
                  <div className="prop-required">Required</div>
                  <div className="prop-description">Callback function called when items are reordered</div>
                </div>
                <div className="prop-row">
                  <div className="prop-name">animationDuration</div>
                  <div className="prop-type">number</div>
                  <div className="prop-required">Optional</div>
                  <div className="prop-description">Duration of animation in milliseconds (default: 300)</div>
                </div>
                <div className="prop-row">
                  <div className="prop-name">customClass</div>
                  <div className="prop-type">string</div>
                  <div className="prop-required">Optional</div>
                  <div className="prop-description">Custom CSS class for the sortable container</div>
                </div>
                <div className="prop-row">
                  <div className="prop-name">isSortable</div>
                  <div className="prop-type">boolean</div>
                  <div className="prop-required">Optional</div>
                  <div className="prop-description">Enable/disable sorting (default: true)</div>
                </div>
                <div className="prop-row">
                  <div className="prop-name">dragHandle</div>
                  <div className="prop-type">React.ReactNode</div>
                  <div className="prop-required">Optional</div>
                  <div className="prop-description">Custom drag handle element</div>
                </div>
                <div className="prop-row">
                  <div className="prop-name">sortableItemClass</div>
                  <div className="prop-type">string</div>
                  <div className="prop-required">Optional</div>
                  <div className="prop-description">Custom CSS class for sortable items</div>
                </div>
              </div>
            </section>

            <section className="api-section">
              <h3>Types</h3>
              <div className="type-section">
                <h4>sortableArray</h4>
                <pre className="code-block">
                  <code>{`type sortableArray = {
  content: React.ReactNode;
  id: number | string;
}[];`}</code>
                </pre>
              </div>
            </section>

            <section className="api-section">
              <h3>Features</h3>
              <ul className="features-list">
                <li>✅ Touch and mouse support</li>
                <li>✅ Smooth animations</li>
                <li>✅ Custom drag handles</li>
                <li>✅ Customizable styling</li>
                <li>✅ TypeScript support</li>
                <li>✅ Responsive design</li>
                <li>✅ Auto-scroll support</li>
                <li>✅ Disable/enable functionality</li>
              </ul>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
