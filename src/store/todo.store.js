import { Todo } from '../todos/models/todo.model';

const Filters = {
    All: 'all',
    Pending: 'pending',
    Completed: 'completed',
}

const state = {

    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del infinito'),
    ],

    filter: Filters.All,

}

const initStore = () => {

    console.log(state);
    console.log('InitStore');

}


export default {
    initStore,
}
