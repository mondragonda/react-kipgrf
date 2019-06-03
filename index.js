import React from 'react';
import { render } from 'react-dom';
import './style.css';

const list = [
  {
    opacity: 1,
    id: "Warehouse Id",
  },
  {
    opacity: 1,
    id: "Warehouse Code"
  },
  {
    opacity: 1,
    id: "Warehouse name",
  },
  {
    opacity: 1,
    id: "Shipping Order Id",
  },
  {
    opacity: 1,
    id: "Shipping Order Status",
  },
  {
     opacity: 1,
    id: "Shipping Order Created Date",
  },
  {
    opacity: 1,
    id: "Shipping Order Type",
  },
  {
    opacity: 1,
    id: "Shipping Order Bill To",
  },
  {
    opacity: 1,
    id: "Shipping Order Ship To",
  },
  
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementToDragIndex: null,
      elementToDropIndex: null,
      sortedList: props.list
    }
  }

  dragStart = (elementIndex, event) => {
    event.dataTransfer.effect = "move";
    //event.dataTransfer.setData('text/plain', 'foo');
    this.state.sortedList[elementIndex].opacity = this.state.sortedList[elementIndex].opacity - 0.99;
    this.setState({
      ...this.state,
      sortedList: this.state.sortedList,
      dragging: true,
      elementToDragIndex: elementIndex
    })
  }

  dragOver = (event) => {
    const elementToDropId = event.target.innerHTML;
    const elementToDragObject = this.state.sortedList[this.state.elementToDragIndex];
    if (elementToDropId != elementToDragObject.id) {
      const dropZoneIndex = this.state.sortedList.findIndex((listElement) => {
        return listElement.id === event.target.innerHTML;
      });

      if (dropZoneIndex != -1) {
        this.setState({
          ...this.state,
          elementToDropIndex: dropZoneIndex
        })
      }
    }
  }

  dragEnter = (event) => {
    const list = this.state.sortedList;
    const enteredElementIndex = findIndexByInnerHTML(list, event.target.innerHTML);

    const currentIndex = this.state.elementToDragIndex;

    if (enteredElementIndex !== this.state.elementToDragIndex) {
      switchElements(list, this.state.elementToDragIndex, enteredElementIndex);
      currentIndex = enteredElementIndex;
    }

    this.setState({
      ...this.state,
      sortedList: list,
      elementToDragIndex: currentIndex
    });
  }



  dragEnd = (event) => {
    const list = this.state.sortedList;
    list[this.state.elementToDragIndex].opacity = 1;
    this.setState({
      ...this.state,
      dragging: false,
      sortedList: list
    });
  }


  setElementVisibility = (element, index) => {
    return (
      <div draggable="true"
        className="item"
        style={{ opacity: element.opacity }}
        onDragEnter={this.dragEnter}
        onDragOver={this.dragOver}
        onDragEnd={this.dragEnd}
        onDragStart={this.dragStart.bind(this, index)}>
        {element.id}
      </div>
    );
  }

  render = () => (
    <div>
      <div  className="App">
        {this.state.sortedList.map((element, index) => {
          return this.setElementVisibility(element, index);
        })}
      </div >
    </div>
  );
}

function switchElements(list, drag, drop) {
  const dropElement = list[drop];
  list[drop] = list[drag];
  list[drag] = dropElement;
  return list;
}

function findIndexByInnerHTML(list, innerHTML) {
  return list.findIndex((element) => {
    return element.id === innerHTML;
  });
}

render(<App list={list} />, document.getElementById('root'));
