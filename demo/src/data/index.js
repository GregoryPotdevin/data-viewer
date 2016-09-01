

let singleton = null

let tables = [

]

export class DataManager {

  constructor(){
    this.data = {
      tables
    }
  }

  instance(){
    if (!singleton){
      singleton = new DataManager()
    }
    return singleton
  }
}