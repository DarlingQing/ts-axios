import axios from '../../src/index';

// 参数为普通的值
axios({
  method: 'get',
  url: '/base/get',
  params: {
    a: 1,
    b: 2
  }
});

// 参数为数组
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    foo: ['bar', 'baz']
  }
});

// 参数为对象会进行JSON.stringify()处理
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
});

// 参数为日期类型，进行toISOString()处理
axios({
  method: 'get',
  url: '/base/get',
  params: {
    data: new Date()
  }
});

// 参数存在空格等特殊字符会进行转化
axios({
  method: 'get',
  url: '/base/get',
  params: {
   foo: '@:$ '
  }
});

// 参数值为undefined或null不会添加到url上
axios({
  method: 'get',
  url: '/base/get',
  params: {
    a: undefined,
    b: 2,
    c: null
  }
});

// 存在hash值时会去掉处理
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    b: 2,
    c: null
  }
});

// post请求中使用data
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res);
})

axios({
  method: 'post',
  url: '/base/post',
  // headers: {
  //   'content-type': 'application/json;'
  // },
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res);
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})


const arr = new Int32Array([21, 31]);
axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
});
