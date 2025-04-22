import React, { useState, useEffect } from 'react';
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";  
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import QrCodeGenerator from '../components/QrCodeGenerator';
import './Dynamic.css'

const Dynamic = () => {
    //qr code pop up 
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(false);
    };

    const {id} = useParams();
    const [editor, setEditor] = useState(null);
    const navigate = useNavigate();
    const look = () => {
        navigate('/dynamic/portfolio/' + id);
    }
    
    const[type] = useState("dynamic");


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
                await saveTemplate(id, html,css)
            }
        });
        setEditor(editor);
    }, [id]);

    // handling the saving of the template
    const saveTemplate = async (id, html,css) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/saveTemplate/${id}`, {html, css})   
        .then((response) => {
            alert("Template saved !")
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to save');
        });
    };

    // handling the saving of the template
    const submitTemplate = async (id, html,css) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/saveTemplate/${id}`, {html, css})   
        .then((response) => {
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to save');
        });
    };

    const handleSubmit = () => {
        if (editor) {
            const html = editor.getHtml();
            const css = editor.getCss();
            submitTemplate(id, html, css);
            setIsOpen(true);
        } else {
            alert("Unable to submit");
        }
    };    

    const goToTemplates = async (e) => {
        navigate('/templates/' + id);
    }
    return (
        <div className="App">
            <div className='template-button-holder'>
                    <button className='template-button' onClick={goToTemplates}>Browse templates</button>
                </div>
            {/* <button onClick={look}>Preview</button> */}
            <div id="editor"></div>
            <div>
        
                <div className='submit-container'>
                    <div className='submit-button'>
                        <button onClick={handleSubmit} className='submit'>Submit </button>
                    </div>
                </div>
                {/* https://www.dhiwise.com/post/guide-to-creating-engaging-user-experiences-with-react-popups */}
                <div className='popup-container'>
                    {isOpen && (
                        <div className="popup">
                            <QrCodeGenerator type={type} id={id}></QrCodeGenerator>
                            <div className='pop-but-container'>
                                <button onClick={togglePopup} className='close-button'>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dynamic;
