import { makeAutoObservable } from 'mobx'

export default class ProductStore {
    _categories = []
    _wineries = []
    _years = []
    __brands = []
    _products = []
    _category = 13 // выбранная категория
    _winery = null // выбранная винодельня
    _year = null // выбранный год
    _brand = 2
    _page = 1 // текущая страница
    _count = 500 // сколько всего товаров
    _limit = 32 // товаров на страницу

    constructor() {
        makeAutoObservable(this)
    }
    get categories() {
        return this._categories
    }

    get wineries() {
        return this._wineries
    }

    get years() {
        return this._years
    }

    get brands() {
        return this._brands
    }

    get products() {
        return this._products
    } 
 

    get baskets() {
        return this._products
    }

  


    get category() {
        return this._category
    }

    get winery() {
        return this._winery
    }

    get year() {
        return this._year
    }

    get brand() {
        return this._brand
    }

    get page() {
        return this._page
    }

    get count() {
        return this._count
    }

    get limit() {
        return this._limit
    }

    get pages() { // всего страниц
        return Math.ceil(this.count / this.limit)
    }

    set categories(categories) {
        this._categories = categories
    }

    set wineries(wineries) {
        this._wineries = wineries
    }

    set years(years) {
        this._years = years
    }

    set brands(brands) {
        this._brands = brands
    }


    set products(products) {
        this._products = products
    }

   

    set baskets(baskets) {
        this._baskets = baskets
    }

    set category(id) {
        this.page = 1
        this._category = id
    }

    set winery(id) {
        this.page = 1
        this._winery = id
    }

    set year(id) {
        this.page = 1
        this._year = id
    }

    set brand(id) {
        this.page = 1
        this._brand = id
    }

    set page(page) {
        this._page = page
    }

    set count(count) {
        this._count = count
    }

    set limit(limit) {
        this._limit = limit
    }
}