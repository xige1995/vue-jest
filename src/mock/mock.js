import Mock from 'mockjs'

// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
Mock.setup({
  timeout: '200 - 400'
})

const vCode = '123456'

function loginFun (prarms) {
  const prarmsObj = JSON.parse(prarms.body)
  if (prarmsObj.code === vCode) {
    return { code: 1, text: '登录成功' }
  } else {
    return { code: 2, text: '验证码有误，登录失败' }
  }
}

function getMockValue () {
  return 'mock value'
}

Mock.mock('/getMockValue', 'get', getMockValue) // 登录
Mock.mock('/login', 'post', loginFun) // 登录
