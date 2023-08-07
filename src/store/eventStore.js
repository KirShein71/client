import { makeAutoObservable } from 'mobx'

export default class EventStore {
    _events = []
   

    constructor() {
        makeAutoObservable(this)
    }

    get events() {
        return this._events
    } 
 


    set events(events) {
        this._events = events
    }
}