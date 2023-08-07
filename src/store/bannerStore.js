import { makeAutoObservable } from 'mobx'

export default class BannerStore {
    _banner = []
   

    constructor() {
        makeAutoObservable(this)
    }

    get banner() {
        return this._banner
    } 
 


    set banner(banner) {
        this._banner = banner
    }
}