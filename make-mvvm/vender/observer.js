let data = {name: 'guakun', age: 123}

let Dep = function () {
  this.subs = []
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub)
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update()
    })
  }
}

let defineReactive = function(data, key, val) {
  let dep = new Dep()
  observer(val)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function () {
  Dep.target && dep.addDep(Dep.target)
      return val
    },
    set: function (newVal) {
      log('Hahaha, st has changed', val, ' --> ', newVal)
      val = newVal
    }
  })
}

let observer = function (data) {
  if (!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key])
  })
}

observer(data)
data.name = 'guapi'
