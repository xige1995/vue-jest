#### 参考文档：

https://jestjs.io/docs/zh-Hans/api

https://vue-test-utils.vuejs.org/zh/api/



#### 匹配器：

判断实际行为或结果是否符合预期行为或结果

常用的：

```js
expect({a:1}).toBe({a:1})//判断两个对象是否相等
expect(1).not.toBe(2)//判断不等
expect(n).toBeNull(); //判断是否为null
expect(n).toBeUndefined(); //判断是否为undefined
expect(n).toBeDefined(); //判断结果与toBeUndefined相反
expect(n).toBeTruthy(); //判断结果为true
expect(n).toBeFalsy(); //判断结果为false
expect(value).toBeGreaterThan(3); //大于3
expect(value).toBeGreaterThanOrEqual(3.5); //大于等于3.5
expect(value).toBeLessThan(5); //小于5
expect(value).toBeLessThanOrEqual(4.5); //小于等于4.5
expect(value).toBeCloseTo(0.3); // 浮点数判断相等
expect('Christoph').toMatch(/stop/); //正则表达式判断
expect(['one','two']).toContain('one'); //不解释

function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError); //判断抛出异常
}）
```



#### 异步：

- 回调

```js
test('jest asyn test', done => {
  function callback(data) {
    expect(data).toBe('jest asyn test');
    //done() 被执行则意味着callback函数被调用，测试用例结束
    done();
  }

  fetchData(callback);
});
```

- Promise

```js
test('jest asyn test', () => {
  // assertions（1）代表的是在当前的测试中至少有一个断言是被调用的，否则判定为失败。
  expect.assertions(1);
  return fetchData().then(data => {
    expect(data).toBe('jest asyn test');
  });
});

test('jest asyn test', () => {
  expect.assertions(1);
  return expect(fetchData()).resolves.toBe('jest asyn test');
});

test('the fetch fails with an error', () => {
  expect.assertions(1);
  return expect(fetchData()).rejects.toMatch('error');
});
```

- 使用 Async/Await

```js
test('jest asyn test', async () => {
  expect.assertions(1);
  await expect(fetchData()).resolves.toBe('jest asyn test');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  await expect(fetchData()).rejects.toMatch('error');
});
```



mock：

Mock 函数允许你测试代码之间的连接——实现方式包括：擦除函数的实际实现、捕获对函数的调用 ( 以及在这些调用中传递的参数) 、在使用 new 实例化时捕获构造函数的实例、允许测试时配置返回值,  mock 函数属性都保留在 .mock属性

```js
it('mock测试', () => {  
    function forEach (items, callback) {    
    for (let index = 0; index < items.length; index++) {      
        callback(items[index])    
    	}  
  	}
    
  const mockCallback = jest.fn(x => 42 + x)  
  
  forEach([0, 1], mockCallback)
  	// 此 mock 函数被调用了两次
    expect(mockCallback.mock.calls.length).toBe(2);

    // 第一次调用函数时的第一个参数是 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // 第二次调用函数时的第一个参数是 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    // 第一次函数调用的返回值是 42
    expect(mockCallback.mock.results[0].value).toBe(42);
})    
```





# API

## mount()

创建一个包含被挂载和渲染的 Vue 组件的wrapper 	

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = mount(Foo, {
      propsData: {
        color: 'red'
      }
    })
    expect(wrapper.props().color).toBe('red')
  })
})
```

## shallowMount()

和 mount 一样，创建一个包含被挂载和渲染的 Vue 组件的 Wrapper，不同的是被存根的子组件。

```js
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = shallowMount(Foo, {
      propsData: {
        color: 'red'
      }
    })
    expect(wrapper.props().color).toBe('red')
  })
})
```

##  render()

将一个对象渲染成为一个字符串并返回一个 cheerio 包裹器。

```js
import { render } from '@vue/server-test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', async () => {
    const wrapper = await render(Foo, {
      propsData: {
        color: 'red'
      }
    })
    expect(wrapper.text()).toContain('red')
  })
})
```

##  renderToString()

renderToString 在底层使用 vue-server-renderer 将一个组件渲染为 HTML

```js
import { renderToString } from '@vue/server-test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', async () => {
    const str = await renderToString(Foo, {
      propsData: {
        color: 'red'
      }
    })
    expect(str).toContain('red')
  })
})
```

## 选择器

### CSS 选择器

挂载处理任何有效的 CSS 选择器

### Vue 组件

```js
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = shallowMount(Foo)
expect(wrapper.is(Foo)).toBe(true)
```

### 查找选项对象

Vue Test Utils 允许通过一个查找选项对象在组件包裹器上根据一个组件的 name 和 $ref选择元素。

```js
describe('Api', () => {  
    const wrapper = mount(Api)  
    const buttonWrapper = wrapper.find({ ref: 'myButton' })  	 buttonWrapper.trigger('click')
})
```

## createLocalVue()

createLocalVue 返回一个 Vue 的类供你添加组件、混入和安装插件而不会污染全局的 Vue 类。

```js
const localVue = createLocalVue()
const wrapper = shallowMount(Api, {  
    localVue,  mocks: { foo: true }
})
expect(wrapper.vm.foo).toBe(true)

// 断言失败freshWrapper上无foo
const freshWrapper = shallowMount(Api)
expect(freshWrapper.vm.foo).toBe(true)
```

## createWrapper

```js
import { createWrapper } from '@vue/test-utils'
import Foo from './Foo.vue'

const Constructor = Vue.extend(Foo)
const vm = new Constructor().$mount()
const wrapper = createWrapper(vm)
expect(wrapper.vm.foo).toBe(true)
```

## 配置

Vue Test Utils 包含了一个定义其选项的配置对象。

```js
import { config } from '@vue/test-utils'

config.mocks['$store'] = {
  state: {
    id: 1
  }
}
```