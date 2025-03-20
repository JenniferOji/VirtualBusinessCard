import React, { useState, useEffect } from 'react';
import grapesjs from "grapesjs";
import './Dynamic.scss';
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";  
import axios from 'axios';
import { BASE_URL } from '../config';
import { useParams } from 'react-router-dom';

const Dynamic = () => {
    const {id} = useParams();
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
            }, // restricing the user to only create for a mobile device
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

        //https://grapesjs.com/docs/api/panels.html
        // adding a save button to the editor 
         editor.Panels.addButton('options', {
            id: 'saveTemplate',
            className: 'fa fa-save', // save icon 
            command: 'saveTemplate',
            attributes: { title: 'Save Template' }, // text that displays on hover 
        });

        // linking the save button the save command 
        editor.Commands.add('saveTemplate', {
            run: async (editor) => {
                const html = editor.getHtml();
                const css = editor.getCss();
                await handleSubmit(id, html,css)
            }
        });
        setEditor(editor);
    }, [id]);

    // handling the saving of the template
    const handleSubmit = async (id, html,css) => {
        await axios.post(`${BASE_URL}/saveTemplate/${id}`, {html, css})   
        .then((response) => {
            alert('Template saved!');  

        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to save');
        });
    };

    return (
        <div className="App">
            <div id="editor"></div>
        </div>
    );
}

export default Dynamic;
