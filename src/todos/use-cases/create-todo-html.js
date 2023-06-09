import { Todo } from '../models/todo.model';

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = (todo) => {

    if (!todo) throw new Error('A todo object is required');

    const { done, description, id } = todo;

    const html = `
        <div class="view">
            <input id="description" name="description" class="toggle" type="checkbox" ${done ? 'checked' : ''}>
            <label for="description" >${description}</label>
            <button class="destroy"></button>
        </div>
        <input id="ed" name="ed" class="edit" value="Create a TodoMVC template">
    `;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);
    if (done) liElement.classList.add('completed');

    return liElement;

}