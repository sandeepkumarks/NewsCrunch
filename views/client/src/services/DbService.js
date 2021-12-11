import * as firebase from 'firebase';

export const init = (config) => {
  firebase.initializeApp(config);
}

export const readData = async (reference, limit, lastId) => {
  let result = [], data = null;
  if(limit && lastId) {
    await firebase.database().ref(reference).orderByKey().endAt(lastId).limitToLast(limit).once('value', (snapshot) => {
      data = snapshot.val();
    });
  }
  else if(limit) {
    await firebase.database().ref(reference).orderByKey().limitToLast(limit).once('value', (snapshot) => {
      data = snapshot.val();
    });
  }
  else {
    await firebase.database().ref(reference).once('value', (snapshot) => {
      data = snapshot.val();
    });
  }
  if(data==null) {
    return result;
  }
  Object.keys(data).forEach(each => {
    let obj = data[each];
    obj.id = each;
    result.push(obj);
  });
  return result;
}

export const writeData = (reference, data) => {
  firebase.database().ref(reference).push(data);
}
