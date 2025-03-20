import React, { useState, useEffect } from 'react';
import grapesjs from "grapesjs";
import './Dynamic.scss';
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";  

const Dynamic = () => {
    const [editor, setEditor] = useState(null);

    // inititalising grape.js
    useEffect(() => {
        const editor = grapesjs.init({
            container: "#editor", // where the editor will be rendered 
            plugins: [gjsPresetWebpage, gjsBlocksBasic],
            //components
            pluginsOpts: { 
                gjsPresetWebpage: {},
                gjsBlocksBasic: {},  
            },
            deviceManager: {
                devices: [
                  {
                    name: 'Mobile',  
                    width: '375px', 
                    widthMedia: 375,  
                  },
                ],
              },
        });
        setEditor(editor);

        //https://grapesjs.com/docs/api/panels.html
        // adding a save button to the editor 
         editor.Panels.addButton('options', {
            id: 'saveTemplate',
            className: 'fa fa-save', // save icon 
            command: 'saveTemplate',
            attributes: { title: 'Save Template' }, // text that displays on hover 
        });

    }, []);

    return (
        <div className="App">
            <div id="editor"></div>
        </div>
    );
}

export default Dynamic;
