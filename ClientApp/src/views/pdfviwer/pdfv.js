// Core viewer
/*eslint-disable */
import { Viewer } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance
const defaultLayoutPluginInstance = defaultLayoutPlugin();

<Viewer
    fileUrl='/my Documents/sample_doc.pdf'
    plugins={[
        // Register plugins
        defaultLayoutPluginInstance
        //,
        //...
    ]}
/>