import axios from '../../src/index';

axios({
  method: 'post',
  url: '/extend/post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  method: 'post',
  url: '/extend/post',
  data: {
    msg: 'hi'
  }
})

axios.post('/extend/post', {
  msg: 'hello world'
});

axios.get('/extend/get');

axios.put('/extend/put', {
  msg: 'hello world'
})

axios.delete('/extend/delete');

axios.patch('/extend/patch', {
  msg: 'hello world'
})

axios('/base/get', {
  method: 'get'
}).then((res) => {
  console.log(res);
})


axios('/extend/user').then((res) => {
  console.log(res);
  // 单独这么写会报错。AxiosResponse不存在该属性
  // console.log(res.result);
})


interface ResponseData<T = any> {
  code: number;
  result: T;
  message: string;
}

interface User {
  name: string;
  age: number;
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}


async function test() {
  const user = await getUser<User>()
  if(user) {
    console.log(user.result.age)
    console.log(user.result.name);
  }
}

test()