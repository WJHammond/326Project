import { TaskListComponent } from '../TaskListComponent/TaskListComponent.js';
import { SimpleTaskListViewComponent } from '../SimpleTaskListViewComponent/SimpleTaskListViewComponent.js';
import { TaskInputComponent } from '../TaskInputComponent/TaskInputComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { DynamicSidebarComponent } from '../DynamicSidebarComponent/DynamicSidebarComponent.js';

export class AppControllerComponent {
  #container = null; // Private container for the component
  #currentView = 'main'; // Track the current view ('main' or 'simple')
  #taskListComponent = null; // Instance of the main task list component
  #taskInputComponent = null; // Instance of the task input component
  #simpleTaskListViewComponent = null; // Instance of the simple view component
  #hub = null; // EventHub instance for managing events
  #dynamicSidebarComponent = null;

  constructor() {
    this.#hub = EventHub.getInstance();
    this.#taskListComponent = new TaskListComponent();
    this.#taskInputComponent = new TaskInputComponent();
    this.#simpleTaskListViewComponent = new SimpleTaskListViewComponent();
    this.#dynamicSidebarComponent = new DynamicSidebarComponent();
  }

  // Render the AppController component and return the container
  render() {
    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    this.#taskInputComponent.render();
    this.#taskListComponent.render();
    this.#simpleTaskListViewComponent.render();
    this.#dynamicSidebarComponent.render();

    // Initially render the main view
    this.#renderCurrentView();

    return this.#container;
  }

  // Creates the main container element
  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.classList.add('app-controller');
  }

  // Sets up the HTML structure for the container
  #setupContainerContent() {
    this.#container.innerHTML = `
      <div id="viewContainer"></div>
      <button id="switchViewBtn">Switch to Simple View</button>
    `;
  }

  // Attaches the necessary event listeners
  #attachEventListeners() {
    const switchViewBtn = this.#container.querySelector('#switchViewBtn');

    // Event listener for switching views
    switchViewBtn.addEventListener('click', () => {
      this.#toggleView();
    });

    // Subscribe to events from the EventHub to manage switching
    this.#hub.subscribe('SwitchToSimpleView', () => {
      this.#currentView = 'simple';
      this.#renderCurrentView();
    });

    this.#hub.subscribe('SwitchToMainView', () => {
      this.#currentView = 'main';
      this.#renderCurrentView();
    });
  }

  // Toggles the view between main and simple
  #toggleView() {
    if (this.#currentView === 'main') {
      this.#currentView = 'simple';
      this.#hub.publish('SwitchToSimpleView', null);
    } else {
      this.#currentView = 'main';
      this.#hub.publish('SwitchToMainView', null);
    }
  }

  // Renders the current view based on the #currentView state
  #renderCurrentView() {
    const viewContainer = this.#container.querySelector('#viewContainer');
    viewContainer.innerHTML = ''; // Clear existing content

    // Update the button text based on the current view
    const switchViewBtn = this.#container.querySelector('#switchViewBtn');
    switchViewBtn.textContent = this.#currentView === 'main' ? 'Switch to Simple View' : 'Switch to Main View';

    if (this.#currentView === 'main') {
      // Render the main task list view
      viewContainer.appendChild(this.#taskInputComponent.render());
      viewContainer.appendChild(this.#taskListComponent.render());
    } else {
      // Render the simple task list view
      viewContainer.appendChild(this.#simpleTaskListViewComponent.render());      
    }
  }
}
