require('reify')

const expect = require('chai').expect
const observer = require('../src')

describe('unobserve', () => {
  it('should unobserve the observed function', () => {
    let dummy
    const observable = observer.observable({prop: 0})

    let numOfRuns = 0
    function test() {
      dummy = observable.prop
      numOfRuns++
    }
    const signal = observer.observe(test)

    return Promise.resolve()
      .then(() => observable.prop = 'Hello')
      .then(() => observer.unobserve(signal))
      .then(() => observable.prop = 'World')
      .then(() => observable.prop = '!')
      .then(() => expect(numOfRuns).to.equal(2))
  })

  it('should unobserve when the same key is used multiple times', () => {
    let dummy
    const observable = observer.observable({prop: { prop: '' } })

    let numOfRuns = 0
    function test() {
      dummy = observable.prop.prop
      numOfRuns++
    }
    const signal = observer.observe(test)

    return Promise.resolve()
      .then(() => observable.prop.prop = 'Hello')
      .then(() => observer.unobserve(signal))
      .then(() => observable.prop.prop = 'World')
      .then(() => observable.prop.prop = '!')
      .then(() => expect(numOfRuns).to.equal(2))
  })

  it('should unobserve even if the function is registered for the stack', () => {
    let dummy
    const observable = observer.observable({prop: 0})

    let numOfRuns = 0
    function test() {
      dummy = observable.prop
      numOfRuns++
    }
    const signal = observer.observe(test)

    return Promise.resolve()
      .then(() => {
        observable.prop = 2
        observer.unobserve(signal)
      })
      .then(() => expect(numOfRuns).to.equal(1))
  })
})
