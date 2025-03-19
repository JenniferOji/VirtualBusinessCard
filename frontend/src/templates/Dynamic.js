import { useState } from "react";
import './Dynamic.css'
// https://www.youtube.com/watch?v=u65Y-vqYNAk
const Dynamic = () => {
    const [widgets, setWidgets] = useState([]); //storing the list of widgets that are dropped onto the page

    function handleOnDrag(e, widgetType) {
        // storing the type of widget being dragged - a, b, c in the dataTransfer object
        e.dataTransfer.setData("widgetType", widgetType);
    }

    // when something is dropped onto the target area 
    function handleOnDrop(e) {
        e.preventDefault();
        const widgetType = e.dataTransfer.getData("widgetType"); // gets the type of widget - a,b, c
        if (widgetType) {
            //updating the state by keeping the previous widgets and adding the new one to the array
            setWidgets((prevWidgets) => [...prevWidgets, widgetType]); 
        }
    }

    // when an element is dragged over the drop area
    function handleDragOver(e) {
        e.preventDefault();
    }

    return (
        <div className="dynamic">
            <div className="widgets">
                {/* calling the handleOndrag function when a widget is mvoed */}
                <div className="widget" draggable onDragStart={(e) => handleOnDrag(e, "Widget A")}>
                    Widget A
                </div>
                <div className="widget" draggable onDragStart={(e) => handleOnDrag(e, "Widget B")}>
                    Widget B
                </div>
                <div className="widget" draggable onDragStart={(e) => handleOnDrag(e, "Widget C")}>
                    Widget C
                </div>
            </div>

            <div className="page" onDrop={handleOnDrop} onDragOver={handleDragOver}>
                {/* mapping over the widgets array and rendering each dropped widget */}
                {widgets.map((widget, index) => (
                <div className="dropped-widget" key={index}>
                    {/* the content of the widget  */}
                    {widget} 
                </div>
                ))}
            </div>
        </div>
    );
};

export default Dynamic;