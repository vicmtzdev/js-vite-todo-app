import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIDs = {
   TodoFilters: '.fil',
   TodoList: '.todo-list',
   NewTodoInput: '#new-todo-input',
   ClearCompleted: '.clear-completed',
}

/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) => {

   const displayTodos = () => {

      const todos = todoStore.getTodos(todoStore.getCurrentFilter());
      renderTodos(ElementIDs.TodoList, todos);
   }

   //Cuando la función App() se llama
   (() => {
      const app = document.createElement('div');
      app.innerHTML = html;
      document.querySelector(elementId).append(app);
      displayTodos();
   }) ();

   //Referencias HTML
   const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
   const todoListUL = document.querySelector(ElementIDs.TodoList);
   const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
   const FiltersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

   //Listeners
   newDescriptionInput.addEventListener('keyup', (event) => {
      if (event.keyCode !== 13) return;
      if (event.target.value.trim().length === 0) return;

      todoStore.addTodo(event.target.value);

      displayTodos();

      event.target.value = '';
   });


   todoListUL.addEventListener('click', (event) => {

      const element = event.target.closest('[data-id]');
      todoStore.toggleTodo(element.getAttribute('data-id'));
      displayTodos();

   });


   todoListUL.addEventListener('click', (event) => {

      const isDestroyElement = event.target.className === 'destroy';
      const element = event.target.closest('[data-id]');

      if (!element || !isDestroyElement) return;

      todoStore.deleteTodo(element.getAttribute('data-id'));

      displayTodos();

   });


   clearCompletedButton.addEventListener('click', () => {

      todoStore.deleteCompleted();

      displayTodos();

   });


   FiltersLIs.forEach(element => {

      element.addEventListener('click', (element) => {

         FiltersLIs.forEach(e => e.classList.remove('selected'));
         element.target.classList.add('selected');

         switch (element.target.text) {
            case 'Todos':

               todoStore.setFilter(Filters.All);

               break;

            case 'Pendientes':


               todoStore.setFilter(Filters.Pending);

               break;

            case 'Completados':

               todoStore.setFilter(Filters.Completed);

               break;

            default:

               todoStore.setFilter(Filters.All);

               break;
         }

         displayTodos();

      });

   })






}