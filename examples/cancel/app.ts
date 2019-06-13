import axios, { Canceler } from "../../src";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

setTimeout(() => {
  axios.get('/cancel/get', {
    cancelToken: source.token
  }).catch(function (e) {
    if (axios.isCancel(e)) {
      console.log('Request canceled', e.message);
    }
  })
}, 100)


setTimeout(() => {
  // source.cancel('Operartion canceled by the user.');

  axios.post('/cancel/post',
    {
      a: 1
    },
    {
      cancelToken: source.token
    }).catch(function (e) {
      if (axios.isCancel(e)) {
        console.log(e.message);
      }
    })
}, 100);


let cancel: Canceler;
axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function (e) {
  if (axios.isCancel(e)) {
    console.log('Request canceld');
  }
})

setTimeout(() => {
  cancel();
}, 200);


