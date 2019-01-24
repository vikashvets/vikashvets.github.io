jQuery(function ($) {

    let page = 1;
    let todos = JSON.parse(localStorage.getItem("names"));
    todos = todos ? todos : [];
    const list = $('.todos');
    const input = $('input');
    renderTodos();

    function addTodo(value) {
        let elementTodo = {
            value: value,
            IsPerformed: false,
        };
        todos.push(elementTodo);
    }

    input.on('change', function (e) {
        addTodo(this.value);
        this.value = '';
        renderTodos();
    });

    function renderTodos() {
        list.empty();
        $.each(todos, function (i) {
            list.prepend(`<li>
                                    <span ` + (todos[i].IsPerformed ? `style="text-decoration: line-through;"` : ``) + `>${this.value}</span>
                                   <div class="controls-btn"> <button class="del" title="Delete TODO" data-index="${i}"><i class="fas fa-trash"></i></button>
                                    <button class="per" title="Mark as done!" data-index="${i}"><i class="fas fa-check"></i></button>
                                    <button class="edit" title="Edit TODO" data-index="${i}"><i class="far fa-edit"></i></button>
                                    </div>
                                </li>`);
        });
        localStorage.setItem("names", JSON.stringify(todos));
    }

    function removeTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    function performTodo(index) {
        todos[index].IsPerformed = true;
        renderTodos();
    }

    function editTodo(index) {
        if ($('.edit-input').length && $('.edit-input').data('index') != index) {
            renderTodos();
        }
        $('.edit').each(function () {
            if (($(this).attr('data-index') == index) && !$('.edit-input').length) {
                $(this).append(`
                    <input type="text" class="edit-input" data-index = "${index}" placeholder="Edit your TODO..."/>
                `);
                return true;
            }
        });
    }

    function changeTodo(index, newValue) {
        todos[index].value = newValue;
        renderTodos();
    }

    function deletePerformedTodos() {
        for(let i = 0; i < todos.length; i++) {
            if(todos[i].IsPerformed) {
                todos.splice(i,1);
                i--;
            }
        }
    }

    function getRemoteTodos() {
        $.get('https://jsonplaceholder.typicode.com/todos', function (data) {
            let last = page * 10;

            if (last <= data.length) {
                let arr = data.slice(last - 10, last);
                for (let i = 0; i < 10; i++) {
                    todos.push(
                        {
                            isPerformed: arr[i].completed,
                            value: arr[i].title,
                        }
                    );
                }
                page++;
            }
            renderTodos();
        });
    }

    $(document).on('click', ('.del'), function () {
        const index = $(this).data('index');
        removeTodo(index);
    });

    $(document).on('click', ('.download'), function () {
        getRemoteTodos();
    });

    $(document).on('click', ('.per'), function () {
        const index = $(this).data('index');
        performTodo(index);
    });

    $(document).on('click', ('.edit'), function () {
        const index = $(this).data('index');
        editTodo(index);
    });

    $(document).on('click', ('.clear'), function () {
        todos = [];
        renderTodos();
    });

    $(document).on('click', ('.clear-per'), function () {
        deletePerformedTodos();
        renderTodos();
    });

    $(document).on('change', ('.edit-input'), function () {
        const index = $(this).data('index');
        let newValue = $(this).val();
        changeTodo(index, newValue);
    });
});