import { mount } from '@vue/test-utils'
import App from './../src/App.vue'
import Todo from './../src/components/Todo.vue'

describe('Mounted App', () => {
    const wrapper = mount(App);

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('has a button', () => {
        expect(wrapper.contains('button')).toBe(true)
    })

    it('has a input textfield', () => {
        expect(wrapper.contains('input')).toBe(true)
    })
})

describe('Todo App', () => {
    const wrapperTodo = mount(Todo);

    it('add button click with empty todo value', () => {
        expect(wrapperTodo.vm.error).toBe('')
        const button = wrapperTodo.find('button')
        button.trigger('click')
        expect(wrapperTodo.vm.error).toBe('Please input some data')
    })

    it('add button click with todo value', () => {
        wrapperTodo.setData({ newTodo: { name:'test' } })
        const button = wrapperTodo.find('button')
        button.trigger('click')
        expect(wrapperTodo.vm.error).toBe('')
    })
})